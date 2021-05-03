// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import {ERC721Enumerable} from "../frontend/src/hardhat/typechain/ERC721Enumerable";

const hre = require("hardhat");

async function main() {

  const ERC721Mintable = await hre.ethers.getContractFactory("ERC721Mintable");
  const gitd = await ERC721Mintable.deploy()

  console.log("Deployed NFT to:", gitd.address)

  const MaticVoting = await hre.ethers.getContractFactory("Root")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
