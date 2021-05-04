pragma solidity ^0.4.0;

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
    bool g_game_started = false;
    //game_no->round->bracketnumber->addresses in bracket(competetors)
    mapping(uint=>mapping(uint=>mapping(uint=>address[2]))) gameByBracketByRound;
    mapping(address=>bool) public notEliminated;

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
    function log2(uint x) returns (uint y){
        assembly {
            let arg := x
            x := sub(x,1)
            x := or(x, div(x, 0x02))
            x := or(x, div(x, 0x04))
            x := or(x, div(x, 0x10))
            x := or(x, div(x, 0x100))
            x := or(x, div(x, 0x10000))
            x := or(x, div(x, 0x100000000))
            x := or(x, div(x, 0x10000000000000000))
            x := or(x, div(x, 0x100000000000000000000000000000000))
            x := add(x, 1)
            let m := mload(0x40)
            mstore(m,           0xf8f9cbfae6cc78fbefe7cdc3a1793dfcf4f0e8bbd8cec470b6a28a7a5a3e1efd)
            mstore(add(m,0x20), 0xf5ecf1b3e9debc68e1d9cfabc5997135bfb7a7a3938b7b606b5b4b3f2f1f0ffe)
            mstore(add(m,0x40), 0xf6e4ed9ff2d6b458eadcdf97bd91692de2d4da8fd2d0ac50c6ae9a8272523616)
            mstore(add(m,0x60), 0xc8c0b887b0a8a4489c948c7f847c6125746c645c544c444038302820181008ff)
            mstore(add(m,0x80), 0xf7cae577eec2a03cf3bad76fb589591debb2dd67e0aa9834bea6925f6a4a2e0e)
            mstore(add(m,0xa0), 0xe39ed557db96902cd38ed14fad815115c786af479b7e83247363534337271707)
            mstore(add(m,0xc0), 0xc976c13bb96e881cb166a933a55e490d9d56952b8d4e801485467d2362422606)
            mstore(add(m,0xe0), 0x753a6d1b65325d0c552a4d1345224105391a310b29122104190a110309020100)
            mstore(0x40, add(m, 0x100))
            let magic := 0x818283848586878898a8b8c8d8e8f929395969799a9b9d9e9faaeb6bedeeff
            let shift := 0x100000000000000000000000000000000000000000000000000000000000000
            let a := div(mul(x, magic), shift)
            y := div(mload(add(m,sub(255,a))), shift)
            y := add(y, mul(256, gt(arg, 0x8000000000000000000000000000000000000000000000000000000000000000)))
        }
    }

    function getBracketEntropy(uint num_brackets) returns(uint bracketNo){
        return block.hash(block.number).mod(num_brackets);
    }

    function determineBracket(uint bracket) internal {
        gameByBracketByRound[g_game_number][g_current_round][bracket];
    }

    function determineBrackets(uint round) internal {
        uint bracketsToMake = g_number_dancers.div(2);
        mapping(bool=>address)

        for(uint i = 0; i < bracketsToMake; i++){
            determineBracket(i);
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

        determineGameRounds(g_number_dancers);


    }

}
