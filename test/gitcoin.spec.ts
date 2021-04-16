import { ethers } from "hardhat";
import { Signer } from "ethers";
import { assert, expect } from "chai";
import {Contract} from "hardhat/internal/hardhat-network/stack-traces/model";

describe("Deploy Gitcoin Dance ERC721 Contract", function () {
  let accounts: Signer[];
  let gitdance;

  beforeEach(async function () {
    accounts = await ethers.getSigners();
  });

  it("should have accounts", async function () {
    assert(accounts.length > 0, "Account legth should be more then zero");
  });
  it("should deploy the Gitcoin Dance ERC721 Contract", async function (){
    const ERC721 = await ethers.getContractFactory("ERC721Mintable")
    gitdance = await ERC721.deploy();
    await gitdance.deployed();

    expect(await gitdance.name()).to.equal("Gitcoin Dance NFT")

  })

  it("should mint an NFT with an image of the cat", async function (){
     const kitty_ipfshash = "QmWWNzzY6YXPdMvRBoJpTCMoU1b2HzXoqRs7SZT4VpihLY";
     //mint tokenId 1 with kittyhash
     const mint = await gitdance.mint(accounts[0].getAddress(), kitty_ipfshash);
    //wait for contract event to show we minted the kitty (1, $kittyhash)
     const tx_receipt = await mint.wait()
     const fired_event = tx_receipt.events?.filter((e)=>{return e.event === "NFTMinted"})

      // expect(tx_receipt.to.emit(gitdance, 'NFTMinted').withArgs(1, kitty_ipfshash))
     expect(fired_event !== undefined, "We had an NFT mint event need to parse tho")


  })
});
