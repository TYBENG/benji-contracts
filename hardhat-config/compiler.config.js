const dotenv = require('dotenv');

dotenv.config({path: '.env'});

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
      gas: 135500000,
      blockGasLimit: 135521976,
      live: false,
    },
    localhost: {
      chainId: 31337,
      gas: 'auto',
      blockGasLimit: 13550000,
      url: 'http://localhost:8545',
      live: false,
    },
    goerli: {
      chainId: 5,
      gas: 'auto',
      blockGasLimit: 13550000,
      url: 'https://eth-goerli.alchemyapi.io/v2/2w5uDgl1IDN0Q6ZBox-UT9HyRxNNTn-E',
      tags: ['testnet', 'goerli'],
      live: true,
      defaultProvider: 'alchemy',
    },
    polygonMumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/m3s5MtcOj4usZLSOp7liofDy-74mVYZp',
      chainId: 80001,
      live: true,
      tags: ['testnet', 'mumbai'],
      defaultProvider: 'alchemy',
    },
    polygon: {
      url: 'https://polygon-mainnet.g.alchemy.com/v2/1NR6BF7v5zO3H88OU-rrjMj-N463sW_R',
      chainId: 137,
      gasPrice: 'auto',
      live: true,
      saveDeployments: true,
      tags: ['mainnet', 'polygon'],
      defaultProvider: 'alchemy',
    },
    mainnet: {
      url: 'https://polygon-mainnet.g.alchemy.com/v2/TmzbTUjxJsxN9jVjnCXqYUzvk8culqq1',
      chainId: 137,
      gasPrice: 'auto',
      live: true,
      saveDeployments: true,
      tags: ['mainnet', 'ethereum'],
      defaultProvider: 'alchemy',
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY_GOERLI || '',
      mainnet: process.env.ETHERSCAN_API_KEY_MAINNET || '',
      polygonMumbai: process.env.ETHERSCAN_API_KEY_MUMBAI || '',
      polygon: process.env.ETHERSCAN_API_KEY_POLYGON || '',
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
    ],
  },
};
