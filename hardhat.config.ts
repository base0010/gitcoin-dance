import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy-ethers";
import "hardhat-deploy";
import "@symfoni/hardhat-react";
import "hardhat-typechain";
import "@typechain/ethers-v5";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

const mnemonic:string =  "test test test test test test test test test test test junk";
const rinkeby_pk:string = "783b0aa46b27c674825500006e43ec3a74861006f45f0ab62d6bca3d4a017a31"

const urlOverride = undefined;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  react: {
    providerPriority: ["web3modal", "hardhat"],
  },
  networks: {
    hardhat: {
      inject: false, // optional. If true, it will EXPOSE your mnemonic in your frontend code. Then it would be available as an "in-page browser wallet" / signer which can sign without confirmation.
      accounts: {
        mnemonic: mnemonic, // test test test test test test test test test test test junk
      },
    },
    localhost: {
      accounts: {
        accountsBalance: "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        mnemonic,
      },
      chainId: 1337,
      loggingEnabled: false,
      saveDeployments: false,
      url: urlOverride || "http://localhost:8545",
    },
    mainnet: {
      accounts: { mnemonic },
      chainId: 1,
      url: urlOverride || "http://localhost:8545",
    },
    rinkeby: {
      gas: 'auto',
      gasPrice: 8000000000,
      accounts: [`0x${rinkeby_pk}`] ,
      chainId: 4,
      url: urlOverride || "https://rinkeby.infura.io/v3/06a5f5f50dcb49da9b57f0647fde2082",
    },
    goerli: {
      gas: 'auto',
      gasPrice: 800000000000,
      accounts: [`0x${rinkeby_pk}`] ,
      chainId: 5,
      url: urlOverride || "https://goerli.infura.io/v3/06a5f5f50dcb49da9b57f0647fde2082",

    },
    kovan: {
      accounts: { mnemonic },
      chainId: 42,
      url: urlOverride || "http://localhost:8545",
    },
    matic: {
      accounts: { mnemonic },
      chainId: 137,
      url: urlOverride || "http://localhost:8545",
    },
    mumbai: {
      accounts: { mnemonic },
      chainId: 80001,
      url: urlOverride || "https://rpc-mumbai.matic.today",
    },
    arbitrumtest: {
      accounts: { mnemonic },
      chainId: 79377087078960,
      url: urlOverride || "https://kovan3.arbitrum.io/rpc",
    },
    xdai: {
      accounts: { mnemonic },
      chainId: 100,
      url: urlOverride || "http://localhost:8545",
    },
    bsctestnet: {
      accounts: { mnemonic },
      chainId: 97,
      url: urlOverride || "https://data-seed-prebsc-1-s1.binance.org:8545/",
    },
    bsc: {
      accounts: { mnemonic },
      chainId: 56,
      url: urlOverride || "https://bsc-dataseed.binance.org/",
    },
    hecotestnet: {
      accounts: { mnemonic },
      chainId: 256,
      url: urlOverride || "https://http-testnet.hecochain.com",
    },
    harmony: {
      accounts: { mnemonic },
      chainId: 1666600000,
      url: urlOverride || "https://api.harmony.one/",
    },
    harmonytestnet: {
      accounts: { mnemonic },
      chainId: 1666700000,
      url: urlOverride || "https://api.s0.b.hmny.io/",
    },
    heco: {
      accounts: { mnemonic },
      chainId: 128,
      url: urlOverride || "https://http-mainnet.hecochain.com",
    },

    avalanchefuji: {
      accounts: { mnemonic },
      chainId: 43113,
      url: urlOverride || "https://api.avax-test.network/ext/bc/C/rpc",
    },
    avalanche: {
      accounts: { mnemonic },
      chainId: 43114,
      url: urlOverride || "https://api.avax.network/ext/bc/C/rpc",
    },
    fantomtestnet: {
      accounts: { mnemonic },
      chainId: 4002,
      url: urlOverride || "https://rpc.testnet.fantom.network/",
    },
    fantom: {
      accounts: { mnemonic },
      chainId: 250,
      url: urlOverride || "https://rpcapi.fantom.network",
    },
    moonbasealpha: {
      accounts: { mnemonic },
      chainId: 1287,
      url: urlOverride || "https://rpc.testnet.moonbeam.network",
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 50,
          },
        },
      },
      {
        version: "0.6.5",
        settings: {
          optimizer: {
            enabled: true,
            runs: 50,
          }
        }
      },
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 50,
          },
        },
      },

    ],
  },
};
export default config;
