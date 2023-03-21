const Contract_deploy = require('@animoca/ethereum-migrations/src/templates/Contract/deploy');
const {getContractAddress} = require('@animoca/ethereum-migrations/src/helpers/templates');

module.exports = Contract_deploy('BenjiToken', {
  contract: 'BenjiToken',
  args: [
    {name: 'tokenName', value: 'BENJI'},
    {name: 'tokenSymbol', value: 'BENJI'},
    {name: 'tokenDecimals', value: '18'},
    {name: 'forwarderRegistry', value: getContractAddress('ForwarderRegistry@1.0')},
  ],
  deterministicDeployment: false,
});

module.exports.tags = ['BenjiToken_deploy'];
