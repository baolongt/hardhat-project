// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { ethers } = require("hardhat");
async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	// We get the contract to deploy
	const MyPets = await hre.ethers.getContractFactory("MyPets");
	const greeter = await MyPets.deploy("bunny");
	let deployer, attacker, user;
	[owner, attacker, user] = await ethers.getSigners();

	await greeter.deployed();
	console.log("deployer", greeter.address);
	console.log("owner", owner.address);
	console.log("attacker", attacker.address);
	console.log("user", user.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
