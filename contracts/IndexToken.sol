// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract IndexToken is ERC20, ERC20Burnable, Ownable {

    using SafeMath for uint256;

    address public token0; 
    address public token1; 
    address public token2;
    address token0_uni;
    address token1_uni;
    address token2_uni;

    address constant uni_router = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    event IndexBuy(address indexed buyer, uint256 token0_amount, uint256 token1_amount, uint256 index_token_amount);
    event IndexSell(address indexed buyer, uint256 token0_amount, uint256 token1_amount, uint256 index_token_amount);


    constructor(
        address token0_addr,
        address token1_addr,
        address token2_addr
        // address token0_uni_addr,
        // address token1_uni_addr,
        // address token2_uni_addr
    ) ERC20("INDEX", "INDEX") {
        token0 = token0_addr;
        token1 = token1_addr;
        token2 = token2_addr;

        // token0_uni = token0_uni_addr;
        // token1_uni = token1_uni_addr;
        // token2_uni = token2_uni_addr;
    }

    function buyIndex(uint256 tokens_amount) public {
        uint256 token0_amount = tokens_amount.div(3).mul(2);
        uint256 token1_amount = tokens_amount.div(3);
        require(IERC20(token0).balanceOf(msg.sender) >=  token0_amount, "Token0 is low balance");
        require(IERC20(token1).balanceOf(msg.sender) >=  token1_amount, "Token1 is low balance");

    
        /** transfer tokens **/
        require(IERC20(token0).transferFrom(msg.sender, address(this), token0_amount), "Failed to transfer token0");
        require(IERC20(token1).transferFrom(msg.sender, address(this), token1_amount), "Failed to transfer token1");

        emit IndexBuy(msg.sender, token0_amount, token1_amount, tokens_amount);

        _mint(msg.sender, tokens_amount);
    }

    function sellIndex(uint256 tokens_amount) public {

        require(balanceOf(msg.sender) >= tokens_amount, "Invalid index amount");
        require(allowance(msg.sender, address(this)) >= tokens_amount, "Invalid allowance. Please approve your tokens.");

        uint256 token0_amount = tokens_amount.div(3).mul(2);
        uint256 token1_amount = tokens_amount.div(3);

        /** transfer tokens **/
        require(IERC20(token0).transfer(msg.sender, token0_amount), "Failed to transfer token0");
        require(IERC20(token1).transfer(msg.sender, token1_amount), "Failed to transfer token1");

        emit IndexSell(msg.sender, token0_amount, token1_amount, tokens_amount);

        _burn(msg.sender, tokens_amount);
    }

    function getToken0() public view returns (address) {
        return token0;
    }

    function getToken1() public view returns (address) {
        return token1;
    }

    function getToken2() public view returns (address) {
        return token2;
    }
}