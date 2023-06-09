// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PDGCoin is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol){
        _mint(msg.sender, 100000 * (10 ** decimals()));
    }

    function decimals() public pure override returns(uint8){
        return 2;
    }
}