pragma solidity ^0.8.0;
import "../oz/utils/math/SafeMath.sol";
import "../oz/access/AccessControl.sol";
import "../oz/token/ERC20/IERC20.sol";

import "./lib/MathLog.sol";
import "./ERC721Mintable.sol";
import "./DancerProxy.sol";


//Each "danceoff"
contract Game is MathLog, ERC721Mintable{
    using SafeMath for uint;
    event DancerCreated(address indexed a, uint indexed nftid);

//    address dai_address = 0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa;
    IERC20 dai;

    mapping(uint=>bool) nftIdHasBeenPlaced;
    mapping(uint=>address) public donationAddressByNftId;
    mapping(address=>uint) public nftIdByDonationAddress;
    mapping(uint=>uint) public votesPerNftId;


    //number of the current game
    uint g_game_number = 0;
    uint public g_rounds = 0;
    uint g_current_round;

    uint g_start_block;
    uint g_round_blocktime = 2000;
    uint g_intermission_blocktime = 100;


    uint g_number_dancers;
    uint g_current_number_dancers;
    bool g_game_started = false;
    //game_no->round->bracketnumber->addresses in bracket(competetors)
    mapping(uint=>mapping(uint=>mapping(uint=>address[2]))) gameByBracketByRound;
    mapping(address=>bool) public notEliminated;
    mapping(uint=>address) public addressByNFTId;

    constructor (uint num_dancers, uint roundTimeInBlocks, address dai_address){
        dai = IERC20(dai_address);
        setGameParams(num_dancers);
    }
    function isBetweenRounds() internal returns (bool isBetweenRounds){
        uint gameClock = block.number - g_start_block;
        return (gameClock % g_round_blocktime) <= g_intermission_blocktime;
    }
    function changeTime(uint round_time, uint intermission_time) internal{
//        require(hasRole(ADMIN))
        g_round_blocktime = round_time;
        g_intermission_blocktime = intermission_time;
    }
    function setGameParams(uint _num_dancers) internal {
        require(_num_dancers % 2 == 0, "this isnt a power of 2");
        require(!g_game_started, "game cant be started already");
        require(gameByBracketByRound[g_game_number + 1][0][0][1] == address(0),"This looks like a round exists here");
    }


    function getBracketEntropy(uint unfilled_brackets) public  returns(uint bracketNo){
        return uint(blockhash(block.number)).mod(unfilled_brackets);
    }

    function fillBracket(uint bracket, address[2] memory nftAddresses) internal {
        gameByBracketByRound[g_game_number][g_current_round][bracket] = nftAddresses;
    }

    function determineBrackets() internal {
        uint bracketsToMake = g_current_number_dancers.div(g_current_round).div(2);
        uint remainingDancersToPlace = g_current_number_dancers;



        for(uint i = 0; i < bracketsToMake; i++){
            uint rand_nftIdA = getBracketEntropy(remainingDancersToPlace);
            remainingDancersToPlace--;
            uint rand_nftIdB = getBracketEntropy(remainingDancersToPlace);
            fillBracket(i, [addressByNFTId[rand_nftIdA], addressByNFTId[rand_nftIdB]]);
            nftIdHasBeenPlaced[rand_nftIdA] = true;
            nftIdHasBeenPlaced[rand_nftIdB] = true;
        }

        for(uint i = 0; i < bracketsToMake; i++){

//            uint bracket_placement = getBracketEntropy(i);
        }
//        uint address_index = getBracketEntropy();

    }
    function determineGameRounds(uint _num_dancers) public returns (uint n) {
        uint rounds = log2(_num_dancers);
        g_rounds = rounds;
        return rounds;
    }


    function setupNewGame(uint _num_dancers) internal {
        setGameParams(_num_dancers);
        g_game_number ++;
        g_current_round = 1;
        g_number_dancers = _num_dancers;
        g_current_number_dancers = _num_dancers;

        determineGameRounds(g_number_dancers);

        }

    event MintDebug(address indexed donation_address, uint indexed nftbyaddress);
    function mintNFTAndDeployDonationAddress(string memory nftURI, address creator) public returns (address nft_donation_address){
            require(hasRole(DEFAULT_ADMIN_ROLE,msg.sender), "Not default admin");
            uint nftId = mint(address(this), nftURI);
            //require dai address set
            DancerProxy dancer =  new DancerProxy(address(this), address(dai));

            emit DancerCreated(address(dancer), nftId);

        //ghetto linkedlist
            donationAddressByNftId[nftId] = address(dancer);
            nftIdByDonationAddress[address(dancer)] = nftId;

            emit MintDebug(donationAddressByNftId[nftId], nftIdByDonationAddress[address(dancer)]);

            return donationAddressByNftId[nftId];
        }

    event NFTID(uint id);
    event VotesTalleyed(uint indexed nftId, uint indexed votes);

    function incrementVotes(address dancer, uint amount) internal {
        uint256 nftId = nftIdByDonationAddress[dancer];
        votesPerNftId[nftId] += amount;

        emit VotesTalleyed(nftId, votesPerNftId[nftId]);
    }

    function withdrawlFromDonationProxyToSelf(address donation_proxy) public returns (bool success){
        (bool success, bytes memory returnData) = address(donation_proxy).call(abi.encodeWithSignature("withdrawlDAI()"));

        uint votes = abi.decode(returnData, (uint));

        incrementVotes(donation_proxy, votes);


       return success;
    }


}
