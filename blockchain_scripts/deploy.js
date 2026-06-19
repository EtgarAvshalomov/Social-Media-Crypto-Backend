const hre = require("hardhat");

async function main() {
  console.log("Deploying contract...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const Token = await hre.ethers.getContractFactory("Dopamine");

  const token = await Token.deploy(deployer.address, deployer.address);

  await token.waitForDeployment();

  const address = await token.getAddress();
  
  console.log("---------------------------------------------");
  console.log("SUCCESS! Token deployed to:", address);
  console.log("---------------------------------------------");
  console.log("Copy that address ^ and import it into MetaMask!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});