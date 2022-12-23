module.exports = async (bre) => {
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
module.exports.skip = async () => {
  return true; // skip after running it first time and set flag as required
};
module.exports.tags = ['BenjiToken_revokeMinter'];
