pragma solidity 0.8.6;

import "./tokens/nf-token.sol";

contract DutchAuction {

  ERC721 public NftContract;
  uint256 public auctionID; 

    //structura unei licitatii
    
  struct DutchAuction {
        uint256 id;
        uint256 tokenID;
        uint256 startingTimeAuction;
        uint256 durationAuction;  
        uint256 startPriceAuction; 
        uint256 endPriceAuction; 
        address nftSeller;
        bool finishedAuction;
  }

 
  mapping ( uint256 => DutchAuction ) internal tokenIDAuction;
  mapping ( uint256 => DutchAuction ) internal auctionIDAuction;
  
    //evenimentele de creare cu succes si de transfer cu succes al NFT-ului
  event AuctionStarted(uint256 auctionID, uint256 tokenID, uint256 durationAuction, uint256 startPriceAuction, uint256 endPriceAuction);
  event NFTTransferCompleted(uint256 tokenID, uint256 auctionID, uint256 totalPriceAuction, address winnerAuction);  

    //constructor
  constructor(address _nft) {
        NftContract = ERC721(_nft);
    }

    //se ia o licitatie dupa id
  function getAuctionByID(uint256 _id) public view returns (uint256 id,uint256 tokenID,uint256 startingTimeAuction,
                uint256 durationAuction,  uint256 startPriceAuction, uint256 endPriceAuction, address nftSeller,bool finishedAuction) {
      
      DutchAuction storage dutchAuction = auctionIDAuction[_id];
      require(dutchAuction.startingTimeAuction > 0);
      return (dutchAuction.id,dutchAuction.tokenID,dutchAuction.startingTimeAuction,dutchAuction.durationAuction,
              dutchAuction.startPriceAuction,dutchAuction.endPriceAuction,dutchAuction.nftSeller,dutchAuction.finishedAuction);
  }

    //se ia o licitatie dupa id-ul token-ului
  function getAuctionByTokenID(uint256 _token) public view returns (uint256 id,uint256 tokenID,uint256 startingTimeAuction,
                uint256 durationAuction, uint256 startPriceAuction, uint256 endPriceAuction, address nftSeller,bool finishedAuction) {
      DutchAuction storage dutchAuction = tokenIDAuction[_token];
      require(dutchAuction.startingTimeAuction > 0);
       return (dutchAuction.id,dutchAuction.tokenID,dutchAuction.startingTimeAuction,dutchAuction.durationAuction,
              dutchAuction.startPriceAuction,dutchAuction.endPriceAuction,dutchAuction.nftSeller,dutchAuction.finishedAuction);
  }

    //se creaza o licitatie, se emite eveniment
  function startAuction(uint256 _tokenID, uint256 _durationAuction, uint256 _startPriceAuction, uint256 _endPriceAuction) public {
      require(_startPriceAuction < 2**256 - 1); 
      require(_endPriceAuction < 2**256 - 1); 
      require(_durationAuction <= 2**256 - 1); 
      require(_durationAuction > 60 seconds);
      require(NftContract.ownerOf(_tokenID) == msg.sender);

      DutchAuction memory dutchAuction = DutchAuction(uint256(auctionID), uint256(_tokenID), uint256(block.timestamp), uint256(_durationAuction),  
                                        uint256(_startPriceAuction), uint256(_endPriceAuction),  msg.sender,false);

      tokenIDAuction[_tokenID] = dutchAuction;
      auctionIDAuction[auctionID] = dutchAuction;

      emit AuctionStarted(uint256(auctionID),uint256(_tokenID),uint256(dutchAuction.durationAuction),uint256(dutchAuction.startPriceAuction),uint256(dutchAuction.endPriceAuction));
      
      auctionID++;
  }

    //se trimite oferta de cumparare, se emite eveniment
   function buy(uint256 _tokenID) public payable {
      DutchAuction storage dutchAuction = tokenIDAuction[_tokenID];
      DutchAuction storage dutchAuction2 = auctionIDAuction[auctionID];

      uint256 currentPrice = getPrice(dutchAuction);

      require(dutchAuction.startingTimeAuction > 0);
      require(msg.value >= currentPrice);

      address nftseller = dutchAuction.nftSeller;
      address payable sellerPayable = payable(nftseller);
      uint256 idTemp = dutchAuction.id;

      dutchAuction.finishedAuction = true;
      dutchAuction2.finishedAuction = true;

      if (currentPrice > 0) {
          uint256 sellerProceeds = currentPrice;
          sellerPayable.transfer(sellerProceeds);
      }
      NftContract.transferFrom(nftseller, msg.sender, _tokenID);

      emit NFTTransferCompleted(_tokenID, idTemp, currentPrice, msg.sender);

  }

    //se ia pretul curent cu id-ul licitatiei
   function getPriceByAuctionId(uint256 _id) public view returns (uint256) {
      DutchAuction storage dutchAuction = auctionIDAuction[_id];
      return getPrice(dutchAuction);
  }
  
    //se ia pretul curent cu id-ul token-ului
  function getPriceByTokenId(uint256 _tokenID) public view returns (uint256) {
      DutchAuction storage dutchAuction = tokenIDAuction[_tokenID];
      return getPrice(dutchAuction);
  }

    //se ia pretul curent al unei licitatii
  function getPrice(DutchAuction storage _dutchAuction) internal view returns (uint256) {

      require(_dutchAuction.startingTimeAuction > 0);

      uint256 timePassed = 0;
      timePassed = block.timestamp - _dutchAuction.startingTimeAuction;
      
      if (timePassed >= _dutchAuction.durationAuction) 
      {
          return _dutchAuction.endPriceAuction;
      } 
      else 
      {
          int256 price = int256(_dutchAuction.endPriceAuction) - int256(_dutchAuction.startPriceAuction);
          int256 temp = price * int256(timePassed) / int256(uint256(_dutchAuction.durationAuction));
          int256 current = int256(_dutchAuction.startPriceAuction) + temp;
          return uint256(current);
      }
  }

}