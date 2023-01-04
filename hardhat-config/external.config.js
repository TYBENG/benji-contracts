module.exports = {
  external: {
    contracts: [
      {
        artifacts: [
          'node_modules/@animoca/ethereum-contracts-0.3.1/artifacts',
          'node_modules/@animoca/ethereum-contracts/artifacts',
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
};
