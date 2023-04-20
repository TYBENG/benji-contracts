const grantRole = require('@animoca/ethereum-migrations/src/templates/access/AccessControl/grantRole');
const {getNamedAccount} = require('@animoca/ethereum-migrations/src/helpers/templates');
const {multiSkip, skipChainTypesExceptFor} = require("@animoca/ethereum-migrations/src/helpers/common");

const name = 'BenjiToken';
const ROLE = 'MINTER';

module.exports =  grantRole(name, ROLE, getNamedAccount('deployer'));

module.exports.skip = multiSkip(
  skipChainTypesExceptFor('ethereum'),
);
module.exports.tags = ['grantRole_BenjiToken'];
