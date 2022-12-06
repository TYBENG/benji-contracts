const {expect} = require('chai');
const {ethers} = require('hardhat');

describe('PRIMATEv2 Token contract', function () {
  let primateV2Token;
  let MINTER_ROLE = '0x6d696e7465720000000000000000000000000000000000000000000000000000';

  beforeEach(async function () {
    [owner, addr1, addr2] = await hre.ethers.getSigners();
    const PrimateV2Token = await hre.ethers.getContractFactory('PRIMATEv2');
    primateV2Token = await PrimateV2Token.deploy('PRIMATE v2', 'PRIMATE', '18', '0x539B86cD88fd41272335f9E46eAf7bF64f9Fa1e5');
    await primateV2Token.deployed();
  });

  describe('Deploy Token', function () {
    it('Should set the right owner', async function () {
      expect(await primateV2Token.owner()).to.equal(owner.address);
    });

    it('Should set the right role, verify role and revoke role', async function () {
      await primateV2Token.connect(owner).grantRole(MINTER_ROLE, owner.address);
      expect(await primateV2Token.connect(owner).hasRole(MINTER_ROLE, owner.address)).to.equal(true);
      await primateV2Token.connect(owner).revokeRole(MINTER_ROLE, owner.address);
      expect(await primateV2Token.connect(owner).hasRole(MINTER_ROLE, owner.address)).to.equal(false);
    });

    it('Should verify the right owner after ownership transfer', async function () {
      await primateV2Token.connect(owner).transferOwnership(addr1.address);
      expect(await primateV2Token.owner()).to.equal(addr1.address);
    });
  });

  describe('Mint Tokens & Transfer tokens', function () {
    it("Should fail if sender doesn't have minter role", async function () {
      await expect(primateV2Token.connect(owner).mint(addr1.address, 1)).to.be.revertedWith("AccessControl: missing 'minter' role");
    });

    it('Should successfully mint a token with minter role', async function () {
      await primateV2Token.connect(owner).grantRole(MINTER_ROLE, owner.address);
      await primateV2Token.connect(owner).mint(addr1.address, 1);
      expect(await primateV2Token.balanceOf(addr1.address)).to.equals(1);
    });

    it('Should successfully batch mint tokens with minter role', async function () {
      await primateV2Token.connect(owner).grantRole(MINTER_ROLE, owner.address);
      await primateV2Token.connect(owner).batchMint([addr1.address, addr2.address], [1, 2]);
      expect(await primateV2Token.balanceOf(addr1.address)).to.equals(1);
      expect(await primateV2Token.balanceOf(addr2.address)).to.equals(2);
    });

    it('Should successfully transfer a token to other wallets', async function () {
      await primateV2Token.connect(owner).grantRole(MINTER_ROLE, owner.address);
      await primateV2Token.connect(owner).mint(addr1.address, 1);
      expect(await primateV2Token.balanceOf(addr1.address)).to.equals(1);
      await primateV2Token.connect(addr1).transfer(addr2.address, 1);
      expect(await primateV2Token.balanceOf(addr1.address)).to.equals(0);
      expect(await primateV2Token.balanceOf(addr2.address)).to.equals(1);
    });

    it('Should successfully batch transfer tokens to other wallets', async function () {
      await primateV2Token.connect(owner).grantRole(MINTER_ROLE, owner.address);
      await primateV2Token.connect(owner).mint(owner.address, 10);
      expect(await primateV2Token.balanceOf(owner.address)).to.equals(10);
      expect(await primateV2Token.balanceOf(addr1.address)).to.equals(0);
      expect(await primateV2Token.balanceOf(addr1.address)).to.equals(0);
      await primateV2Token.connect(owner).batchTransfer([addr1.address, addr2.address], [4, 5]);
      expect(await primateV2Token.balanceOf(addr1.address)).to.equals(4);
      expect(await primateV2Token.balanceOf(addr2.address)).to.equals(5);
      expect(await primateV2Token.balanceOf(owner.address)).to.equals(1);
    });
  });

  describe('Burn tokens', function () {
    it('Should update balances after burn', async function () {
      await primateV2Token.connect(owner).grantRole(MINTER_ROLE, owner.address);
      await primateV2Token.connect(owner).mint(owner.address, 10);
      expect(await primateV2Token.balanceOf(owner.address)).to.equals(10);
      await primateV2Token.connect(owner).burn(10);
      expect(await primateV2Token.balanceOf(owner.address)).to.equals(0);
    });

    it("Should decrease token's total supply after burn", async function () {
      await primateV2Token.connect(owner).grantRole(MINTER_ROLE, owner.address);
      await primateV2Token.connect(owner).mint(owner.address, 10);
      expect(await primateV2Token.balanceOf(owner.address)).to.equals(10);
      await primateV2Token.connect(owner).burn(5);
      expect(await primateV2Token.totalSupply()).to.equals(5);
    });

    it('Should be allowed to burn allowance token', async function () {
      await primateV2Token.connect(owner).grantRole(MINTER_ROLE, owner.address);
      await primateV2Token.connect(owner).mint(owner.address, 10);
      expect(await primateV2Token.balanceOf(owner.address)).to.equals(10);
      await primateV2Token.connect(owner).approve(addr1.address, 4);
      await primateV2Token.connect(addr1).burnFrom(owner.address, 3);
      expect(await primateV2Token.balanceOf(owner.address)).to.equals(7);
    });

    it('Should not exceed allowance for token burn', async function () {
      await primateV2Token.connect(owner).grantRole(MINTER_ROLE, owner.address);
      await primateV2Token.connect(owner).mint(owner.address, 10);
      expect(await primateV2Token.balanceOf(owner.address)).to.equals(10);
      await primateV2Token.connect(owner).approve(addr1.address, 3);
      await expect(primateV2Token.connect(addr1).burnFrom(owner.address, 4)).to.be.revertedWith('ERC20: insufficient allowance');
    });
  });
});
