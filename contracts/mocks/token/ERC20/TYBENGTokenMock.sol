// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {IForwarderRegistry} from "@animoca/ethereum-contracts/contracts/metatx/interfaces/IForwarderRegistry.sol";
import {TYBENGToken} from "./../../../token/erc20/TYBENGToken.sol";

contract TYBENGTokenMock is TYBENGToken {
    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint8 tokenDecimals,
        address[] memory initialHolders,
        uint256[] memory mintAmounts,
        IForwarderRegistry forwarderRegistry
    ) TYBENGToken(tokenName, tokenSymbol, tokenDecimals, initialHolders, mintAmounts, forwarderRegistry) {}

    function __msgData() external view returns (bytes calldata) {
        return _msgData();
    }
}
