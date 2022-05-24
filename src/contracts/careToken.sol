// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.6.0/token/ERC20/ERC20.sol";

contract CareToken is ERC20 {
    constructor(uint256 iniatSupply) ERC20("CareToken", "CARET") {
        _mint(msg.sender, iniatSupply);
    }
    function decimals() public pure override returns (uint8){
        return 2;
    }
}
