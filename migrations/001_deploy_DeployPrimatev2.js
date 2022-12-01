const {ethers, upgrades} = require('hardhat');
const {skipIfContractExists, multiSkip} = require('../tasks/hardhat-deploy-migrations/migrations');

module.exports = async ({getNamedAccounts, deployments, getChainId, getUnnamedAccounts}) => {
  const {deploy} = deployments;
  const {Primate_Wallet} = await getNamedAccounts();

  let networkChainId = await getChainId();
  console.log(`getChainId: ${networkChainId}`);

  let tokenInfo = {
    tokenName: 'PRIMATE v2',
    tokenSymbol: 'PRIMATE',
    tokenDecimals: 18,
  };

  let constructorAddress = {
    31337: {
      forwarderRegistry: '0x539B86cD88fd41272335f9E46eAf7bF64f9Fa1e5',
    },
    5: {
      forwarderRegistry: '0x539B86cD88fd41272335f9E46eAf7bF64f9Fa1e5',
    },
    1: {
      forwarderRegistry: '0x539B86cD88fd41272335f9E46eAf7bF64f9Fa1e5',
    },
  };

  await deploy('PRIMATEv2', {
    from: Primate_Wallet,
    args: [tokenInfo.tokenName, tokenInfo.tokenSymbol, tokenInfo.tokenDecimals, constructorAddress[networkChainId].forwarderRegistry],
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  });
};

module.exports.skip = multiSkip([
  // skipIfChainIdIs(['1']), // migration already done
  // skipIfChainIdIs(['80001']), // migration already done
  // skipIfChainIdIs(['5']), // migration already done for goerli
  // skipIfChainIdIs(['137']), // migration already done
  // skipIfChainIdIs(['97']), // bsctest
  // skipIfChainIdIs(['56']), // bsc mainnet
  skipIfContractExists('NFTFusion'), // contract guard
]);
module.exports.tags = ['NFTFusion'];
