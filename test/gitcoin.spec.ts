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

  it("Should deploy fake DAI to local chain", async function(){
    const DAI = await ethers.getContractFactory("TestDAI");
    dai = await DAI.deploy("DAI", "DAI");
    await dai.deployed();

    const acc0_bal = await dai.balanceOf(await accounts[0].getAddress());
    console.log("acc0 bal " + acc0_bal);

    expect(acc0_bal > 0)
  })

  it("should have accounts", async function () {
    assert(accounts.length > 0, "Account legth should be more then zero");
  });
  it("should deploy the Gitcoin Dance ERC721 Contract", async function (){
    const ERC721 = await ethers.getContractFactory("ERC721Mintable")
    gitdance = await ERC721.deploy();
    await gitdance.deployed();

    expect(await gitdance.name()).to.equal("Gitcoin Dance NFT")

  });
  it( "should deploy the Game Contract instance", async function(){
    const Game = await ethers.getContractFactory("Game");
    const round_blocktime = 150;
    
    game = await Game.deploy(num_dancers,round_blocktime);
    await game.deployed();
    const address = await game.address
    console.log("Game Address " + address)
    expect(address);
  })

  //todo this should happen by calling the Game contract directly
  it("Should deploy Dancer Base contracts from the Game Contract", async function(){

    const num_dancers = 8;
    for(let i = 0; i <= num_dancers; i++) {
      const fake_dai = await accounts[1].getAddress()
      const mint = await game.mintNFTAndDeployDonationAddress('http://fuck.com', fake_dai);
      let waited = await mint.wait()
      const dancer_created_e = waited.events.filter(event=>event.event === 'DancerCreated')
      const deployedDBAddress = dancer_created_e[0].args[0]

      dancer_base_contracts[i] = deployedDBAddress;
      expect(deployedDBAddress !== undefined)
    }

  })
  it("Should send DAI to a base dancer contract & withdrawl it to the Game contract", async function(){
    for(let i = 0; i < 1; i++) {

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
      console.log(inst.address)
      //  await inst.deployed();
      //  //wei should have the right 18 decimals.
      const dancer_dai_bal = ethers.utils.formatUnits(await dai.balanceOf(db_address), "wei");
      console.log("Dancer Contract Balance Before Withdrawl", dancer_dai_bal);

      const withdrawl_tx = await inst.withdrawlDAI();
      const wd_waited = await withdrawl_tx.wait(1)

      console.log(withdrawl_tx, wd_waited)

      const dancer_dai_post_wd = ethers.utils.formatUnits(await dai.balanceOf(db_address), "wei");
      console.log("Dancer Contract Balance After Withdrawl", dancer_dai_post_wd);

      const game_dai_bal = ethers.utils.formatUnits(await dai.balanceOf(game.address), "wei");
      console.log("Game Contract Balance After Withdrawl", game_dai_bal);

      expect(Number(dancer_dai_bal) - amount == Number(dancer_dai_bal))
      expect(Number(game_dai_bal) > 0)
    }

  })
  it("Should increment vote by the amount", async function(){
    for(let i = 0; i < 8; i++) {
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
