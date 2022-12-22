const grantRole = require('@animoca/ethereum-migrations/src/templates/access/AccessControl/grantRole');
const name = 'PRIMATEv2';
const ROLE = 'MINTER';
const addressToGranRole = [
  '0x443B1253e699d44D743DD231288Df4b3275Dec23',
  '0xbBB4CA19c92AfD4c164c53f953f841790B928f60',
  '0xD194D2eC8A86cD64921C621ED67fd808Fe362bF9',
];
module.exports = grantRole(name, ROLE, addressToGranRole, {
  from: 'Primate_Wallet',
});
module.exports.tags = ['grantRole_PRIMATEv2'];
