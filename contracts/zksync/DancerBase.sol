pragma solidity  ^0.8.0;
import "../oz/token/ERC20/IERC20.sol";
import "../oz/access/AccessControl.sol";
import "./Game.sol";

contract DancerBase is AccessControl{
    bytes32 public constant GAME_LOGIC_ROLE = keccak256("GAME_LOGIC_ROLE");

    IERC20 public dai;
    //this is the Voting Logic contract
    Game public game;

    constructor(address _game_contract, IERC20 daiAddress){
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

        game = Game(_game_contract);
        dai = daiAddress;
    }

    function withdrawlDAI() public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender));
        dai.transfer(address(game), dai.balanceOf(address(this)));
    }


}
