
const hre = require("hardhat");

async function main() {


  const lock = await hre.ethers.getContractFactory("Todo" );

  const result = await lock.deploy();
  result.deployed()
  console.log(
    ` 
     deployed to ${result.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
