// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {IForwarderRegistry} from "@animoca/ethereum-contracts/contracts/metatx/interfaces/IForwarderRegistry.sol";
import {BenjiToken} from "./../../../token/erc20/BenjiToken.sol";

contract BenjiTokenMock is BenjiToken {
    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint8 tokenDecimals,
        address[] memory initialHolders,
        uint256[] memory mintAmounts,
        IForwarderRegistry forwarderRegistry
    ) BenjiToken(tokenName, tokenSymbol, tokenDecimals, initialHolders, mintAmounts, forwarderRegistry) {}

    function __msgData() external view returns (bytes calldata) {
        return _msgData();
    }
}
