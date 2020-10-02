const SHA256 = require('crypto-js/sha256');

class Block{
    constructor (index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor () {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, '01/10/2020', 'Genesis block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        const latestBlock = this.getLatestBlock();

        newBlock.previousHash = latestBlock.hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // check if something changed in this block
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

const myCoin = new Blockchain();

myCoin.addBlock(new Block(1, '01/10/2020', { amount: 1 }));
myCoin.addBlock(new Block(2, '01/10/2020', { amount: 2 }));
myCoin.addBlock(new Block(1, '01/10/2020', { amount: 1 }));

console.log(JSON.stringify(myCoin, null, 4));

console.log("is block chain valid?", myCoin.isChainValid());

myCoin.chain[1].data.amout = 200;
myCoin.chain[1].hash = myCoin.chain[1].calculateHash();

console.log(JSON.stringify(myCoin, null, 4));

console.log("is block chain valid?", myCoin.isChainValid());