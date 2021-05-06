pragma solidity ^0.8.0;
import "./lib/MathLog.sol";
//Each "danceoff"
contract Game{
    //number of the current game
    uint g_game_number = 0;
    uint g_rounds = 0;
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

    constructor (uint num_dancers, uint roundTimeInBlocks){
        setGameParams(num_dancers, roundTimeInBlocks);
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


    function getBracketEntropy(uint unfilled_brackets) returns(uint bracketNo){
        return block.hash(block.number).mod(unfilled_brackets);
    }

    function fillBracket(uint bracket, address[2] nftAddresses) internal {
        gameByBracketByRound[g_game_number][g_current_round][bracket] = nftAddresses;
    }

    function determineBrackets() internal {
        uint bracketsToMake = g_current_number_dancers.div(g_current_round).div(2);
        uint remainingDancersToPlace = g_current_number_dancers;

        mapping(uint=>bool) nftIdHasBeenPlaced;

        for(uint i = 0; i < bracketsToMake; i++){
            uint rand_nftIdA = getBracketEntropy(remainingDancersToPlace);
            remainingDancersToPlace--;
            uint rand_nftIdB = getBracketEntropy(remainingDancersToPlace);
            fillBracket(i, addressByNFTId[rand_nftIdA], addressByNFTId[rand_nftIdB]);
            nftIdHasBeenPlaced[rand_nftIdA] = true;
            nftIdHasBeenPlaced[rand_nftIdB] = true;
        }

        for(uint i = 0; i < bracketsToMake; i++){
            uint bracket_placement = getBracketEntropy(bracketsFilled);
        }
        uint address_index = getBracketEntropy(uint);

    }
    function determineGameRounds(uint _num_dancers) internal {
        uint rounds = log2(_num_dancers);
        return g_rounds = rounds;
    }


    function setupNewGame(uint _num_dancers) internal {
        setGameParams(_num_dancers);
        g_game_number ++;
        g_current_round = 1;
        g_number_dancers = _num_dancers;
        g_current_number_dancers = _num_dancers;

        determineGameRounds(g_number_dancers);


    }

}