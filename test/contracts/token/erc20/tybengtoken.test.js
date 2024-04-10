const {expect} = require('chai');
const {getForwarderRegistryAddress} = require('@animoca/ethereum-contracts/test/helpers/registries');
const {loadFixture} = require('@animoca/ethereum-contract-helpers/src/test/fixtures');
const {deployContract} = require('@animoca/ethereum-contract-helpers/src/test/deploy');

describe('TYBENG Token contract', function () {
  let deployer, addr1, addr2, addr3, holders, amount;
  const name = 'TYBENG v2 MOCK';
  const symbol = 'MOCK TYBENG';
  const decimals = ethers.BigNumber.from('18');

  before(async function () {
    [owner, addr1, addr2, addr3] = await hre.ethers.getSigners();
    holders = [addr1.address, addr2.address];
    amount = [100, 100];
  });

  const fixture = async function () {
    const forwarderRegistryAddress = await getForwarderRegistryAddress();

    this.tybengToken = await deployContract('TYBENGTokenMock', name, symbol, decimals, holders, amount, forwarderRegistryAddress);
  };
  beforeEach(async function () {
    await loadFixture(fixture, this);
  });
  describe('Deploy Token', function () {
    it('Verify Total supply', async function () {
      expect(await this.tybengToken.totalSupply()).to.equal(200);
    });

    it('Should verify the right owner after ownership transfer', async function () {
      await this.tybengToken.connect(owner).transferOwnership(addr1.address);
      expect(await this.tybengToken.owner()).to.equal(addr1.address);
    });
  });

  describe(' Transfer tokens', function () {
    it('Should successfully transfer a token to other wallets', async function () {
      expect(await this.tybengToken.balanceOf(addr1.address)).to.equals(100);
      await this.tybengToken.connect(addr1).transfer(addr3.address, 10);
      expect(await this.tybengToken.balanceOf(addr1.address)).to.equals(90);
      expect(await this.tybengToken.balanceOf(addr3.address)).to.equals(10);
    });
  });
});
