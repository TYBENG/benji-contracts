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
    this.benjiToken = await deployContract('BenjiTokenMock', name, symbol, decimals, forwarderRegistryAddress);
    this.sale = await deployContract('SaleContract', this.benjiToken.address);

    await this.benjiToken.grantRole(await this.benjiToken.MINTER_ROLE(), deployer.address);
  };
  beforeEach(async function () {
    await loadFixture(fixture, this);
  });
  describe('onTokenTransfer', function () {
    it('Should be able to transfer approvals', async function () {
      await this.benjiToken.connect(deployer).mint(deployer.address, 10);
      expect(await this.benjiToken.balanceOf(deployer.address)).to.equals(10);
      await this.benjiToken.connect(deployer).approve(this.sale.address, 5);
      await this.sale.connect(deployer).transferToken(deployer.address, addr1.address, 2);
      expect(await this.benjiToken.balanceOf(addr1.address)).to.equals(2);
      expect(await this.benjiToken.balanceOf(deployer.address)).to.equals(8);
    });
  });
});
