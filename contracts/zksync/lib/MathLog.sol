pragma solidity ^0.8.0;
import "../../oz/utils/math/SafeMath.sol";

contract MathLog {
    using SafeMath for uint;

    event Log(uint indexed log);

    function  log2(uint x) public returns (uint n){
        uint n;
        if (x >= 2**128) { x >>= 128; n += 128; }
        if (x >= 2**64) { x >>= 64; n += 64; }
        if (x >= 2**32) { x >>= 32; n += 32; }
        if (x >= 2**16) { x >>= 16; n += 16; }
        if (x >= 2**8) { x >>= 8; n += 8; }
        if (x >= 2**4) { x >>= 4; n += 4; }
        if (x >= 2**2) { x >>= 2; n += 2; }
        if (x >= 2**1) {x >>=1; n+=1;}
        emit Log(n);
        return n;
    }


}
