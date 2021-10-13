const router = require("express").Router();
let ethUtil = require("ethereumjs-util");
const db = require("../../models");
const jsonwebtoken = require("jsonwebtoken");
const User = db.User;

router.post("/", async (req, res) => {

    let { address, signature } = req.body;

    try{
        const user = await User.findOne({
            where: {
                address
            }
        })

        const msg = "Login to Autigon";

        const msgBuffer = Buffer.from(msg, "utf-8");
        const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
        const signatureBuffer = ethUtil.toBuffer(signature);
        const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
        const publicKey = ethUtil.ecrecover(
            msgHash,
            signatureParams.v,
            signatureParams.r,
            signatureParams.s
        );

        const addressBufer = ethUtil.publicToAddress(publicKey);
        const addressRecovered = ethUtil.bufferToHex(addressBufer);

        if (address.toLowerCase() === addressRecovered.toLowerCase()){
            var token = jsonwebtoken.sign({user: address}, 'SECRET KEY');
            return res
                .status(200)
                .json({token: token});
        }
        else{
            return res
                .status(401)
                .json({error: "Signature failed"})
        }
    }
    catch(error){
        console.log(error);
    }
})





module.exports = router;