pragma solidity ^0.8.0;
import "../oz/token/ERC20/ERC20.sol";

contract TestDAI is ERC20{
    constructor(string memory name, string memory symbol)ERC20(name,symbol){
        _mint(msg.sender, 100 * 10 ** uint(decimals()));
    }
}
