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
    event GotBracketParticipants(uint bracket, address indexed a, address indexed b);

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
    uint g_round_blocktime;
    //this should go in the constructor too
    uint g_intermission_blocktime = 50;


    uint g_number_dancers;
    uint g_current_number_dancers = 0;
    bool g_game_started = false;
    //game_no->round->bracketnumber->addresses in bracket(competetors)
    mapping(uint=>mapping(uint=>mapping(uint=>uint[2]))) public gameByBracketByRound;
    mapping(address=>bool) public notEliminated;
    mapping(uint=>address) public addressByNFTId;


    function isBetweenRounds() internal returns (bool isBetweenRounds){
        require(g_game_started);
        uint gameClock = block.number - g_start_block;

        if(gameClock >= g_round_blocktime){
            uint blocks_past_round = (gameClock % g_round_blocktime);

            if(blocks_past_round <= g_intermission_blocktime){
                return true;
            }
        }
        return false;
    }
    function startGame() public {
        require(!g_game_started);
        g_start_block = block.number;
        g_game_started = true;
        determineBrackets();

    }
    function advanceGame() public{
        require(isBetweenRounds());
        determineBracketWinners(g_current_round);
    }
    constructor (uint num_dancers, uint roundTimeInBlocks, address dai_address){
        dai = IERC20(dai_address);
        setGameParams(num_dancers);
        setupNewGame(num_dancers);
        //set rounds
        g_round_blocktime = roundTimeInBlocks;
    }
    function setGameParams(uint _num_dancers) internal {
        require(_num_dancers % 2 == 0, "this isnt a power of 2");
        require(!g_game_started, "game cant be started already");
        require(gameByBracketByRound[g_game_number + 1][0][0][1] == 0,"This looks like a round exists here");
    }

    function setupNewGame(uint _num_dancers) internal {
        setGameParams(_num_dancers);
        g_game_number ++;
        g_current_round = 1;
        g_number_dancers = _num_dancers;
        g_current_number_dancers = _num_dancers;

        determineGameRounds(g_number_dancers);
        determineBrackets();

    }

    function changeTime(uint round_time, uint intermission_time) internal{
//        require(hasRole(ADMIN))
        g_round_blocktime = round_time;
        g_intermission_blocktime = intermission_time;
    }

    function getBracketEntropy(uint unfilled_brackets) public returns(uint bracketNo){
        uint hash = uint(blockhash(block.number -1));
        return hash.mod(unfilled_brackets);
    }

    function determineBracketWinners(uint bracketNumber) public {
        //require(bracket number exists in the current round
//        address [2] contestants = gameByBracketByRound[g_game_number][g_current_round][bracket];
//        address winner = dai.balanceOf(contestants[1]) > dai.balanceOf(contestants[2])? contestants[1] : contestants[2];
        //need data structure for winners and loosers;
    }

    function fillBracket(uint bracket, uint[2] memory dancerIndex) internal {
        gameByBracketByRound[g_game_number][g_current_round][bracket] = dancerIndex;
    }
    function determineBrackets() public {
        uint bracketsToMake = g_current_number_dancers.div(g_current_round).div(2);
        uint remainingDancersToPlace = g_current_number_dancers;

        uint index_a = 0;
        uint index_b = 1;

        for(uint i = 0; i <= bracketsToMake; i++){
            fillBracket(i, [index_a, index_b]);
            emit GotBracketParticipants(i, donationAddressByNftId[index_a], donationAddressByNftId[index_b]);
            index_a = index_b + 1;
            index_b = index_a + 1;
        }
    }
    function determineGameRounds(uint _num_dancers) public returns (uint n) {
        uint rounds = log2(_num_dancers);
        g_rounds = rounds;
        return rounds;
    }

    function mintNFTAndDeployDonationAddress(string memory nftURI, address creator) public returns (address nft_donation_address){
            require(hasRole(DEFAULT_ADMIN_ROLE,msg.sender), "Not default admin");
            uint nftId = mint(address(this), nftURI);
            //require dai address set
            DancerProxy dancer = new DancerProxy(address(this), address(dai));

            emit DancerCreated(address(dancer), nftId);

        //ghetto linkedlist
            donationAddressByNftId[nftId] = address(dancer);
            nftIdByDonationAddress[address(dancer)] = nftId;


            return donationAddressByNftId[nftId];
        }


    function incrementVotes(address dancer, uint amount) internal {
        uint256 nftId = nftIdByDonationAddress[dancer];
        votesPerNftId[nftId] += amount;
    }

    function withdrawlFromDonationProxyToSelf(address donation_proxy) public returns (bool success){
//       todo: revert to this we're just doing this for testing require(isBetweenRounds());
        (bool success, bytes memory returnData) = address(donation_proxy).call(abi.encodeWithSignature("withdrawlDAI()"));

        if(success) {
        uint votes = abi.decode(returnData, (uint));
        incrementVotes(donation_proxy, votes);
        }

       return success;
    }


}
