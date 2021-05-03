pragma solidity  ^0.8.0;
import "./ERC721Mintable.sol";
import "./DancerBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract GameLogic is ERC721Mintable {
    using SafeMath for uint;

    mapping(uint=>address) public nftIdByAddress;
    mapping(uint=>bool) public eliminated;
    //period => bracket => addresses[2]
//    mapping(uint => (mapping(uint => address[2])) private game;
//
    mapping(uint=>uint) numdancersByGame;
    mapping(uint=>mapping(uint=>address[2])) brackets;

    uint private gameNumber = 0;
    uint public gameRound = 1;

    mapping(uint=>uint) nftIdByGame;

    uint startBlock;
    bool gamePlayable = false;

    //approx blocks per day
    uint roundPeriodBlocks = 650;
    uint timeBetweenRounds = 100;

    constructor(uint num_dancers, uint roundPeriod){
        setDanceOffParams(num_dancers, roundPeriod);
    }

    function setDanceOffParams(uint _num_dancers, uint _roundPeriod) internal {
        require(num_dancers % 2, "this isnt a power of 2");
        gameNumber++;
        numdancersByGame[gameNumber] = _num_dancers;

        roundPeriod = _roundPeriod;
    }

    function mintAndDeployDonationAddress(string memory nftURI) returns(address donationAddy){
        uint nftID = mint(address(this),nftURI);
        return deployDonationAddress(nftID);
    }

    function deployDonationAddress(uint nftID) returns (address donationAddy){
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not defualt admin role");
        require(nftIdByAddress[nftID] == 0);
        require(_tokenURIs[nftID]);

        nftIdByAddress[nftID] = new DancerBase(address(this));
        return nftIdByAddress[nftID];
    }


    function startDanceoff(){
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "not defualt admin");
        gamePlayable = true;
        startBlock = block.number;
    }

    function advanceNextRound(){
        require(block.number >= startBlock + (roundPeriodBlocks * currentRound));
        currentRound = getCurrentRound();
    }

    function getCurrentRound() returns (uint round){
        require(gamePlayable != false, "Game hasnt started");
        uint round = (block.number - startBlock).div(roundPeriodBlocks);
        return round;
    }

    function getDAIBalance(address donationContract) internal returns(uint balance){
        return DAI.balanceOf(donationContract);
    }
    function isInBetweenRounds() internal returns(bool betweenRound){
        uint gameTime = block.number - startBlock;
        return(gameTime > roundPeriodBlocks && gameTime < roundPeriodBlocks + timeBetweenRounds);
    }
    function determineBracketWinner(uint bracketID) returns(address winner){

        address[2] challengers = brackets[gameNumber][bracketID];
        uint c1bal = getDAIBalance(challengers[1]);
        uint c2bal = getDAIBalance(challengers[2]);

        if(c1bal == c2bal){
            //determine a random winner exact same donations.
        }
        if(c1bal > c2bal){
            return challengers[1];

        }else {return challengers[2];}
    }

    function determinePeriodWinners() public{
        require(isInBetweenRounds());

        uint totalDancers = numdancersByGame[gameNumber];
        uint indexToGet = totalDancers.div(gameRound);

        address[indexToGet] winners;
        for(uint i = 0; i < indexToGet; i++){
           address winner = determineBracketWinner(i);
            winners.push(winner);
        }
        return winners;
    }

    function getBracketEntropy(uint num_brackets) returns(uint bracketNo){
        return block.hash(block.number).mod(num_brackets);
    }

    function createBrackets(){

    }

}
