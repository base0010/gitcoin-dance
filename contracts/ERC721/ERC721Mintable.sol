pragma solidity ^0.8.0;
import "./ERC721.sol";
import "../access/AccessControl.sol";
import "../utils/Counters.sol";
import "../utils/Strings.sol";

contract ERC721Mintable is ERC721, AccessControl{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    string private baseURI = "https://gitcoin.dance/";

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    using Strings for uint256;
    mapping(uint256=>string) private _tokenURIs;

    event NFTMinted(uint256 nftId, string uri);

    constructor() public ERC721("Gitcoin Dance NFT", "GITD"){
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function resetBaseURI(string memory newBaseURI) external{
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Cant reset URI not admin"
            );
        baseURI = newBaseURI;

    }

    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal virtual{
        require(hasRole(MINTER_ROLE,msg.sender), "Not Minter Role");
        require(_exists(tokenId), "NFT id dosent exist");
        _tokenURIs[tokenId] = tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory){
        require(_exists(tokenId), "NFT id dosent exist");
        string memory _tokenURI = _tokenURIs[tokenId];
        return _tokenURI;
    }

    function mint(address to, string memory tokenURI) public returns (uint256 tokenID){
        require(
            hasRole(MINTER_ROLE, msg.sender),
            "721Mint: account isnt Minter role"
        );
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        emit NFTMinted(newTokenId, tokenURI);
    }
}
