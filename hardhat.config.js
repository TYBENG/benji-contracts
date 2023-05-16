const {mergeConfigs} = require('@animoca/ethereum-contract-helpers/src/config');
require('dotenv').config();

require('@animoca/ethereum-contract-helpers/hardhat-plugins');
require('@animoca/ethereum-migrations/hardhat-plugins');
require('hardhat-gas-reporter');

module.exports = mergeConfigs(
  require('@animoca/ethereum-contracts/hardhat-config'),
  require('@animoca/ethereum-migrations/hardhat-config'),
  require('./hardhat-config')
);
