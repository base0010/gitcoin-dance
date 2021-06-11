import {Game} from "../frontend/src/hardhat/typechain";
const {deployments, getNamedAcounts, ethers, provider, network} = require('hardhat')
import {r_dai_address, r_game_address} from "./constants";

const num_dancers = 16;
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

