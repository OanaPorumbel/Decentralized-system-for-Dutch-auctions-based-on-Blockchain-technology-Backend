var express = require('express');
var mysql = require('mysql');
var web3Lib = require('web3');
// /const db = require("./db");
const cors = require("cors");

var userRoute = require('./src/route/user');
var loginRoute = require('./src/route/login');
var nftRoute = require("./src/route/nfts");
var app = express();

app.use(cors());
app.use(express.json());

// app.use("/auction-image", express.static("auction"));
app.use("/static", express.static("uploads"));
app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use("/nfts", nftRoute);

app.listen(8080);

module.exports = app;

