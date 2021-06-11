import {Game} from "../frontend/src/hardhat/typechain";
import {r_game_address} from "./constants";
const hre = require('hardhat');
const {deployments, getNamedAcounts, ethers, provider, network} = require('hardhat')

async function main(){
    let GameContract = await ethers.getContractFactory('Game')

    const game = await GameContract.attach(r_game_address)
    const start_game = await game.startGame();

    const startwaited = await start_game.wait();
    console.log(`Game Started? ${startwaited}`)

}

main()