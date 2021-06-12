pragma solidity ^0.8.0;
import "../oz/utils/math/SafeMath.sol";
import "../oz/access/AccessControl.sol";
import "../oz/token/ERC20/IERC20.sol";

import "./lib/MathLog.sol";
import "./ERC721Mintable.sol";
import "./DancerProxy.sol";


//Each "danceoff"
contract Game is MathLog, ERC721Mintable{
    IERC20 dai;

    using SafeMath for uint;
    event DancerCreated(address indexed a, uint indexed nftid);
    event GotBracketParticipants(uint bracket, address indexed a, address indexed b);

    mapping(uint=>address) public donationAddressByNftId;
    mapping(address=>uint) public nftIdByDonationAddress;
    mapping(uint=>uint) public votesPerNftId;


    //number of the current game
    uint g_game_number = 0;
    uint public g_rounds = 0;
    uint public g_current_round;

    uint public g_start_block;
    uint public g_round_blocktime;
    uint public g_intermission_blocktime;


    uint public g_number_dancers;
    uint public g_current_number_dancers;
    bool public g_game_started = false;
    //game_no->round->bracketnumber->addresses in bracket(competetors)
    mapping(uint=>mapping(uint=>mapping(uint=>uint[2]))) public gameByBracketByRound;
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

    function determineGameRounds(uint _num_dancers) public returns (uint n) {
        uint rounds = log2(_num_dancers);
        g_rounds = rounds;
        return rounds;
    }

    function startGame() public {
        require(!g_game_started);
        g_start_block = block.number;
        g_game_started = true;

        //initial determine brackets
        determineBrackets();
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

    constructor (uint num_dancers, uint roundTimeInBlocks, uint intermission_time, address dai_address){
        dai = IERC20(dai_address);
        setGameParams(num_dancers);
        setupNewGame(num_dancers);
        //set rounds
        g_round_blocktime = roundTimeInBlocks;
        g_intermission_blocktime = intermission_time;
    }

    event GotWinner(uint nftID);
    event GotContestants(uint indexed a, uint indexed b, uint indexed winnerNFT);

    function determineBracketWinner(uint roundNumber,uint bracketNumber) public returns(uint winner) {
        //require(bracket number exists in the current round
        uint [2] memory contestants = gameByBracketByRound[g_game_number][roundNumber][bracketNumber];

        uint winner = votesPerNftId[contestants[0]] > votesPerNftId[contestants[1]]? contestants[0] : contestants[1];

        emit GotContestants(contestants[0], contestants[1], winner);

        return winner;
    }


    mapping(uint=>uint[]) public winnersByRound;

    function advanceGame() public{
//        require(isBetweenRounds());
        uint bracketsInRound = g_number_dancers.div(g_current_round);

        //winners of current bracket
        uint[] memory winners = new uint[](bracketsInRound);

        for(uint i = 0; i <= bracketsInRound.div(2); i++){
            uint winnerId = determineBracketWinner(g_current_round,i);
            winnersByRound[g_current_round].push(winnerId);
        }

    }

    event CreatedNewBracket(uint indexed bracketNo, uint indexed nftIda, uint indexed nftIdb);

    function createNewRound() public{
        g_current_round++;

        uint j = 0;
        for(uint i = 0; i < 4; i++){
            fillBracket(i, [winnersByRound[g_current_round -1][j], winnersByRound[g_current_round -1][j+1]]);
            emit CreatedNewBracket(i, winnersByRound[g_current_round -1][j], winnersByRound[g_current_round -1][j+1]);
            j+=2;
        }
    }

    function fillBracket(uint bracket, uint[2] memory dancerIndex) internal {
        gameByBracketByRound[g_game_number][g_current_round][bracket] = dancerIndex;
    }

    function determineBrackets() public {
        uint bracketsToMake = g_current_number_dancers.div(g_current_round).div(2);

        uint index_a = 0;
        uint index_b = 1;

        for(uint i = 0; i <= bracketsToMake; i++){
            fillBracket(i, [index_a, index_b]);
            emit GotBracketParticipants(i, donationAddressByNftId[index_a], donationAddressByNftId[index_b]);
            index_a = index_b + 1;
            index_b = index_a + 1;
        }
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
