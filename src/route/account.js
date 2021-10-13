var express = require('express');
var router = express.Router();

const abi = require('../../build/contracts/ContractA.json').abi;
const bin_data = require('../../build/contracts/ContractA.json').bytecode;

let TRANSACTION_PARAMETERS = {
    'GAS': 3000000000,
    'GAS_PRICE': '300000000000'
};

router.get('/deploy-test', function (req, res, next) {
    account = '0x04fb94f5e2555d1e860462060337aa62ec6e919d';
    passphrase = 'user-acc';

    web3.eth.isMining().then(console.log);
    web3.eth.getAccounts().then(console.log);
    console.log("Unlock Account...1");
    web3.eth.personal.unlockAccount(account, passphrase, null).then(() => {
        web3.eth.getBalance(account).then((balance) => {
            console.log("BALANCE: " + balance);
            console.log("aici: " + abi);
            let myContract = new web3.eth.Contract(abi);
            myContract.transactionConfirmationBlocks = 1;
            console.log("Deploying contract... ");
            myContract.deploy({data: bin_data}).send({
                from: account,
                gas: TRANSACTION_PARAMETERS.GAS,
                gasPrice: TRANSACTION_PARAMETERS.GAS_PRICE
            }).on('error', (error) => {
                return res.json({ error: "EVM revert on deployContract-deploy" });
            }).on('transactionHash', (transactionHash) => {
                console.log("TX HASH: " + transactionHash);
            }).then((newContractInstance) => {
                console.log(newContractInstance.options.address);
                return res.json({address : newContractInstance.options.address});
            });
        });
    }).catch(() => {
        return res.json({ error: 'EVM revert on deployContract-unlockAccount'});
    });
});

contractAddress = '0xfD85403171086f8f1568EED1457C94c680f23Bbe';

router.get('/apeleaza-functia', function (req, res, next) {
    account = '0x04fb94f5e2555d1e860462060337aa62ec6e919d';
    passphrase = 'user-acc';

    web3.eth.personal.unlockAccount(account,passphrase, null).then(() => {
        web3.eth.getBalance(account).then((balance)=>{
            let vppContract = new web3.eth.Contract(abi, contractAddress);
            vppContract.transactionConfirmationBlocks = 1;
            vppContract.methods.incrementTestVar().send({
                from: account,
                gas: TRANSACTION_PARAMETERS.GAS,
                gasPrice: TRANSACTION_PARAMETERS.GAS_PRICE
            }).on('error', (error) => {
                //console.log("ERROR" + error);
                return res.json({ error: "EVM revert on deployContract-deploy" });//callback(ErrorHandling.factoryPartialErrorHandling(new createError.InternalServerError("EVM revert on sendOffer")));
            }).on('transactionHash', (transactionHash) => {
                console.log("transactionHash: " + transactionHash);
            }).then((result) => {
                //console.log(result);
                
                //let event = vppModels.VppOfferSent(result.events.VppOfferSent.returnValues);
                return res.json({ bravoboss: "N-a crapat" });//callback(null, event);
            });
        });
    }).catch(() => {
        return res.json({ error: "EVM revert on deployContract-deploy" });
    });
});


router.get('/da-ba-variabila', function (req, res, next) {
    account = '0x04fb94f5e2555d1e860462060337aa62ec6e919d';
    passphrase = 'user-acc';

    const contract = new web3.eth.Contract(abi, contractAddress);

    contract.getPastEvents('TestEvent', 
        {filter: {}, fromBlock: 0, toBlock: 'latest'}, (error, events) => {
        
        /*
        let values = [];
        for (let i = 0; i < events.length; i++) {
            //let value = eventModel(events[i]);
            values.push(value);
        }
        */
        console.log(events);
        console.log("DEASUPRA sunt toate eventurile");
        return res.json({ bravoboss: "N-a crapat" });;
    }).catch((err) => {
        console.log(1);
        return res.json({ nu: "a crapat" });;
    });

});

module.exports = router;