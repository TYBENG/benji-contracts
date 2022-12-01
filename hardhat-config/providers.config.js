module.exports = {
  providers: {
    alchemy: {
      // hardhat: 'http://127.0.0.1:7545',
      // localhost: 'http://localhost:8545',
      mainnet: 'https://polygon-mainnet.g.alchemy.com/v2/TmzbTUjxJsxN9jVjnCXqYUzvk8culqq1',
      rinkeby: 'https://eth-goerli.alchemyapi.io/v2/2w5uDgl1IDN0Q6ZBox-UT9HyRxNNTn-E',
      goerli: 'https://eth-goerli.alchemyapi.io/v2/2w5uDgl1IDN0Q6ZBox-UT9HyRxNNTn-E',
      polygon: 'https://polygon-mainnet.g.alchemy.com/v2/1NR6BF7v5zO3H88OU-rrjMj-N463sW_R',
      polygonMumbai: 'https://polygon-mumbai.g.alchemy.com/v2/m3s5MtcOj4usZLSOp7liofDy-74mVYZp',
    },
    binance: {
      bsc: 'https://bsc-dataseed.binance.org/',
      bsctest: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    },
  },
};
