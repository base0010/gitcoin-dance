import {Game} from "../frontend/src/hardhat/typechain";
const {deployments, getNamedAcounts, ethers, provider, network} = require('hardhat')

const r_game_address = '0xE1EE35396406B7e295561563B5b613124362Ef94'
const fake_dai = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa';
const num_dancers = 16;
let dancer_base_contracts = [];


const roProvider = ethers.getDefaultProvider('rinkeby')

async function main() {
    let GameContract = await ethers.getContractFactory('Game',roProvider)

    const game = await GameContract.attach(r_game_address)
    const roundNumber = 1;

    for (let i = 0; i < num_dancers / 2; i++) {

        const call_bracket_a = await game.gameByBracketByRound(1, roundNumber, i, 0);
        const a_address = await game.donationAddressByNftId(call_bracket_a)
        const totalVotes_a = await game.votesPerNftId(call_bracket_a)
        //
        const call_bracket_b = await game.gameByBracketByRound(1, roundNumber, i, 1)
        const b_address = await game.donationAddressByNftId(call_bracket_b)
        const totalVotes_b = await game.votesPerNftId(call_bracket_b)
        console.log(`Bracket ${i}, A:${call_bracket_a}, add:${a_address} votes: ${totalVotes_a}, B:${call_bracket_b} add:${b_address} votes: ${totalVotes_b}`)
    }
}
main()

