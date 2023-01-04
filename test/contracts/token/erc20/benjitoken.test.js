const {expect} = require('chai');
const {getForwarderRegistryAddress} = require('@animoca/ethereum-contracts/test/helpers/run');
const {loadFixture} = require('@animoca/ethereum-contracts/test/helpers/fixtures');
const {deployContract} = require('@animoca/ethereum-contracts/test/helpers/contract');

describe('BENJI Token contract', function () {
  let deployer, addr1, addr2;
  const name = 'BENJI v2 MOCK';
  const symbol = 'MOCK BENJI';
  const decimals = ethers.BigNumber.from('18');

  before(async function () {
    [owner, addr1, addr2] = await hre.ethers.getSigners();
  });

  const fixture = async function () {
    const forwarderRegistryAddress = await getForwarderRegistryAddress();
    console.log(forwarderRegistryAddress);
    this.benjiToken = await deployContract('BenjiTokenMock', name, symbol, decimals, forwarderRegistryAddress);

    await this.benjiToken.grantRole(await this.benjiToken.MINTER_ROLE(), owner.address);
  };
  beforeEach(async function () {
    await loadFixture(fixture, this);
  });
  describe('Deploy Token', function () {
    it('Should set the right owner', async function () {
      expect(await this.benjiToken.owner()).to.equal(owner.address);
    });

    it('Should set the right role, verify role and revoke role', async function () {
      await this.benjiToken.connect(owner).grantRole(await this.benjiToken.MINTER_ROLE(), owner.address);
      expect(await this.benjiToken.connect(owner).hasRole(await this.benjiToken.MINTER_ROLE(), owner.address)).to.equal(true);
      await this.benjiToken.connect(owner).revokeRole(await this.benjiToken.MINTER_ROLE(), owner.address);
      expect(await this.benjiToken.connect(owner).hasRole(await this.benjiToken.MINTER_ROLE(), owner.address)).to.equal(false);
    });

    it('Should verify the right owner after ownership transfer', async function () {
      await this.benjiToken.connect(owner).transferOwnership(addr1.address);
      expect(await this.benjiToken.owner()).to.equal(addr1.address);
    });
  });

  describe('Mint Tokens & Transfer tokens', function () {
    it("Should fail if sender doesn't have minter role", async function () {
      await expect(this.benjiToken.connect(addr1).mint(addr1.address, 1)).to.be.revertedWith("AccessControl: missing 'minter' role");
    });

    it('Should successfully mint a token with minter role', async function () {
      await this.benjiToken.connect(owner).grantRole(await this.benjiToken.MINTER_ROLE(), owner.address);
      await this.benjiToken.connect(owner).mint(addr1.address, 1);
      expect(await this.benjiToken.balanceOf(addr1.address)).to.equals(1);
    });

    it('Should successfully batch mint tokens with minter role', async function () {
      await this.benjiToken.connect(owner).grantRole(await this.benjiToken.MINTER_ROLE(), owner.address);
      await this.benjiToken.connect(owner).batchMint([addr1.address, addr2.address], [1, 2]);
      expect(await this.benjiToken.balanceOf(addr1.address)).to.equals(1);
      expect(await this.benjiToken.balanceOf(addr2.address)).to.equals(2);
    });

    it('Should successfully transfer a token to other wallets', async function () {
      await this.benjiToken.connect(owner).grantRole(await this.benjiToken.MINTER_ROLE(), owner.address);
      await this.benjiToken.connect(owner).mint(addr1.address, 1);
      expect(await this.benjiToken.balanceOf(addr1.address)).to.equals(1);
      await this.benjiToken.connect(addr1).transfer(addr2.address, 1);
      expect(await this.benjiToken.balanceOf(addr1.address)).to.equals(0);
      expect(await this.benjiToken.balanceOf(addr2.address)).to.equals(1);
    });

    it('Should successfully batch transfer tokens to other wallets', async function () {
      await this.benjiToken.connect(owner).grantRole(await this.benjiToken.MINTER_ROLE(), owner.address);
      await this.benjiToken.connect(owner).mint(owner.address, 10);
      expect(await this.benjiToken.balanceOf(owner.address)).to.equals(10);
      expect(await this.benjiToken.balanceOf(addr1.address)).to.equals(0);
      expect(await this.benjiToken.balanceOf(addr1.address)).to.equals(0);
      await this.benjiToken.connect(owner).batchTransfer([addr1.address, addr2.address], [4, 5]);
      expect(await this.benjiToken.balanceOf(addr1.address)).to.equals(4);
      expect(await this.benjiToken.balanceOf(addr2.address)).to.equals(5);
      expect(await this.benjiToken.balanceOf(owner.address)).to.equals(1);
    });
  });

  describe('Burn tokens', function () {
    it('Should update balances after burn', async function () {
      await this.benjiToken.connect(owner).grantRole(await this.benjiToken.MINTER_ROLE(), owner.address);
      await this.benjiToken.connect(owner).mint(owner.address, 10);
      expect(await this.benjiToken.balanceOf(owner.address)).to.equals(10);
      await this.benjiToken.connect(owner).burn(10);
      expect(await this.benjiToken.balanceOf(owner.address)).to.equals(0);
    });

    it("Should decrease token's total supply after burn", async function () {
      await this.benjiToken.connect(owner).grantRole(await this.benjiToken.MINTER_ROLE(), owner.address);
      await this.benjiToken.connect(owner).mint(owner.address, 10);
      expect(await this.benjiToken.balanceOf(owner.address)).to.equals(10);
      await this.benjiToken.connect(owner).burn(5);
      expect(await this.benjiToken.totalSupply()).to.equals(5);
    });

    it('Should be allowed to burn allowance token', async function () {
      await this.benjiToken.connect(owner).grantRole(await this.benjiToken.MINTER_ROLE(), owner.address);
      await this.benjiToken.connect(owner).mint(owner.address, 10);
      expect(await this.benjiToken.balanceOf(owner.address)).to.equals(10);
      await this.benjiToken.connect(owner).approve(addr1.address, 4);
      await this.benjiToken.connect(addr1).burnFrom(owner.address, 3);
      expect(await this.benjiToken.balanceOf(owner.address)).to.equals(7);
    });

    it('Should not exceed allowance for token burn', async function () {
      await this.benjiToken.connect(owner).grantRole(await this.benjiToken.MINTER_ROLE(), owner.address);
      await this.benjiToken.connect(owner).mint(owner.address, 10);
      expect(await this.benjiToken.balanceOf(owner.address)).to.equals(10);
      await this.benjiToken.connect(owner).approve(addr1.address, 3);
      await expect(this.benjiToken.connect(addr1).burnFrom(owner.address, 4)).to.be.revertedWith('ERC20: insufficient allowance');
    });
  });
});
