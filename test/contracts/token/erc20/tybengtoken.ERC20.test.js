const {behavesLikeERC20} = require('@animoca/ethereum-contracts/test/contracts/token/ERC20/behaviors/ERC20.behavior');
const {runBehaviorTests} = require('@animoca/ethereum-contract-helpers/src/test/run');
const {getForwarderRegistryAddress} = require('@animoca/ethereum-contracts/test/helpers/registries');
const name = 'TYBENG';
const symbol = 'TYBENG';
const decimals = ethers.BigNumber.from('18');
const holders = ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'];
const amount = [100];

const config = {
  immutable: {
    name: 'TYBENGTokenMock',
    ctorArguments: ['tokenName', 'tokenSymbol', 'tokenDecimal', 'initialHolders', 'mintAmounts', 'forwarderRegistry'],
    testMsgData: true,
  },
  defaultArguments: {
    tokenName: name,
    tokenSymbol: symbol,
    tokenDecimal: decimals,
    initialHolders: holders,
    mintAmounts: amount,
    forwarderRegistry: getForwarderRegistryAddress,
  },
};

runBehaviorTests('ERC20 Behavior', config, function (deployFn) {
  const implementation = {
    name,
    symbol,
    decimals,
    holders,
    amount,
    revertMessages: {
      // ERC20
      ApproveToZero: 'ERC20: approval to address(0)',
      InconsistentArrays: 'ERC20: inconsistent arrays',
      SupplyOverflow: 'ERC20: supply overflow',

      // ERC20Allowance
      AllowanceUnderflow: 'ERC20: insufficient allowance',
      AllowanceOverflow: 'ERC20: allowance overflow',

      // ERC2612
      PermitFromZero: 'ERC20: permit from address(0)',
      PermitExpired: 'ERC20: expired permit',
      PermitInvalid: 'ERC20: invalid permit',

      // Admin
      NotMinter: "AccessControl: missing 'minter' role",
      NotContractOwner: 'Ownership: not the owner',
    },
    features: {
      // ERC165: true,
      EIP717: true, // unlimited approval
      AllowanceTracking: true,
    },
    interfaces: {
      ERC20: false,
      ERC20Detailed: true,
      ERC20Metadata: false,
      ERC20Allowance: true,
      ERC20BatchTransfer: false,
      ERC20Safe: false,
      ERC20Permit: true,
    },
    methods: {},
    deploy: async function () {
      const contract = await deployFn();
      return contract;
    },
  };

  let deployer;

  before(async function () {
    [deployer] = await ethers.getSigners();
  });

  behavesLikeERC20(implementation);
});
