var express = require('express');
const path = require("path");
const upload = require('../../middleware/upload');
const db = require("../../models");
const User = db.User;

var router = express.Router();


router.get("/:address", async (req, res) => {
    
    const address = req.params.address;
    try{
        const user = await User.findOne({
            where: {
                "address": address
            }
        })
        return res.json({
            "username" : user.username,
            "description": user.description,
            "portfolio": user.portfolio,
            "facebook": user.facebook,
            "twitter": user.twitter,
            "image": user.image   
        })
    }
    catch(error){
        return error;
    }
});


router.post("/", async (req, res) => {
    const address = req.body.address;
    try{
        //TODO RETURN MESSAGE
        const user = await User.findOne({
            where: {
                "address": address
            }
        })
        if (user == null){
           const user = await User.create({
               "address": address
           })
        }
        //Auctigon uses this cryptographic signature in place of a password, verifying that you are the owner of this Ethereum address.
        return res.json({
            message: "Login to Autigon"
        })
    }
    catch(error){
        
    }
})


router.post("/image", upload.single("image"), async (req, res) => {
    console.log(req.file);
    const imagePath = req.body.address + path.extname(req.file.originalname);

    const user = await User.findOne({
        where:{
            address: req.body.address
         }
     })
     if (user == null){
         return res.json({
             "error": "user not found"
         })
     }
     user.image = imagePath;
     await user.save();
    return res.json({
        "imageName" : imagePath,
        
    })
})


router.put("/", async (req, res) => {
    const username = req.body.username;
    const address = req.body.address;
    const description = req.body.description;
    const facebook = req.body.facebook;
    const twitter = req.body.twitter;
    const portfolio = req.body.portfolio;
    try{
        const user = await User.findOne({
            where: {
                "address": address
            }
        })
        
        user.username = username;
        user.description = description;
        user.twitter = twitter;
        user.facebook = facebook;
        user.portfolio = portfolio;
        await user.save();
    }catch(erorr){
        console.log(error);
    }
})


module.exports = router;