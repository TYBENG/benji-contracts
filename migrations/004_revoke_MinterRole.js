const revokeRole = require('@animoca/ethereum-migrations/src/templates/access/AccessControl/revokeRole');
const {getNamedAccount} = require('@animoca/ethereum-migrations/src/helpers/templates');
const {multiSkip, skipChainTypesExceptFor} = require("@animoca/ethereum-migrations/src/helpers/common");

const name = 'BenjiToken';
const ROLE = 'MINTER';

module.exports = revokeRole(name, ROLE, getNamedAccount('deployer'));

module.exports.skip = multiSkip(
  skipChainTypesExceptFor('ethereum'),
);
module.exports.tags = ['revokeRole_BenjiToken'];
