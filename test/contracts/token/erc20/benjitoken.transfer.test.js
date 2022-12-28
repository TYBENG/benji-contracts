const {expect} = require('chai');
const {getForwarderRegistryAddress} = require('@animoca/ethereum-contracts/test/helpers/run');
const {loadFixture} = require('@animoca/ethereum-contracts/test/helpers/fixtures');
const {deployContract} = require('@animoca/ethereum-contracts/test/helpers/contract');

describe('BenjiTokenTransfer', function () {
  let deployer, addr1, addr2;
  const name = 'BENJI v2 MOCK';
  const symbol = 'MOCK BENJI';
  const decimals = ethers.BigNumber.from('18');

  before(async function () {
    [deployer, addr1, addr2] = await hre.ethers.getSigners();
  });

  const fixture = async function () {
    const forwarderRegistryAddress = await getForwarderRegistryAddress();
    console.log(forwarderRegistryAddress);
    this.primateToken = await deployContract('BenjiTokenMock', name, symbol, decimals, forwarderRegistryAddress);
    this.sale = await deployContract('SaleContract', this.primateToken.address);

    await this.primateToken.grantRole(await this.primateToken.MINTER_ROLE(), deployer.address);
  };
  beforeEach(async function () {
    await loadFixture(fixture, this);
  });
  describe('onTokenTransfer', function () {
    it('Should be able to transfer approvals', async function () {
      await this.primateToken.connect(deployer).mint(deployer.address, 10);
      expect(await this.primateToken.balanceOf(deployer.address)).to.equals(10);
      await this.primateToken.connect(deployer).approve(this.sale.address, 5);
      await this.sale.connect(deployer).transferToken(deployer.address, addr1.address, 2);
      expect(await this.primateToken.balanceOf(addr1.address)).to.equals(2);
      expect(await this.primateToken.balanceOf(deployer.address)).to.equals(8);
    });
  });
});
