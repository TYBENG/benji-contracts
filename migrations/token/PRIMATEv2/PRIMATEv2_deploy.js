const Contract_deploy = require('@animoca/ethereum-migrations/src/templates/Contract/deploy');
const {getContractAddress} = require('@animoca/ethereum-migrations/src/helpers/templates');

module.exports = Contract_deploy('PRIMATEv2', {
  contract: 'PRIMATEv2',
  importPath: './artifacts',
  args: [
    {name: 'tokenName', value: 'PRIMATE v2'},
    {name: 'tokenSymbol', value: 'PRIMATE'},
    {name: 'tokenDecimals', value: '18'},
    {name: 'forwarderRegistry', value: getContractAddress('ForwarderRegistry@0.3.1')},
  ],
  deterministicDeployment: false,
  from: 'Primate_Wallet',
});
module.exports.tags = ['PRIMATEv2'];
