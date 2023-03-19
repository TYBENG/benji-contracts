const Contract_deploy = require('@animoca/ethereum-migrations/src/templates/Contract/deploy');
const {getContractAddress} = require('@animoca/ethereum-migrations/src/helpers/templates');
const {multiSkip, skipIfDeployed} = require("@animoca/ethereum-migrations/src/helpers/common");

module.exports = Contract_deploy('BenjiToken', {
  contract: 'BenjiToken',
  args: [
    {name: 'tokenName', value: 'BENJI'},
    {name: 'tokenSymbol', value: 'BENJI'},
    {name: 'tokenDecimals', value: '18'},
    {name: 'forwarderRegistry', value: getContractAddress('ForwarderRegistry@1.0')},
  ],
  deterministicDeployment: false,
  from: 'BenjiToken_Wallet',
});

module.exports.skip = multiSkip(
  skipIfDeployed('BenjiToken'),
);

module.exports.tags = ['BenjiToken_deploy'];
