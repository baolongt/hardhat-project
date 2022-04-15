const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Access Control", function () {
	let deployer, attacker, user;

	beforeEach(async function () {
		[deployer, attacker, user] = await ethers.getSigners();
		const MyPets = await ethers.getContractFactory("MyPets", deployer);
		this.myPets = await MyPets.deploy("Lu");
	});
	describe("My Pets", () => {
		it("Should set dog name at deployment", async function () {
			expect(await this.myPets.MyDog()).to.eq("Lu");
		});

		it("Should set address deployer account as owner", async function () {
			expect(await this.myPets.Owner()).to.eq(deployer.address);
		});

		it("should be possible for owner to change the dog name", async function () {
			await this.myPets.updateDog("kiki");
			expect(await this.myPets.MyDog()).to.eq("kiki");
		});

		it("shoud NOT be able to change dog name if not the owner", async function () {
			await expect(
				this.myPets.connect(attacker).updateDog("kiki")
			).to.be.revertedWith("Authorized user only");
		});

		it("Should be posssible for owner to transfer ownership", async function () {
			await this.myPets.changeOwner(user.address);
			expect(await this.myPets.Owner()).to.eq(user.address);
		});

		it("Should be posssible for new owner to udpate dog name", async function () {
			await this.myPets.changeOwner(user.address);
			await this.myPets.connect(user).updateDog("kiki");
			expect(await this.myPets.MyDog()).to.eq("kiki");
		});

		it("Shoud not be possible for others to tranfer ownership", async function () {
			await expect(
				this.myPets.connect(attacker).changeOwner(user.address)
			).to.be.revertedWith("Authorized user only");
		});
	});
});
