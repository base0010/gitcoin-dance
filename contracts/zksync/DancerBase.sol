pragma solidity  ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./GameLogic.sol";


contract DancerBase is IERC20{
    bytes32 public constant GAME_LOGIC_ROLE = keccak256("GAME_LOGIC_ROLE");

    IERC20 public DAI;
    //this is the Voting Logic contract
    GameLogic public game_contract;

    constructor(address _game_contract, IERC20 daiAddress){
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

        game_contract = GameLogic(_game_contract);
        DAI = daiAddress;
    }

    function withdrawlDAI() public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender));
        DAI.transfer(address(game_contract), DAI.balanceOf(address(this)));
    }


}
