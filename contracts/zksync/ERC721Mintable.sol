pragma solidity ^0.8.0;
import "../oz/token/ERC721/ERC721.sol";
import "../oz/access/AccessControl.sol";
import "../oz/utils/Counters.sol";
import "../oz/utils/Strings.sol";

contract ERC721Mintable is ERC721, AccessControl{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant MATIC_ROLE = keccak256("MATIC_ROLE");
    bytes32 public constant ZKSYNC_ROLE = keccak256("ZKSYNC_ROLE");

//    string private baseURI = "https://gitcoin.dance/";

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    using Strings for uint256;
    mapping(uint256=>string) public _tokenURIs;

    mapping(uint256=>uint256) public _votesById;

    event NFTMinted(uint256 nftId, string uri);

    constructor() public ERC721("Gitcoin Dance NFT", "GITD"){
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }


    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

//    function resetBaseURI(string memory newBaseURI) external{
//        require(
//            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
//            "Cant reset URI not admin"
//        );
//        baseURI = newBaseURI;
//
//    }

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

        _mint(to, _tokenIds.current());
        _setTokenURI(_tokenIds.current(), tokenURI);

        uint mintedId = _tokenIds.current();
        _tokenIds.increment();

        emit NFTMinted(mintedId, tokenURI);
        return mintedId;

    }


}
