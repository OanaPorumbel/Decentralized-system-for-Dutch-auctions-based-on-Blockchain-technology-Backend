const Wallet = require('ethereumjs-wallet');
console.log(Wallet);
const fs = require('fs');


const utcFile = "C:\\Users\\aoana\\Desktop\\Licenta\\eth-node\\keys\\DemoPoA\\UTC--2019-04-11T06-16-18Z--8d26cbee-0c21-01db-da95-b008d87454a9";
const password = "passphrase-prosumer5";


const f = async (params) => {
  const myWallet = await Wallet.default.fromV3(fs.readFileSync(utcFile).toString(), password, true);
  console.log(myWallet.getPrivateKey().toString('hex'));
}

f();