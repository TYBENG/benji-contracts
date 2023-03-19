const {multiSkip, skipChainTypesExceptFor, skipNetworksTagged} = require('@animoca/ethereum-migrations/src/helpers/common');
const BENJI_airdrop = require('@animoca/ethereum-migrations/src/templates/token/ERC20/airdrop');

const Batch_Mint_Values = [
  '235000000000000000000000000',
  '25000000000000000000000000',
  '1600000000000000000000000000',
  '100000000000000000000000000',
];

const InitialHolderWallets =  [
  '0x5c3b01C47Aa7e64B669FB262521904BC54C8d643',
  '0x08A8313eB71EEbEfc56BCD5f9584c66Bd552D513',
  '0xC20F3d1Bd9Ba05337DA6933E9dD6e7705c585033',
  '0x4e384Fa3d947fb107f8f882a464425be757D84D7',
];

module.exports =  BENJI_airdrop('BenjiToken', InitialHolderWallets, Batch_Mint_Values);
module.exports.skip = multiSkip(
  skipChainTypesExceptFor('ethereum')
);
module.exports.tags = ['mint_batchmint'];
