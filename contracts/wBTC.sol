// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract wBTC is ERC20 {
    constructor() ERC20("Wrapped Bitcoin", "wBTC") {
        _mint(msg.sender, 21000000 ether);
    }
}