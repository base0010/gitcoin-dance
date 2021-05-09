//pragma solidity  ^0.8.0;
//import "./ERC721Mintable.sol";
//import "./DancerBase.sol";
//import "./Game.sol";
//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
//import "@openzeppelin/contracts/utils/math/SafeMath.sol";
//
//contract GameLogic is ERC721Mintable, Game{
//    using SafeMath for uint;
//
////    constructor(uint num_dancers, uint roundPeriod){
////        setDanceOffParams(num_dancers, roundPeriod);
////    }
//    mapping(uint=>address) nftIdToDonationAddress;
//    uint deployed_donation_addresses = 0;
//
//    //mints nft with nftID "x" then deploys a DancerBase contract for that and records it in nftIdToDonationAddress mapping
//    function mintAndDeployDonationAddress(string memory nftURI) returns (address donation_address){
//        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not defualt admin role");
//        uint nftID = mint(address(this),nftURI);
//        return deployDonationAddress(nftID);
//    }
//
//    function deployDonationAddress(uint nftID) internal returns (address donation_address){
//        require(_tokenURIs[nftID]);
//        require(nftIdToDonationAddress[nftID] == 0);
//        //deploy Dancer base for newly minted NFT set administrator to this contract
//        nftIdToDonationAddress[nftID] = new DancerBase(address(this));
//        return nftIdByAddress[nftID];
//    }
//
//    function setupGame(uint dancers){
//        setupNewGame(dancers);
//    }
//
//    function startGame(){
//        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "not defualt admin");
//        require(deployed_donation_addresses == g_number_dancers);
//
//        startBlock = block.number;
//    }
//
//    function advanceNextRound(){
//        require(block.number >= startBlock + (roundPeriodBlocks * currentRound));
//        currentRound = getCurrentRound();
//    }
//
//    function getCurrentRound() returns (uint round){
//        require(gamePlayable != false, "Game hasnt started");
//        uint round = (block.number - startBlock).div(roundPeriodBlocks);
//        return round;
//    }
//
//    function getDAIBalance(address donationContract) internal returns(uint balance){
//        return DAI.balanceOf(donationContract);
//    }
//    function isInBetweenRounds() internal returns(bool betweenRound){
//        uint gameTime = block.number - startBlock;
//        return(gameTime > roundPeriodBlocks && gameTime < roundPeriodBlocks + timeBetweenRounds);
//    }
//    function determineBracketWinner(uint bracketID) returns(address winner){
//
//        address[2] challengers = brackets[gameNumber][bracketID];
//        uint c1bal = getDAIBalance(challengers[1]);
//        uint c2bal = getDAIBalance(challengers[2]);
//
//        if(c1bal == c2bal){
//            //determine a random winner exact same donations.
//        }
//        if(c1bal > c2bal){
//            return challengers[1];
//
//        }else {return challengers[2];}
//    }
//
//    function determinePeriodWinners() public{
//        require(isInBetweenRounds());
//
//        uint totalDancers = numdancersByGame[gameNumber];
//        uint indexToGet = totalDancers.div(gameRound);
//
//        address[indexToGet] winners;
//        for(uint i = 0; i < indexToGet; i++){
//           address winner = determineBracketWinner(i);
//           uint winningNFT = nftIdByAddress[winner];
////            winners.push(winner);
//        }
//
////        return winners;
//
//
//}
