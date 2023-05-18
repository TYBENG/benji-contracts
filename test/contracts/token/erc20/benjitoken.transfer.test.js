const {expect} = require('chai');
const {getForwarderRegistryAddress} = require('@animoca/ethereum-contracts/test/helpers/registries');
const {loadFixture} = require('@animoca/ethereum-contract-helpers/src/test/fixtures');
const {deployContract} = require('@animoca/ethereum-contract-helpers/src/test/deploy');
const unit = require('ethjs-unit');

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
    let tokenBalance = unit.toWei('10', 'ether').toString();

    const BatchMintAmounts = [tokenBalance];

    const InitialHolderWallets = [deployer.address];

    this.benjiToken = await deployContract(
      'BenjiTokenMock',
      name,
      symbol,
      decimals,
      InitialHolderWallets,
      BatchMintAmounts,
      forwarderRegistryAddress
    );
    this.sale = await deployContract('SaleContract', this.benjiToken.address);
  };
  beforeEach(async function () {
    await loadFixture(fixture, this);
  });
  describe('onTokenTransfer', function () {
    it('Should be able to transfer approvals', async function () {
      expect(await this.benjiToken.balanceOf(deployer.address)).to.equals(unit.toWei('10', 'ether').toString());
      await this.benjiToken.connect(deployer).approve(this.sale.address, unit.toWei('5', 'ether').toString());
      await this.sale.connect(deployer).transferToken(deployer.address, addr1.address, unit.toWei('2', 'ether').toString());
      expect(await this.benjiToken.balanceOf(addr1.address)).to.equals(unit.toWei('2', 'ether').toString());
      expect(await this.benjiToken.balanceOf(deployer.address)).to.equals(unit.toWei('8', 'ether').toString());
    });
  });
});
