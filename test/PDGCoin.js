const { expect } = require('chai');
const { ethers } = require('hardhat');

const initialSupply = 100000;
const tokenName = 'PDGCoin';
const tokenSymbol = 'PDG';

describe("PDGCoin Test", function() {
    before(async function(){
        const availableSigners = await ethers.getSigners();
        this.deployer = availableSigners[0];

        const PDGCoin = await ethers.getContractFactory("PDGCoin");
        this.pdgCoin = await PDGCoin.deploy(tokenName, tokenSymbol);
        await this.pdgCoin.deployed(); 
    });

    it('Should be named PDGCoin', async function() {
        const fetchedTokenName = await this.pdgCoin.name();
        expect(fetchedTokenName).to.be.equal(tokenName);
    });

    it('Should have symbols "PDG"', async function() {
        const fetchedTokenSymbol = await this.pdgCoin.symbol();
        expect(fetchedTokenSymbol).to.be.equal(tokenSymbol);
    });

    it('Should have totalSupply passed in during deploying', async function() {
        const [fetchedTotalSupply, decimals] = await Promise.all([
            this.pdgCoin.totalSupply(),
            this.pdgCoin.decimals()
        ]);
        const expectedTotalSupply = ethers.BigNumber.from(initialSupply).mul(ethers.BigNumber.from(10).pow(decimals));       
        expect((fetchedTotalSupply).eq(expectedTotalSupply)).to.be.true;
    });
})