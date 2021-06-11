import {ERC20PresetMinterPauser} from "../frontend/src/hardhat/typechain";

const {deployments, getNamedAccounts, ethers, provider, network} = require('hardhat')

const r_fake_dai = '0x2e055eee18284513b993db7568a592679ab13188'

async function main(){
    const DAI = await ethers.getContractFactory("ERC20PresetMinterPauser");
    const { deployer } = await getNamedAccounts();

    const dai = DAI.attach(r_fake_dai);
    const acc0_bal = await dai.mint(deployer,"100000000000000000000000");
    console.log("acc0 bal " + JSON.stringify(acc0_bal));

}

main()