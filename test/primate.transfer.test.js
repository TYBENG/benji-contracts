const {expect} = require('chai');
const {ethers} = require('hardhat');

describe('PRIMATEv2 test transfer from using contract', function () {
  let primateV2Token;
  let sale;
  let MINTER_ROLE = '0x6d696e7465720000000000000000000000000000000000000000000000000000';

  beforeEach(async function () {
    [owner, addr1, addr2] = await hre.ethers.getSigners();
    const PrimateV2Token = await hre.ethers.getContractFactory('PRIMATEv2Mock');
    primateV2Token = await PrimateV2Token.deploy('PRIMATE v2', 'PRIMATE', '18', '0x539B86cD88fd41272335f9E46eAf7bF64f9Fa1e5');
    await primateV2Token.deployed();
    const saleContract = await hre.ethers.getContractFactory('SaleContract');
    sale = await saleContract.deploy(primateV2Token.address);
    await sale.deployed();
  });
  describe('Deploy Sale', function () {
    it('Should be able to transfer approvals', async function () {
      await primateV2Token.connect(owner).grantRole(MINTER_ROLE, owner.address);
      await primateV2Token.connect(owner).mint(owner.address, 10);
      expect(await primateV2Token.balanceOf(owner.address)).to.equals(10);
      await primateV2Token.connect(owner).approve(sale.address, 5);
      await sale.connect(owner).transferToken(owner.address, addr1.address, 2);
      expect(await primateV2Token.balanceOf(addr1.address)).to.equals(2);
    });
  });
});
