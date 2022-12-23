const {multiSkip, skipChainTypesExceptFor, skipNetworksTagged} = require('@animoca/ethereum-migrations/src/helpers/common');
const BENJI_airdrop = require('@animoca/ethereum-migrations/src/templates/token/ERC20/airdrop');

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

module.exports = BENJI_airdrop('BenjiToken', Batch_Mint_Wallet, Batch_Mint_Values);
module.exports.skip = multiSkip(skipNetworksTagged('production'), skipChainTypesExceptFor('ethereum'));
