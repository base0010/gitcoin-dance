import * as zksync from "zksync"
import * as net from "net";
import {Game} from "../frontend/src/hardhat/typechain";
const hre = require('hardhat');
const {deployments, getNamedAcounts, ethers, provider, network} = require('hardhat')

const num_dancers = 16;
const r_game_address = '0xE1EE35396406B7e295561563B5b613124362Ef94'
const fake_dai = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa';

let dancer_base_contracts = [];

async function main(){
    let GameContract = await ethers.getContractFactory('Game')

    const game = await GameContract.attach(r_game_address)
    const start_game = await game.startGame();

    const startwaited = await start_game.wait();
    console.log(`Game Started? ${startwaited}`)

}

main()