pragma solidity >=0.8.0;

library Counters {
    struct Counter {
        // This variable should never be directly accessed by users of the library: interactions must be restricted to
        // the library's function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add
        // this feature: see https://github.com/ethereum/solidity/issues/4637
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        unchecked {
        counter._value += 1;
    }
}

function decrement(Counter storage counter) internal {
uint256 value = counter._value;
require(value > 0, "Counter: decrement overflow");
unchecked {
counter._value = value - 1;
}
}
}

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {

/**
* @dev Multiplies two numbers, throws on overflow.
*/
function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
if (a == 0) {
return 0;
}
c = a * b;
assert(c / a == b);
return c;
}

/**
* @dev Integer division of two numbers, truncating the quotient.
*/
function div(uint256 a, uint256 b) internal pure returns (uint256) {
// assert(b > 0); // Solidity automatically throws when dividing by 0
// uint256 c = a / b;
// assert(a == b * c + a % b); // There is no case in which this doesn't hold
return a / b;
}

/**
* @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
*/
function sub(uint256 a, uint256 b) internal pure returns (uint256) {
assert(b <= a);
return a - b;
}

/**
* @dev Adds two numbers, throws on overflow.
*/
function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
c = a + b;
assert(c >= a);
return c;
}
}

interface IERC20 {

function totalSupply() external view returns (uint256);
function balanceOf(address account) external view returns (uint256);
function allowance(address owner, address spender) external view returns (uint256);

function transfer(address recipient, uint256 amount) external returns (bool);
function approve(address spender, uint256 amount) external returns (bool);
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


event Transfer(address indexed from, address indexed to, uint256 value);
event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Voting{

using Counters for Counters.Counter;
using SafeMath for uint256;
// Event TokenIdAdded(uint256 id);
// mapping(uint256=>Counters.Counter) private votesById;
IERC20 public daiToken;
mapping(uint256=>uint256) private votesById;

address daiTokenAddress;
address owner;
bool roundStarted;
//doublecheck zeros here
uint256 costPerVote = 50000000000000000000;

constructor(address daiAddress){
//really only useful for testing
daiTokenAddress = daiAddress;
daiToken = new IERC20(daiTokenAddress);
owner = msg.sender;
}
modifier onlyOwner(){
require(msg.sender == owner);
_;
}

modifier roundStarted(){
require(this.roundStarted == true, "round not started");
_;
}
//presumably call this from ETH side.
function addId(uint256 tokenId) public onlyOwner{
require(votesById[tokenId].current() == 0);
votesById[tokenId].add(1);
}


function vote(uint256 nftId, uint256 donationTokens) public payable roundStarted {

uint256 remainder = donationTokens % costPerVote;
uint256 votesToCast = donationTokens.div(costPerVote);
//add votes
votesById[nftId].add(votesToCast);
//return remainder if they send an uneven multiple
if(remainder){
msg.sender.send(remainder);
}

}
function roundStatus(bool enable) public onlyOwner {
roundStarted = enable;
}


}