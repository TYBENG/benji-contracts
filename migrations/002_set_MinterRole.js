module.exports = async (bre) => {
  const {deployments, getNamedAccounts} = hre;
  const {execute} = deployments;
  const {BenjiToken_Wallet} = await getNamedAccounts();
  const {MINTER_ROLE} = require('../constants/constant');

  console.log('++++++++++++++++++++++ Setting minter role to deployer  ++++++++++++++++++++++');
  await execute(
    'BenjiToken',
    {
      from: BenjiToken_Wallet,
      log: true,
    },
    'grantRole',
    MINTER_ROLE,
    BenjiToken_Wallet
  );
};
module.exports.skip = async () => {
  return false; // skip after running it first time and set flag as required
};
module.exports.tags = ['BenjiToken_setMinter'];
