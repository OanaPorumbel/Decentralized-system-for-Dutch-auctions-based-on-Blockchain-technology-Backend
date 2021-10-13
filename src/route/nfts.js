var express = require('express');
const fs = require('fs');
const cids = require("cids");

var router = express.Router();

const { create, urlSource  } = require('ipfs-http-client');
const upload = require('../../middleware/upload');
const user = require('../../models/user');
const db = require('../../models');
const { response } = require('../../app');
const User = db.User;
const NFT = db.NFT;
const ipfs = create('http://localhost:5001');

router.post("/", upload.single("image"), async (req, res) => {
    console.log(req.file);
    const file = fs.readFileSync(req.file.path);
    const result = await ipfs.add({path: "image", content:file});
    const hash=(result.cid).toString();
    return res.json({
         "hash": hash
     })
});

router.post("/json", async (req, res) => {
     const data =  JSON.stringify(req.body);
     const result = await ipfs.add(data);
     console.log(result);
     const hash=(result.cid).toString();
     return res.json({
          "hash": hash
      })
});

router.get("/:address", async (req, res) => {
     const address = req.params.address;
     try{
         const user = await User.findOne({
             where: {
                 "address": address
             },
             include:[
                  {
                       model: NFT,
                       as: "nfts"
                  }
             ]
         })
         
         const tokenIds = user.nfts.map( (item) => {
               return item.tokenId;
         })
         console.log(tokenIds);
         return res.json({
              tokenIds
         })
     }
     catch(error){
         console.log(error);
     }
 });

router.post("/mintNft", async (req, res) =>{
     const address = req.body.address;
     const tokenId = req.body.tokenId;
     try{  
          const nft = {
               tokenId,
               address
          }
          const nftSaved = await NFT.create(nft);
          return res.status(201).json({
               address
          })
     }
     catch(error){ 
          return res.status(500).json({error})
     }   
});

router.delete("/deleteNft/:address/:tokenId", async (req, res) =>{
     const { tokenId, address } = req.params;
     try{  
          await NFT.destroy({
               where: {
                    address,
                    tokenId
               }
          });
          return res.status(200).json({
               address,
               tokenId
          })
     }
     catch(error){ 
          return res.status(500).json({
               error
          })
     }   
})

module.exports = router;