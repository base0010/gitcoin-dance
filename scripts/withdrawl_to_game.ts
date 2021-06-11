import {Game} from "../frontend/src/hardhat/typechain";
const {deployments, getNamedAcounts, ethers, provider, network} = require('hardhat')
import {r_game_address} from "./constants";

const dancer_address = '0x8bE2788Be66B9c00ac58f0339dc60a03A61424C8'

async function main() {


    let GameContract = await ethers.getContractFactory('Game')
    const game = await GameContract.attach(r_game_address)
    const withdrawl = await game.withdrawlFromDonationProxyToSelf(dancer_address);

    const waited = withdrawl.wait()
    console.log(waited)
}
main()

