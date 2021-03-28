const { expect } = require("chai");

describe("Main Test", function () {


  before(async function () {
    let accounts = await hre.ethers.getSigners();

    let acc0 = accounts[0];
    const wBTC_factory = await hre.ethers.getContractFactory("wBTC");
    const wBTC = await wBTC_factory.deploy();

    await wBTC.deployed();

    //console.log("wBTC deployed to:", wBTC.address);

    // wETH


    const wETH_factory = await hre.ethers.getContractFactory("wETH");
    const wETH = await wETH_factory.deploy();

    await wETH.deployed();

    //console.log("wETH deployed to:", wETH.address);

    //w USD

    const wUSD_factory = await hre.ethers.getContractFactory("wUSD");
    const wUSD = await wUSD_factory.deploy();

    await wUSD.deployed();

    //console.log("wUSD deployed to:", wUSD.address);

    //console.log("Deploying INDEX contract");

    //console.log("Deploying INDEX ERC-20 token");

    const index_token_factory = await hre.ethers.getContractFactory("IndexToken");
    const index = await index_token_factory.deploy(wBTC.address, wETH.address, wUSD.address);

    await index.deployed();

    this.index = index;
    this.wETH = wETH;
    this.wBTC = wBTC;
    this.wUSD = wUSD;

    //console.log("Index token deployed to:", index_token.address);
  });

  it("Is token0-token2 address equals to initialized?", async function () {
    expect(await this.index.getToken0()).to.equal(this.wBTC.address);
    expect(await this.index.getToken1()).to.equal(this.wETH.address);
    expect(await this.index.getToken2()).to.equal(this.wUSD.address);
  });

  it("Check tokens balance for acc0", async function () {
    let accounts = await hre.ethers.getSigners();
    let acc_addr0 = accounts[0].address;
    let balance_acc0_wbtc = await this.wBTC.balanceOf(acc_addr0);
    let balance_acc0_weth = await this.wETH.balanceOf(acc_addr0);
    let balance_acc0_wusd = await this.wUSD.balanceOf(acc_addr0);
    let wbtc_total_supply = await this.wBTC.totalSupply();
    let weth_total_supply = await this.wETH.totalSupply();
    let wusd_total_supply = await this.wUSD.totalSupply();

    expect(balance_acc0_wbtc.toString()).is.equals(wbtc_total_supply.toString());
    expect(balance_acc0_weth.toString()).is.equals(weth_total_supply.toString());
    expect(balance_acc0_wusd.toString()).is.equals(wusd_total_supply.toString());
  });

  it('Test buy index method', async function () {
    let accounts = await hre.ethers.getSigners();
    let acc_addr0 = accounts[0].address;

    await this.wBTC.approve(this.index.address, hre.ethers.utils.parseEther('8'));
    await this.wETH.approve(this.index.address, hre.ethers.utils.parseEther('5'));


    let buy_void_result = await this.index.buyIndex(hre.ethers.utils.parseEther('10'));

    let index_in_acc0_bal = await this.index.balanceOf(acc_addr0);
    expect(index_in_acc0_bal.toString()).is.equals(hre.ethers.utils.parseEther('10').toString());

    let index_token_total_supply = await this.index.totalSupply();
    expect(index_token_total_supply.toString()).is.equals(hre.ethers.utils.parseEther('10').toString());
  });

  it('Test sell index method', async function () {
    let accounts = await hre.ethers.getSigners();
    let acc_addr0 = accounts[0].address;
    let index_in_acc0_bal = await this.index.balanceOf(acc_addr0);

    expect(index_in_acc0_bal.toString()).is.equals(hre.ethers.utils.parseEther('10').toString()); // check balance enough before latest test

    let approve_index_to_contract = await this.index.approve(this.index.address,index_in_acc0_bal);
    
    let allowance_check = await this.index.allowance(acc_addr0, this.index.address);
    expect(allowance_check.toString()).is.equals(hre.ethers.utils.parseEther('10').toString()); // check balance enough before latest test
    //console.log("ALLOW: "+allowance_check.toString());

    let sell_result = await this.index.sellIndex(hre.ethers.utils.parseEther('10'));
    let updated_balance_index = await this.index.balanceOf(acc_addr0);
    expect(updated_balance_index.toString()).is.equals(hre.ethers.utils.parseEther('0').toString());
    let wbtc_balance_acc0 = await this.wBTC.balanceOf(acc_addr0);
    let wbtc_total_supply = await this.wBTC.totalSupply();

    let weth_balance_acc0 = await this.wETH.balanceOf(acc_addr0);
    let weth_total_supply = await this.wETH.totalSupply();

    expect(wbtc_balance_acc0.toString()).is.equals(wbtc_total_supply.toString());
    expect(weth_balance_acc0.toString()).is.equals(weth_total_supply.toString());

    let index_token_total_supply = await this.index.totalSupply();
    expect(index_token_total_supply.toString()).is.equals('0');
  });
});
