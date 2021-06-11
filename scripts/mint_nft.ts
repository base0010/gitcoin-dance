import * as zksync from "zksync"
import * as net from "net";
import {Game} from "../frontend/src/hardhat/typechain";
import {r_dai_address, r_game_address} from "./constants";
const hre = require('hardhat');
const {deployments, getNamedAcounts, ethers, provider, network} = require('hardhat')

const num_dancers = 16;
let dancer_base_contracts = [];

async function main(){

    let GameContract = await ethers.getContractFactory('Game')
    const game = await GameContract.attach(r_game_address)

    for(let i = 0; i <= num_dancers; i++) {

        const mint = await game.mintNFTAndDeployDonationAddress(`http://gitcoin.dance/nft/${i}.gif`, r_dai_address);
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