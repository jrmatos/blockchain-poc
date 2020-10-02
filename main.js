const EC = require('elliptic').ec;
const { Blockchain, Transaction } = require('./blockchain');

const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('e6d4bef7752637c9e00d5bc6d519a5b18e664567eafa73c9db74f55f313a7cd8');
const walletAddress = myKey.getPublic('hex');

const botoCoin = new Blockchain();

const tx1 = new Transaction(walletAddress, 'public key to other wallet goes here', 10);

tx1.signTransaction(myKey);
botoCoin.addTransaction(tx1);

console.log('Starting the miner...');
botoCoin.minePendingTransactions(walletAddress);

console.log(`Balance of ${walletAddress} is ${botoCoin.getBalanceOfAddress(walletAddress)}`);
console.log('Is blockchain valid', botoCoin.isChainValid());
