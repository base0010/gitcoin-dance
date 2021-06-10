import { ethers } from "hardhat";
import * as ipfsClient from "ipfs-http-client"
import * as fs from 'fs'
import { Signer } from "ethers";
import { assert, expect } from "chai";
import * as zksync from "zksync"

export const advanceBlocktime = async (seconds: number): Promise<void> => {
  const { timestamp: currTime } = await ethers.provider.getBlock("latest");
  console.log("Current block", currTime)
  await ethers.provider.send("evm_increaseTime", [seconds]);

  await ethers.provider.send("evm_mine", []);
  const { timestamp: finalTime } = await ethers.provider.getBlock("latest");
  console.log("Final Time", finalTime)
  const desired = currTime + seconds;
  if (finalTime < desired) {
    const diff = finalTime - desired;
    await ethers.provider.send("evm_increaseTime", [diff]);
  }
};


describe("Gitcoin Dance Tests", function () {
  let accounts: Signer[];
  let gitdance;
  let game;
  //rinkeby
  let dai;

  let syncWallet;
  const num_dancers = 16;
  let dancer_base_contracts = [];

  beforeEach(async function () {
  });

  before(async function(){
    accounts = await ethers.getSigners();
    const syncProvider = await zksync.getDefaultProvider('rinkeby');
    syncWallet = await zksync.Wallet.fromEthSigner(accounts[0],syncProvider );

    if(syncWallet !== undefined){
      console.log(syncWallet)
    }
  })

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

  it( "Should deploy the Game Contract instance", async function(){
    const Game = await ethers.getContractFactory("Game");
    const round_blocktime = 15;
    
    game = await Game.deploy(num_dancers,round_blocktime,dai.address);
    await game.deployed();
    const address = await game.address
    console.log("Game Address " + address)
    expect(address);
  })

  it("Should calculate the log2() of number of dancers", async function(){
    const num_dancers = 128;
    let log_res = await game.determineGameRounds(num_dancers);
    await log_res.wait(1);

    const determined_rounds =  ethers.utils.formatUnits(await game.g_rounds(),"wei");
    expect(Math.log2(num_dancers) == Number(determined_rounds))
  })

  //todo this should happen by calling the Game contract directly
  it("Should deploy Dancer Base contracts from the Game Contract", async function(){
    for(let i = 0; i <= num_dancers; i++) {
      const fake_dai = dai.address;

      const mint = await game.mintNFTAndDeployDonationAddress('http://fuck.com', fake_dai);
      let waited = await mint.wait()

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
    const start_waited =  await start_game.wait()


    expect(start_waited !== undefined)
  })
  it("Should Return the bracket competitors", async function(){


  })

  it("Should fund base dancer contracts with Fake DAI", async function(){
    for(let i = 0; i < num_dancers; i++) {

      const db_address = dancer_base_contracts[i];
      console.log("For Dance Proxy @ " + db_address)
      const amount = Math.floor(Math.random() * 10000);

      console.log("Random amount " + amount)
      const tx = await dai.transfer(db_address, amount);
      await tx.wait();
      //
      const db_instance = await ethers.getContractFactory("DancerProxy");

      const dancer_dai_bal = ethers.utils.formatUnits(await dai.balanceOf(db_address), "wei");
      console.log("Dancer Contract Balance Before Withdrawl", dancer_dai_bal);

      expect(Number(dancer_dai_bal) > 1);
    }

  })

  it("Should advance the blocktime by a round (put us in intermission)", async function(){
    const blocks_to_wait = 2000;
    for(let i=0; i < blocks_to_wait; i++) {
      await ethers.provider.send("evm_mine", []);
    }
  })

  it("Should withdrawl DAI to the Game contract during ", async function(){
    for(let i = 0; i < num_dancers; i++) {

      const db_address = dancer_base_contracts[i];

      const wd_tx = await game.withdrawlFromDonationProxyToSelf(db_address);
      const wd_waited = await wd_tx.wait();

      // const votes_e = wd_waited.events.filter(event=>event.event === 'VotesTalleyed')

      const dancer_dai_post_wd = ethers.utils.formatUnits(await dai.balanceOf(db_address), "wei");
      console.log("Dancer Contract Balance After Withdrawl", dancer_dai_post_wd);

      const game_dai_bal = ethers.utils.formatUnits(await dai.balanceOf(game.address), "wei");
      console.log("Game Contract Balance After Withdrawl", game_dai_bal);

      expect(Number(dancer_dai_post_wd) == 0)
      expect(Number(game_dai_bal) > 0)
    }

  })
  it("There Should be votes by nft", async function(){

    for(let i = 0; i < num_dancers/2; i++) {


      const call_bracket_a = await game.gameByBracketByRound(1,1,i,0);
      const a_address = await game.donationAddressByNftId(call_bracket_a)
      const totalVotes_a = await game.votesPerNftId(call_bracket_a)
      //
      const call_bracket_b = await game.gameByBracketByRound(1,1,i,1)
      const b_address = await game.donationAddressByNftId(call_bracket_b)
      const totalVotes_b = await game.votesPerNftId(call_bracket_b)

      console.log(`Bracket ${i}, A:${call_bracket_a}, add:${a_address} votes: ${totalVotes_a}, B:${call_bracket_b} add:${b_address} votes: ${totalVotes_b}`)
    }
    expect(1===1)
  })


});
