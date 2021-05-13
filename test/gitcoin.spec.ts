import { ethers } from "hardhat";
import * as ipfsClient from "ipfs-http-client"
import * as fs from 'fs'
import { Signer } from "ethers";
import { assert, expect } from "chai";
import {Contract} from "hardhat/internal/hardhat-network/stack-traces/model";
import {readFileSync} from "fs";
import {log} from "util";

describe("Deploy Gitcoin Dance ERC721 Contract", function () {
  let accounts: Signer[];
  let gitdance;
  let game;
  //rinkeby
  let dai;
  const num_dancers = 8;
  let dancer_base_contracts = [];

  beforeEach(async function () {
    accounts = await ethers.getSigners();
  });

  it("should have accounts", async function () {
    assert(accounts.length > 0, "Account legth should be more then zero");
  });

  it("Should deploy fake DAI to local chain", async function(){
    const DAI = await ethers.getContractFactory("TestDAI");
    dai = await DAI.deploy("DAI", "DAI");
    await dai.deployed();

    const acc0_bal = await dai.balanceOf(await accounts[0].getAddress());
    console.log("acc0 bal " + acc0_bal);

    expect(acc0_bal > 0)
  })

  it("should deploy the Gitcoin Dance ERC721 Contract", async function (){
    const ERC721 = await ethers.getContractFactory("ERC721Mintable")
    gitdance = await ERC721.deploy();
    await gitdance.deployed();

    expect(await gitdance.name()).to.equal("Gitcoin Dance NFT")

  });
  it( "should deploy the Game Contract instance", async function(){
    const Game = await ethers.getContractFactory("Game");
    const round_blocktime = 150;
    
    game = await Game.deploy(num_dancers,round_blocktime,dai.address);
    await game.deployed();
    const address = await game.address
    console.log("Game Address " + address)
    expect(address);
  })

  //todo this should happen by calling the Game contract directly
  it("Should deploy Dancer Base contracts from the Game Contract", async function(){
    for(let i = 0; i <= num_dancers; i++) {
      const fake_dai = dai.address;

      const mint = await game.mintNFTAndDeployDonationAddress('http://fuck.com', fake_dai);
      let waited = await mint.wait()
      // console.log(waited)

      const dancer_created_e = waited.events.filter(event=>event.event === 'DancerCreated')
      const nft_mint_e = waited.events.filter(event=>event.event === 'NFTMinted')
      const mint_debug_e = waited.events.filter(event=>event.event === 'MintDebug')
      console.log(" NFT mint debug", nft_mint_e[0].args[0] )
      const deployedDBAddress = dancer_created_e[0].args[0]
      console.log("deployed dancerproxy address ",deployedDBAddress)


      dancer_base_contracts[i] = deployedDBAddress;
      expect(deployedDBAddress !== undefined)
    }

  })
  it("Should start the Game", async function(){
    const start_game = await game.startGame();
    const start_waited = start_game.wait()

    expect(start_waited !== undefined)
  })
  it("Should advance the game a round", async function(){

    const block_to_wait = 2048;
    console.log("Starting block", (await ethers.provider.getBlock('latest')).number);

    const adv_time = await ethers.provider.send("evm_increaseTime", [block_to_wait])   // add 60 seconds
    console.log("advtime", adv_time)

    const mine = await ethers.provider.send("evm_mine", [0])      // mine the next block
    console.log(mine)
    // const some_txn = await game.startGame();
    // await some_txn.wait();
    const a = await ethers.provider.send("evm_mine", [0])      // mine the next block
    const block_future = await ethers.provider.getBlock('latest');
    console.log("Future block", block_future.number);

  })
  it("Should send DAI to a base dancer contract & withdrawl it to the Game contract", async function(){
    for(let i = 0; i < num_dancers; i++) {

      const db_address = dancer_base_contracts[i];
      console.log("For Dance Proxy @ " + db_address )
      const amount = Math.floor(Math.random() * 10000);

      console.log("Random amount " + amount)
      const tx = await dai.transfer(db_address, amount);
      await  tx.wait();
      //
      const db_instance = await ethers.getContractFactory("DancerProxy");
      //
      let inst = await db_instance.attach(db_address)

      const dancer_dai_bal = ethers.utils.formatUnits(await dai.balanceOf(db_address), "wei");
      console.log("Dancer Contract Balance Before Withdrawl", dancer_dai_bal);

      const wd_tx = await game.withdrawlFromDonationProxyToSelf(db_address);
      const wd_waited = await wd_tx.wait();

      const votes_e = wd_waited.events.filter(event=>event.event === 'VotesTalleyed')

      // console.log("votes tally", votes_e[0])

      const dancer_dai_post_wd = ethers.utils.formatUnits(await dai.balanceOf(db_address), "wei");
      console.log("Dancer Contract Balance After Withdrawl", dancer_dai_post_wd);

      const game_dai_bal = ethers.utils.formatUnits(await dai.balanceOf(game.address), "wei");
      console.log("Game Contract Balance After Withdrawl", game_dai_bal);

      expect(Number(dancer_dai_bal) - amount == Number(dancer_dai_bal))
      expect(Number(game_dai_bal) > 0)
    }

  })
  it("Should increment vote by the amount", async function(){
    for(let i = 0; i < num_dancers; i++) {
      // console.log("game address", game.address)
      const totalVotes = await game.votesPerNftId(i)
      console.log("NFT ID " + i + " Has " + totalVotes + " Votes")
    }
  })
  it("Should calculate the log2() of number of dancers", async function(){
    const num_dancers = 128;
    let log_res = await game.determineGameRounds(num_dancers);
    await log_res.wait(1);

    const determined_rounds =  ethers.utils.formatUnits(await game.g_rounds(),"wei");
    expect(Math.log2(num_dancers) == Number(determined_rounds))
  })

});
