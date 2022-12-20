// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {IForwarderRegistry} from "@animoca/ethereum-contracts/contracts/metatx/interfaces/IForwarderRegistry.sol";
import {PRIMATEv2} from "./../../../token/erc20/PRIMATEv2.sol";

contract PRIMATEv2Mock is PRIMATEv2 {
    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint8 tokenDecimals,
        IForwarderRegistry forwarderRegistry
    ) PRIMATEv2(tokenName, tokenSymbol, tokenDecimals, forwarderRegistry) {}

    function __msgData() external view returns (bytes calldata) {
        return _msgData();
    }
}
