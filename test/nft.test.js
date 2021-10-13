const { intToBuffer } = require("ethjs-util")
const assert = require("assert");
const web3 = require("../web3.setup");
const { abi, bytecode } = require("../contract");

const auctionJSON = require("../build/contracts/DutchAuction.json");

let account;
let accounts;
let passphrase = "user-acc";

let TRANSACTION_PARAMETERS = {
    'GAS': 3000000000,
    'GAS_PRICE': '300000000000'
};

let nftContract;
let auctionContract;
let account2;
let account2Passphrase = "passphrase-agg1";

beforeEach( async () => {
    
  
    [account] = await web3.eth.getAccounts();
    
    accounts = await web3.eth.getAccounts();
    account2 = accounts[accounts.length - 8];
    await web3.eth.personal.unlockAccount(account, passphrase);

    // nftContract = await new web3.eth.Contract(abi)
    // .deploy({ data: bytecode})
    // .send({
    //     from: account,
    //     gas: TRANSACTION_PARAMETERS.GAS,
    //     gasPrice: TRANSACTION_PARAMETERS.GAS_PRICE,
    // })
    

    nftContract = await new web3.eth.Contract(abi, "0xFd96fE37B1BfFCFe152408561058Cf447f5773BA")
    // await web3.eth.sendTransaction({from: account, to: "0x30f37dEb649d4283A0fb5253805d47068A9f1817", value: web3.utils.toWei("1", "ether")})
    // auctionContract = await new web3.eth.Contract(auctionJSON.abi, "0x2658b2EDc05B5BBcDD4F7283F84297DDC3F0642b")
    auctionContract = await new web3.eth.Contract(auctionJSON.abi)
                                                  .deploy({ data: auctionJSON.bytecode, arguments: ["0xFd96fE37B1BfFCFe152408561058Cf447f5773BA"] })
                                                  .send({ from: account });
    // console.log(auctionContract.options.address);
    // await web3.eth.sendTransaction({from: account, to: auctionContract.options.address, value: web3.utils.toWei("1", "ether")})
})


describe( "Trying to mint a nft", () => {


    // it("Mint a contract", async () => {
    //     web3.eth.personal.unlockAccount(account2, account2Passphrase);
    //     web3.eth.personal.unlockAccount(account, 'user-acc');
    //     const receipt = await nftContract.methods.mint(account2, 62865, "https://ipfs.io/ipfs/QmTqZhR6f7jzdhLgPArDPnsbZpvvgxzCZycXK7ywkLxSyU").send({
    //         from: account2
    //     })
    //     console.log(receipt);
    // })

     it ("Get the ipfs of a tokenURI", async () => {
        console.log(nftContract.options.address);
        console.log(auctionContract.options.address);
        // const price = await auctionContract.methods.getPriceByTokenId(961791687265542).call()
        // console.log(price);
        // const receipt = await nftContract.methods.mint(account, 16237553126, "https://ipfs.io/ipfs/QmTqZhR6f7jzdhLgPArDPnsbZpvvgxzCZycXK7ywkLxSyU").send({
        //     from: account
        //  })
        // console.log(receipt);
        // const receiptAuction=await auctionContract.methods.startAuction('961791687265542', 6600, web3.utils.toWei("10", "ether"), web3.utils.toWei("1", "ether")).send({ from: account});
        // console.log(receiptAuction);
     })

    // it ("Auction and nft address", async () => {
    //     console.log("hello");
    //    // console.log(auctionContract.options.address);
    //     //console.log(nftContract.options.address);
    //     //web3.eth.personal.unlockAccount(account2, account2Passphrase);
    //    // web3.eth.personal.unlockAccount(account, 'user-acc');
    
    //     // setTimeout( async () => {
    //     //     const price = await auctionContract.methods.getCurrentPriceByTokenId(827182845681919).call()
    //     //     console.log(price)
    //     // }, 5000)
    //     // const price = await auctionContract.methods.getCurrentPriceByTokenId(315822182868418).call();
    //     // web3.eth.personal.unlockAccount(account2, account2Passphrase);
    //     // web3.eth.personal.unlockAccount(account, 'user-acc');
    //     // await nftContract.methods.approve(auctionContract.options.address, 315822182868418).send({ from: account2 })
    //     // web3.eth.personal.unlockAccount(account2, account2Passphrase);
    //     // web3.eth.personal.unlockAccount(account, 'user-acc');
    //     // const receiptAuction = await auctionContract.methods.bid(315822182868418).send({from: account, value: price})
    //     // console.log(await auctionContract.methods.getAuctionByAuctionId(0).call());
    //     // console.log(receiptAuction);

    //     // console.log(await nftContract.methods.ownerOf(827182845681919).call());
    //     // console.log(receiptAuction.events.TransferedMoney);
    //     // console.log(receiptAuction.events.AuctionSuccessful);
    // })
})