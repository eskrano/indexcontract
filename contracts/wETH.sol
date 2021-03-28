// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract wETH is ERC20 {
    constructor() ERC20("Wrapped Ethereum", "wETH") {
        _mint(msg.sender, 100000000000 ether);
    }
}