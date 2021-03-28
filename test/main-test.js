const { expect } = require("chai");

describe("Main Test", function() {
  it("Main Test", async function() {
    let accounts = await hre.ethers.getSigners();
    
    let acc0 = accounts[0];

    console.log(acc0.address);

    console.log(hre.ethers.utils.BigNumber.from(await hre.ethers.provider.getBalance(acc0.address)));

    const wBTC_factory = await hre.ethers.getContractFactory("wBTC");
    const wBTC = await wBTC_factory.deploy();
  
    await wBTC.deployed();
  
    console.log("wBTC deployed to:", wBTC.address);
  
    // wETH
  
    
    const wETH_factory = await hre.ethers.getContractFactory("wETH");
    const wETH = await wETH_factory.deploy();
  
    await wETH.deployed();
    
    console.log("wETH deployed to:", wETH.address);
  
    //w USD
  
    const wUSD_factory = await hre.ethers.getContractFactory("wUSD");
    const wUSD = await wUSD_factory.deploy();
  
    await wUSD.deployed();
    
    console.log("wUSD deployed to:", wUSD.address);
  
    console.log("Deploying INDEX contract");
  
    console.log("Deploying INDEX ERC-20 token");
  
    const index_token_factory = await hre.ethers.getContractFactory("IndexToken");
    const index_token = await index_token_factory.deploy();
  
    await index_token.deployed();
  
    console.log("Index token deployed to:", index_token.address);
    
  
    const index_factory = await hre.ethers.getContractFactory('Index');
    const index = await index_factory.deploy(wBTC.address, wETH.address, index_token.address);
  
    await index.deployed();
  
    console.log("Index ROUTER deployed to:", index.address);

    expect(await index.getToken0()).to.equal(wBTC.address);
    expect(await index.getToken1()).to.equal(wETH.address);
    expect(await index.getIndexToken()).to.equal(index_token.address);


  });
});
