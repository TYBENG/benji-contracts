const {mergeConfigs} = require('@animoca/ethereum-contracts/src/config');
require('dotenv').config();

require('@animoca/ethereum-contracts/hardhat-plugins');
require('@animoca/ethereum-migrations/hardhat-plugins');

module.exports = mergeConfigs(
  require('@animoca/ethereum-contracts/hardhat-config'),
  require('@animoca/ethereum-migrations/hardhat-config'),
  require('./hardhat-config')
);
