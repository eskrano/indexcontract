// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

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
  let token0 = await index.getToken0();
  console.log(token0);


  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
