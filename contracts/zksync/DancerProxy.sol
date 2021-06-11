pragma solidity  ^0.8.0;
import "../oz/token/ERC20/IERC20.sol";
import "../oz/access/AccessControl.sol";
import "./Game.sol";

contract DancerProxy is AccessControl{
    bytes32 public constant GAME_LOGIC_ROLE = keccak256("GAME_LOGIC_ROLE");
    IERC20 public dai;
    //this is the Voting Logic contract
    Game public game;

    address ZKL1Proxy = address(0x82F67958A5474e40E1485742d648C0b0686b6e5D);
    event WithdrawnFromL2ToSelf(uint amount);
    event WithdrawlToGameLogic(address indexed game);

    constructor(address _game_contract, address daiAddress){
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

        game = Game(_game_contract);
        dai = IERC20(daiAddress);
    }


    receive() external payable {
        require(msg.sender == ZKL1Proxy);
        emit WithdrawnFromL2ToSelf(msg.value);
    }

    function withdrawlDAI() public returns (uint256 bal){
        uint256 bal = dai.balanceOf((address (this)));
        require(dai.approve(address(game), dai.balanceOf(address(this))));
        dai.transfer(address(game), dai.balanceOf(address(this)));

        emit WithdrawlToGameLogic(address(game));
        return bal;
    }


}
