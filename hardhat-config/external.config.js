module.exports = {
  external: {
    contracts: [
      {
        artifacts: [
          'node_modules/@animoca/ethereum-contracts-0.3.1/artifacts',
          'node_modules/@animoca/ethereum-contracts-bridging-0.1.2/artifacts',
          'node_modules/@animoca/ethereum-migrations/imports',
          'node_modules/@animoca/ethereum-migrations/deployments/all',
          'node_modules/@animoca/ethereum-contracts/artifacts',
        ],
        deploy: 'node_modules/@animoca/ethereum-migrations/migrations',
      },
    ],
    deployments: {
      hardhat: ['node_modules/@animoca/ethereum-migrations/deployments/all'],
      localhost: ['node_modules/@animoca/ethereum-migrations/deployments/all'],
      mainnet: ['node_modules/@animoca/ethereum-migrations/deployments/mainnet', 'node_modules/@animoca/ethereum-migrations/deployments/all'],
      goerli: ['node_modules/@animoca/ethereum-migrations/deployments/goerli', 'node_modules/@animoca/ethereum-migrations/deployments/all'],
      matic: ['node_modules/@animoca/ethereum-migrations/deployments/matic', 'node_modules/@animoca/ethereum-migrations/deployments/all'],
      mumbai: ['node_modules/@animoca/ethereum-migrations/deployments/mumbai', 'node_modules/@animoca/ethereum-migrations/deployments/all'],
    },
  },
  namedAccounts: {
    Primate_Wallet: {
      default: '0x0000000000000000000000000000000000000000',
      1: '0x3021ee2657f6dd26a1274279f1bf47547f164619',
      5: '0xD194D2eC8A86cD64921C621ED67fd808Fe362bF9', // goerli testnet
      137: '0xbBB4CA19c92AfD4c164c53f953f841790B928f60', // polygon mainnet
      80001: '0x443B1253e699d44D743DD231288Df4b3275Dec23', // mumbai testnet
    },
  },
};
