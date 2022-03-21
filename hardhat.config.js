require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-web3');
require("@nomiclabs/hardhat-truffle5");
require('@nomiclabs/hardhat-etherscan');

const secret = require('./dev-keys.json');

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 137,
      forking: {
        url: `https://polygon-mainnet.g.alchemy.com/v2/${secret.alchemyKey}`,
        // use blocknumber 26154468 for simulations etc.
        // use specific block numbers for resolver.js test
        blockNumber: 26154468
      },
      // gasPrice: 30000000000
    },
    polygon_mainnet: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${secret.alchemyKey}`,
      chainId: 137,
      accounts: [`${secret.privateKey}`]
    },
  },
  etherscan: {
    apiKey: secret.polygonscanApiKey,
  },
  solidity: {
    compilers: [
      {
        version: '0.8.11',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  mocha: {
    timeout: 2000000,
  },
}
