const Batch_Mint_Values = [
  '235000000000000000000000000',
  '25000000000000000000000000',
  '1600000000000000000000000000',
  '100000000000000000000000000',
];
const Batch_Mint_Wallet = [
  '0x37F5bCE551DEA35148FDed568f84fb99BBD3F9A0',
  '0x34231C2559bC143aabd24b5F5407c4347762EA50',
  '0x23fBC110481064EE737c8dc3F2bB324A13f594F4',
  '0x328AC1Bb716C0b486D6714F54ecC293b7b5325dC',
];
module.exports = async (bre) => {
  const {deployments, getNamedAccounts} = hre;
  const {execute} = deployments;
  const {Primate_Wallet} = await getNamedAccounts();

  console.log('++++++++++++++++++++++ Batch Mint ++++++++++++++++++++++');
  await execute(
    'PRIMATEv2',
    {
      from: Primate_Wallet,
      log: true,
    },
    'batchMint',
    Batch_Mint_Wallet,
    Batch_Mint_Values
  );
};
module.exports.skip = async () => {
  return false; // skip after running it first time and set flag as required
};
module.exports.tags = ['BatchMint_Primate_token'];
