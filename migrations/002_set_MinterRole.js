const grantRole = require('@animoca/ethereum-migrations/src/templates/access/AccessControl/grantRole');
const name = 'BenjiToken';
const ROLE = 'MINTER';
const addressToGranRole = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

module.exports = grantRole(name, ROLE, addressToGranRole, {
  from: 'BenjiToken_Wallet',
});

module.exports.tags = ['grantRole_BenjiToken'];
