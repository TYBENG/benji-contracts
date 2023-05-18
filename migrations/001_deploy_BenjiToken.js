const Contract_deploy = require('@animoca/ethereum-migrations/src/templates/Contract/deploy');
const {getContractAddress} = require('@animoca/ethereum-migrations/src/helpers/templates');
const {multiSkip, skipChainTypesExceptFor} = require('@animoca/ethereum-migrations/src/helpers/common');

const BatchMintAmounts = [
  '1000000000000000000000000000',
  '625000000000000000000000000',
  '235000000000000000000000000',
  '200000000000000000000000000',
];

const InitialHolderWallets = [
  '0x37F5bCE551DEA35148FDed568f84fb99BBD3F9A0',
  '0x34231C2559bC143aabd24b5F5407c4347762EA50',
  '0x23fBC110481064EE737c8dc3F2bB324A13f594F4',
  '0x328AC1Bb716C0b486D6714F54ecC293b7b5325dC',
];

module.exports = Contract_deploy('BenjiToken', {
  contract: 'BenjiToken',
  args: [
    {name: 'tokenName', value: 'BENJI'},
    {name: 'tokenSymbol', value: 'BENJI'},
    {name: 'tokenDecimals', value: '18'},
    {
      name: 'initialHolders',
      value: InitialHolderWallets,
    },
    {
      name: 'mintAmounts',
      value: BatchMintAmounts,
    },
    {name: 'forwarderRegistry', value: getContractAddress('ForwarderRegistry@1.0')},
  ],
});

module.exports.skip = multiSkip(skipChainTypesExceptFor('ethereum'));
module.exports.tags = ['BenjiToken_deploy'];
