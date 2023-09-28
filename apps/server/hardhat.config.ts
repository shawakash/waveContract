import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import dotenv from 'dotenv';
dotenv.config();

const {
  SEPOLIA_API_URL,
  SEPOLIA_ACCOUNT_PRIVATE_KEY,
  PROD_API_URL,
  MAINNET_PRIVATE_KEY
} = process.env;

if(!SEPOLIA_API_URL || !SEPOLIA_ACCOUNT_PRIVATE_KEY) {
  throw Error('Add The Envviorment Variables');
}

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  //@ts-ignore
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
      console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: SEPOLIA_API_URL,
      accounts: [SEPOLIA_ACCOUNT_PRIVATE_KEY]
    },
    mainnet: {
      url: PROD_API_URL,
      accounts: [MAINNET_PRIVATE_KEY || ''],
    }
  },
};

export default config;
