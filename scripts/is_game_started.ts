
import {Game} from "../frontend/src/hardhat/typechain";
import {r_game_address} from "./constants";

const {deployments, getNamedAcounts, ethers, provider, network} = require('hardhat')

async function main(){
    let GameContract = await ethers.getContractFactory('Game')

    const game = await GameContract.attach(r_game_address)
    const advance = await game.advanceGame();

    const startwaited = await advance.wait();
    console.log(`Game Advance? ${JSON.stringify(startwaited)}`)

}

main()