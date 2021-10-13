pragma solidity 0.8.6;

import "./tokens/nf-token-metadata.sol";
import "./ownership/ownable.sol";
 
contract newNFT is NFTokenMetadata, Ownable {
 
 event Mint(address to, uint256 tokenId, string uri);

  constructor() {
    nftName = "Auctigon NFT";
    nftSymbol = "AuctigonSYM";
  }
 
  function mint(address _to, uint256 _tokenId, string calldata _uri) external {
    super._mint(_to, _tokenId);
    super._setTokenUri(_tokenId, _uri);
    emit Mint(_to, _tokenId, _uri);
  }
 
}




