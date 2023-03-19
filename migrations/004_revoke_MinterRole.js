const revokeRole = require('@animoca/ethereum-migrations/src/templates/access/AccessControl/revokeRole');
const {getNamedAccount} = require('@animoca/ethereum-migrations/src/helpers/templates');
const {multiSkip, skipChainTypesExceptFor} = require("@animoca/ethereum-migrations/src/helpers/common");

const name = 'BenjiToken';
const ROLE = 'MINTER';

module.exports = async (hre) => {
  const {deployments, getNamedAccounts} = hre;
  const {execute} = deployments;
  const {BenjiToken_Wallet} = await getNamedAccounts();
  const {MINTER_ROLE} = require('../constants/constant');

  console.log('++++++++++++++++++++++ revoke minter role  ++++++++++++++++++++++');
  await execute(
    'BenjiToken',
    {
      from: BenjiToken_Wallet,
      log: true,
    },
    'revokeRole',
    MINTER_ROLE,
    BenjiToken_Wallet
  );
};

// module.exports = revokeRole(name, ROLE, getNamedAccount('BenjiToken_Wallet'), {
//   from: 'BenjiToken_Wallet',
// });

module.exports.skip = multiSkip(
  skipChainTypesExceptFor('ethereum'),
);
module.exports.tags = ['revokeRole_BenjiToken'];
