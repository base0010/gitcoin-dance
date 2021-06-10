import {Game} from "../frontend/src/hardhat/typechain";
const {deployments, getNamedAcounts, ethers, provider, network} = require('hardhat')

const dancer_address = '0x1C7Eb99399760AEacd382eFB89FfA613526a348F'

async function main() {
    let DancerProxyContract = await ethers.getContractFactory('DancerProxy')

    const dancer = await DancerProxyContract.attach(dancer_address)
    const withdrawl = await dancer.withdrawlDAI();
    const waited = withdrawl.wait()
    console.log(waited)
}
main()

