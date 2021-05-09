import { ethers } from "hardhat";
import * as ipfsClient from "ipfs-http-client"
import * as fs from 'fs'
import { Signer } from "ethers";
import { assert, expect } from "chai";
import {Contract} from "hardhat/internal/hardhat-network/stack-traces/model";
import {readFileSync} from "fs";

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

  it("Should deploy Dancer Base contracts with Game Address assinged", async function(){
    const DancerBase = await ethers.getContractFactory("DancerBase");

    for(let i = 0; i < num_dancers; i++) {
      const game_address = await game.address;
      const dancer_base_x = await DancerBase.deploy(game_address, dai.address)
      const deployed = await dancer_base_x.deployed()
      console.log("Dancer Base" + i + " address " + deployed.address)

      dancer_base_contracts[i] = deployed.address;
      expect(deployed.address)
    }

  })
  it("Should send DAI to a base dancer contract & withdrawl it to the Game contract", async function(){
    const db_address = dancer_base_contracts[1];
    const tx = dai.transfer(db_address, 10000);

    const db_instance =  await ethers.getContractFactory("DancerBase");

    let inst = await db_instance.attach(db_address)
    await inst.deployed();
    //wei should have the right 18 decimals.
   const dancer_dai_bal = ethers.utils.formatUnits(await dai.balanceOf(db_address), "wei");
   console.log("Dancer Contract Balance Before Withdrawl", dancer_dai_bal);
    const withdrawl_tx = await inst.withdrawlDAI();
    const dancer_dai_post_wd = ethers.utils.formatUnits(await dai.balanceOf(db_address), "wei");
    console.log("Dancer Contract Balance After Withdrawl", dancer_dai_post_wd);
    const game_dai_bal = ethers.utils.formatUnits(await dai.balanceOf(game.address), "wei");
    console.log("Game Contract Balance After Withdrawl", game_dai_bal);








  })
//before
//   it("should upload the images in test/nftimages to ipfs", async function(){
//     //disable timeout
//     this.timeout(0)
//     const filecontent = readFileSync('test/nftimages/adventureCat.gif')
//     const infuraIPFS = ipfsClient({host:'ipfs.infura.io',port:5001, protocol:'https' })
//
//     let cid = await infuraIPFS.add({content:filecontent})
//     console.log(cid)
//   })
//
//   it("should mint an NFT with an image of the cat", async function (){
//      const kitty_ipfshash = "QmWWNzzY6YXPdMvRBoJpTCMoU1b2HzXoqRs7SZT4VpihLY";
//      //mint tokenId 1 with kittyhash
//      const mint = await gitdance.mint(accounts[0].getAddress(), kitty_ipfshash);
//     //wait for contract event to show we minted the kitty (1, $kittyhash)
//      const tx_receipt = await mint.wait()
//      const fired_event = tx_receipt.events?.filter((e)=>{return e.event === "NFTMinted"})
//
//       // expect(tx_receipt.to.emit(gitdance, 'NFTMinted').withArgs(1, kitty_ipfshash))
//      expect(fired_event !== undefined, "We had an NFT mint event need to parse tho")
//
//
//   });
});
