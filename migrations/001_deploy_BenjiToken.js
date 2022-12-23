const {getForwarderRegistryAddress} = require('@animoca/ethereum-contracts/test/helpers/run');
const {multiSkip, skipIfContractExists} = require("@animoca/ethereum-migrations/src/helpers/common");

module.exports = async ({getNamedAccounts, deployments, getChainId, getUnnamedAccounts}) => {
  const {deploy} = deployments;
  const {BenjiToken_Wallet} = await getNamedAccounts();

  let networkChainId = await getChainId();
  console.log(`getChainId: ${networkChainId}`);

  let tokenInfo = {
    tokenName: 'BENJI',
    tokenSymbol: 'BENJI',
    tokenDecimals: 18,
  };

  const forwarderRegistryAddress = await getForwarderRegistryAddress();

  await deploy('BenjiToken', {
    from: BenjiToken_Wallet,
    args: [tokenInfo.tokenName, tokenInfo.tokenSymbol, tokenInfo.tokenDecimals, forwarderRegistryAddress],
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
  skipIfContractExists('BenjiToken'), // contract guard
]);
module.exports.tags = ['BenjiToken'];
