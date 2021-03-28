// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract IndexToken is ERC20, ERC20Burnable, Ownable {

    using SafeMath for uint256;

    address token0; /** wBTC **/
    address token1; /**  wETH **/
    address token2; /** Stable **/
    address token0_uni;
    address token1_uni;
    address token2_uni;

    address constant uni_router = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    event IndexBuy(address indexed buyer, uint256 token0_amount, uint256 token1_amount, uint256 index_token_amount);
    event IndexSell(address indexed buyer, uint256 token0_amount, uint256 token1_amount, uint256 index_token_amount);


    constructor(
        address token0_addr,
        address token1_addr,
        address token2_addr,
        address token0_uni_addr,
        address token1_uni_addr,
        address token2_uni_addr
    ) ERC20("INDEX", "INDEX") {
        token0 = token0_addr;
        token1 = token1_addr;
        token2 = token2_addr;

        token0_uni = token0_uni_addr;
        token1_uni = token1_uni_addr;
        token2_uni = token2_uni_addr;
    }

    function buyIndex(uint256 tokens_amount) public {
        uint256 memory token0_amount = tokens_amount.div(3).mul(2);
        uint256 memory token1_amount = tokens_amount.div(3);
        require(IERC(token0).balanceOf(msg.sender) >=  token0_amount, "Token0 is low balance");
        require(IERC(token1).balanceOf(msg.sender) >=  token1_amount, "Token1 is low balance");

        /** transfer tokens **/
        require(IERC(token0).transferFrom(msg.sender, address(this), token0_amount), "Failed to transfer token0");
        require(IERC(token1).transferFrom(msg.sender, address(this), token1_amount), "Failed to transfer token1");

        emit IndexBuy(msg.sender, token0_amount, token1_amount, tokens_amount);

        _mint(msg.sender, tokens_amount);
    }
}