import {Game} from "../frontend/src/hardhat/typechain/Game";
import { ethers } from "hardhat";
import * as zksync from "zksync"
import {r_dai_address, r_game_address} from "./constants";


const hre = require('hardhat');
import { Signer } from "ethers";
import {expect} from "chai";

const rinkeby_game_address = '0x59A6C0197D174c018f10886e25AD7A4AdF7ba63c';

let game;
let dai;
let signers = [];

let syncWallet;

const numDancers = 15;


const setup_zk = async function(ethSigner){
    const syncProvider = await zksync.getDefaultProvider('rinkeby');
    syncWallet = await zksync.Wallet.fromEthSigner(ethSigner,syncProvider );

    if(syncWallet !== undefined) {
        // console.log(syncWallet.provider.tokenSet)
    }
}
const get_deployed_game = async function(address){
    const Game = await hre.ethers.getContractFactory("Game");
    const deployed_game = await Game.attach(address)
    const deployed_address = await deployed_game.address;
    return deployed_game;
}

const get_deployed_dai = async function(address){
    const a = await hre.ethers.getContractFactory("TestDAI");
    const deployed_dai = await a.attach(r_dai_address);


    signers = await hre.ethers.getSigners();
    // console.log(signers)
    dai = deployed_dai;
    return deployed_dai
}
const mint_dai = async function(to) {
    const mint_dai = dai.mint(to, 1000)
    const res = await mint_dai();
    console.log("minted dai", res)

}

const get_dai_balance = async function(address){
        const acc0_bal = await dai.balanceOf(signers[0].address);
        console.log("acc0 bal " + acc0_bal);
        return acc0_bal;

}

const deposit_dai_to_zk = async function(stringAmount:string){
    syncWallet.provider.tokenSet.tokensBySymbol.DAI.address = r_dai_address
    if(syncWallet){
        const deposit = await syncWallet.depositToSyncFromEthereum({
            depositTo: signers[0].address,
            token: "DAI",
            amount: ethers.utils.parseEther(stringAmount),
        });
        const receipt = await deposit.awaitReceipt();
        console.log("dep rec", receipt)
    }
}
const mint_nft = async function(nftname){
    const mint = await game.mintNFTAndDeployDonationAddress(`http://gitcoin.dance/nft/${nftname}`, r_dai_address);
    const waited = await mint.wait();
    console.log(waited)
}

// let game;
// let dai;
// let signers = [];
//
// let syncWallet;
//
// const numDancers = 15;

const deploy_game = async function(){
    const Game = await hre.ethers.getContractFactory("Game");
    const round_blocktime = 25;

    game = await Game.deploy(16,round_blocktime, r_dai_address);
    await game.deployed();
    const address = await game.address
    console.log("Game Deployed to: " + address)
    return game;
}

async function main(){

    const game = await deploy_game()
    console.log(game.deployed().address)

    for(let i = 0; i <= 16; i++) {
        console.log("Minting stuffs")
        const mint = await game.mintNFTAndDeployDonationAddress(`http://gitcoin.dance/${i}.gif`, r_dai_address);
        let waited = await mint.wait()

        const dancer_created_e = waited.events.filter(event=>event.event === 'DancerCreated')
        const nft_mint_e = waited.events.filter(event=>event.event === 'NFTMinted')
        const mint_debug_e = waited.events.filter(event=>event.event === 'MintDebug')
        console.log(" NFT mint debug", nft_mint_e[0].args[0] )
        const deployedDBAddress = dancer_created_e[0].args[0]
        console.log("deployed dancerproxy address ",deployedDBAddress)

        // dancer_base_contracts[i] = deployedDBAddress;
    }





    // deposit dai to zk
    // if(Number(hr_dai) > 0){
    //     await setup_zk(signers[0])
    //     const dep = await deposit_dai_to_zk("0.010")
    //     console.log("Deposited to ZK ", dep)
    // }

    // ZK Setup
    // await setup_zk(signers[0])
    //
    //
    // const nftID = 0;
    // const nftAddress = '0x8d2177845aE634CFc92597918573B7860150de37'
    // const amount = zksync.utils.closestPackableTransactionAmount(ethers.utils.parseEther("0.1"));
    // await setup_zk(signers[0])
    //
    // const transfer = await syncWallet.syncTransfer({
    //     to: nftAddress,
    //     token: "DAI",
    //     amount,
    // })
    // const transfer_recepit = await transfer.awaitReceipt();
    // console.log("transferred on l2", transfer_recepit);
    //
    // // const withdrawl_to_game= await game.withdrawlFromDonationProxyToSelf(nftAddress)
    // const wd_from_sync = await syncWallet.withdrawFromSyncToEthereum({
    //     ethAddress:nftAddress,
    //     token: "ETH",
    //     amount: ethers.utils.parseEther("0.05")
    // })
    // const wd_verification = await wd_from_sync.awaitVerifyReceipt()
    // console.log("Withdrawl verification", wd_verification);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

// describe("Gitcoin Dance Tests", function () {
//     let accounts = [];
//     let gitdance;
//     let game;
//     //rinkeby
//     let dai;
//     let syncWallet;
//     const num_dancers = 8;
//     let dancer_base_contracts = [];
//
//     beforeEach(async function () {
//     });
//
//     before(async function(){
//         accounts = await ethers.getSigners();
//         const syncProvider = await zksync.getDefaultProvider('rinkeby');
//         syncWallet = await zksync.Wallet.fromEthSigner(accounts[0],syncProvider );
//
//         if(syncWallet !== undefined){
//             console.log(syncWallet)
//         }
//     })
//     it("Should calculate the log2() of number of dancers", async function(){
//         const num_dancers = 128;
//         let log_res = await game.determineGameRounds(num_dancers);
//         await log_res.wait(1);
//
//         const determined_rounds =  ethers.utils.formatUnits(await game.g_rounds(),"wei");
//         expect(Math.log2(num_dancers) == Number(determined_rounds))
//     })
//
//     it("should have accounts", async function () {
//         assert(accounts.length > 0, "Account legth should be more then zero");
//     });
//
//     it("Should instantiate testnet  DAI", async function(){
//         const DAI = await ethers.getContractFactory("TestDAI");
//         // dai = await DAI.deploy("DAI", "DAI");
//         dai = DAI.attach(rinkeby_dai_address)
//         await dai.deployed();
//
//         const acc0_bal = await dai.balanceOf(await accounts[0].getAddress());
//         console.log("acc0 bal " + acc0_bal);
//
//         expect(acc0_bal > 0)
//     })

    // it("should deploy the Gitcoin Dance ERC721 Contract", async function (){
    //     const ERC721 = await ethers.getContractFactory("ERC721Mintable")
    //     gitdance = await ERC721.deploy();
    //     await gitdance.deployed();
    //
    //     expect(await gitdance.name()).to.equal("Gitcoin Dance NFT")
    //
    // });
    // it( "Should deploy the Game Contract instance", async function(){
    //     const Game = await ethers.getContractFactory("Game");
    //     const round_blocktime = 150;
    //
    //     game = await Game.deploy(num_dancers,round_blocktime,dai.address);
    //     await game.deployed();
    //     const address = await game.address
    //     console.log("Game Address " + address)
    //     expect(address);
    // })
    //
    // //todo this should happen by calling the Game contract directly
    // it("Should deploy Dancer Base contracts from the Game Contract", async function(){
    //     for(let i = 0; i <= num_dancers; i++) {
    //         const fake_dai = dai.address;
    //
    //         const mint = await game.mintNFTAndDeployDonationAddress('http://fuck.com', fake_dai);
    //         let waited = await mint.wait()
    //
    //         const dancer_created_e = waited.events.filter(event=>event.event === 'DancerCreated')
    //         const nft_mint_e = waited.events.filter(event=>event.event === 'NFTMinted')
    //         const mint_debug_e = waited.events.filter(event=>event.event === 'MintDebug')
    //         console.log(" NFT mint debug", nft_mint_e[0].args[0] )
    //         const deployedDBAddress = dancer_created_e[0].args[0]
    //         console.log("deployed dancerproxy address ",deployedDBAddress)
    //
    //         dancer_base_contracts[i] = deployedDBAddress;
    //         expect(deployedDBAddress !== undefined)
    //     }
    //
    // })
    //
    // it("Should start the Game", async function(){
    //     const start_game = await game.startGame();
    //     const start_waited = start_game.wait()
    //
    //     expect(start_waited !== undefined)
    // })
    // it("Should fund base dancer contracts with Fake DAI", async function(){
    //     for(let i = 0; i < num_dancers; i++) {
    //
    //         const db_address = dancer_base_contracts[i];
    //         console.log("For Dance Proxy @ " + db_address)
    //         const amount = Math.floor(Math.random() * 10000);
    //
    //         console.log("Random amount " + amount)
    //         const tx = await dai.transfer(db_address, amount);
    //         await tx.wait();
    //         //
    //         const db_instance = await ethers.getContractFactory("DancerProxy");
    //
    //         const dancer_dai_bal = ethers.utils.formatUnits(await dai.balanceOf(db_address), "wei");
    //         console.log("Dancer Contract Balance Before Withdrawl", dancer_dai_bal);
    //
    //         expect(Number(dancer_dai_bal) > 1);
    //     }
    //
    // })
    //
    // it("Should advance the blocktime by a round (put us in intermission)", async function(){
    //     const blocks_to_wait = 2000;
    //     for(let i=0; i < blocks_to_wait; i++) {
    //         await ethers.provider.send("evm_mine", []);
    //     }
    // })
    //
    // it("Should withdrawl DAI to the Game contract during ", async function(){
    //     for(let i = 0; i < num_dancers; i++) {
    //
    //         const db_address = dancer_base_contracts[i];
    //
    //         const wd_tx = await game.withdrawlFromDonationProxyToSelf(db_address);
    //         const wd_waited = await wd_tx.wait();
    //
    //         // const votes_e = wd_waited.events.filter(event=>event.event === 'VotesTalleyed')
    //
    //         const dancer_dai_post_wd = ethers.utils.formatUnits(await dai.balanceOf(db_address), "wei");
    //         console.log("Dancer Contract Balance After Withdrawl", dancer_dai_post_wd);
    //
    //         const game_dai_bal = ethers.utils.formatUnits(await dai.balanceOf(game.address), "wei");
    //         console.log("Game Contract Balance After Withdrawl", game_dai_bal);
    //
    //         expect(Number(dancer_dai_post_wd) == 0)
    //         expect(Number(game_dai_bal) > 0)
    //     }
    //
    // })
    // it("Should increment vote by the amount", async function(){
    //     for(let i = 0; i < num_dancers; i++) {
    //         // console.log("game address", game.address)
    //         const totalVotes = await game.votesPerNftId(i)
    //         console.log("NFT ID " + i + " Has " + totalVotes + " Votes")
    //     }
    // })


// });
