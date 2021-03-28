// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract wUSD is ERC20 {
    constructor() ERC20("Wrapped USD", "wUSD") {
        _mint(msg.sender, 10000000000000000000000 ether);
    }
}