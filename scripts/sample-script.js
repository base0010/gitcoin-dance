
const hre = require("hardhat");
async function main() {

  const ERC721Mintable = await hre.ethers.getContractFactory("ERC721Mintable");
  // const gitd = await ERC721Mintable.deploy()
  console.log("Deployed NFT to:", ERC721Mintable)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
