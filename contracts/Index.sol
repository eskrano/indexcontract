//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IndexToken.sol";

contract Index {
    address token0;
    address token1;
    address index_token;

    constructor(address token0_addr, address token1_addr, address index_token_addr) {
        token0 = token0_addr;
        token1 = token1_addr;
        index_token = index_token_addr;
    }

    receive() external payable {
        console.log("Payable");
        console.log(msg.value);
    }

    function getToken0() public view returns (address) {
        return token0;
    }

    function getToken1() public view returns (address) {
        return token1;
    }

    function getIndexToken() public view returns (address) {
        return index_token;
    }

}