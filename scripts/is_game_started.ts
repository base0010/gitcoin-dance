
import {Game} from "../frontend/src/hardhat/typechain";
const {deployments, getNamedAcounts, ethers, provider, network} = require('hardhat')

const r_game_address = '0xE1EE35396406B7e295561563B5b613124362Ef94'

async function main(){
    let GameContract = await ethers.getContractFactory('Game')

    const game = await GameContract.attach(r_game_address)
    const advance = await game.advanceGame();

    const startwaited = await advance.wait();
    console.log(`Game Advance? ${JSON.stringify(startwaited)}`)

}

main()