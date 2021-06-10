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

    for(let i = 0; i <= num_dancers; i++) {

        const mint = await game.mintNFTAndDeployDonationAddress(`http://gitcoin.dance/nft/${i}.gif`, fake_dai);
        let waited = await mint.wait()

        const dancer_created_e = waited.events.filter(event=>event.event === 'DancerCreated')
        const nft_mint_e = waited.events.filter(event=>event.event === 'NFTMinted')
        const mint_debug_e = waited.events.filter(event=>event.event === 'MintDebug')
        console.log(" NFT mint debug", nft_mint_e[0].args[0] )
        const deployedDBAddress = dancer_created_e[0].args[0]
        console.log("deployed dancerproxy address ",deployedDBAddress)

        dancer_base_contracts.push(deployedDBAddress);
    }
}

main()