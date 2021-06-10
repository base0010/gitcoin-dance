
import {Game} from "../frontend/src/hardhat/typechain";
import {expect} from "chai";
const {deployments, getNamedAcounts, ethers, provider, network} = require('hardhat')

const r_game_address = '0xE1EE35396406B7e295561563B5b613124362Ef94'

async function main(){
    const DAI = await ethers.getContractFactory("TestDAI");
    const dai = await DAI.deploy("DAI", "DAI");
    await dai.deployed();
    // await dai.mint("10000000000000", await accounts[0].getAddress())

    const acc0_bal = await dai.balanceOf(await getNamedAcounts.getAddress());
    console.log("acc0 bal " + acc0_bal);

    expect(acc0_bal > 0)
}

main()