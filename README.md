# Benji Contracts V2


Example .env
```bash
ETHERSCAN_API_KEY_MAINNET=abc123
MNEMONIC=goerli
```
Note: Create a file `.mnemonic_goerli` with the seed phrase that you are deploying with.



After making changes for contracts and migration scripts. To run all the tasks for testing.
$ yarn run-all

### Deploy contracts
# Run deployment on hardhat 
$ yarn deploy 

# Run deployment on goerli
$ yarn deploy:goerli

