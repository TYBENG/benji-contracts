// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {IForwarderRegistry} from "@animoca/ethereum-contracts/contracts/metatx/interfaces/IForwarderRegistry.sol";
import {BenjiToken} from "./../../../token/erc20/BenjiToken.sol";

contract BenjiTokenMock is BenjiToken {
    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint8 tokenDecimals,
        IForwarderRegistry forwarderRegistry,
        address[] memory initialHolders,
        uint256[] memory mintAmounts
    ) BenjiToken(tokenName, tokenSymbol, tokenDecimals, forwarderRegistry, initialHolders, mintAmounts) {}

    function __msgData() external view returns (bytes calldata) {
        return _msgData();
    }
}
