// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IndexToken is ERC20, ERC20Burnable, Ownable {
    constructor(address token0, address token1, address token2) ERC20("INDEX", "INDEX") {
        
    }
}