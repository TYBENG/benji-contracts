module.exports = async (bre) => {
  const {deployments, getNamedAccounts} = hre;
  const {execute} = deployments;
  const {Primate_Wallet} = await getNamedAccounts();
  const {MINTER_ROLE} = require('../constants/constant');

  console.log('++++++++++++++++++++++ Setting minter role to deployer  ++++++++++++++++++++++');
  await execute(
    'PRIMATEv2',
    {
      from: Primate_Wallet,
      log: true,
    },
    'grantRole',
    MINTER_ROLE,
    Primate_Wallet
  );
};
module.exports.skip = async () => {
  return false; // skip after running it first time and set flag as required
};
module.exports.tags = ['Primate_v2_setMinter'];
