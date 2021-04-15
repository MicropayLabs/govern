import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, './.env') })

import { HardhatUserConfig } from 'hardhat/types'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import 'hardhat-deploy'
import 'hardhat-typechain'

const config: HardhatUserConfig = {
  solidity: {
    version: '0.6.8',
    settings: {
      optimizer: {
        enabled: true,
        runs: 20000, // TODO: target average DAO use
      },
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  paths: {
    tests: './tests/hardhat',
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1fffffffffffff,
      // tests that deploy new tokens with proxies set to false, require more than 8,000,000 GAS.
      // Without setting this,tests do fail due to out of gas error
      gas: 10000000,
      forking: {
        url: 'https://rinkeby.infura.io/v3/b76cba91dc954ceebff27244923224b1',
      },
    },
    rinkeby: {
      url:
        'https://eth-rinkeby.alchemyapi.io/v2/Zs10tQqfrIf1s-np9tQB0RV6BijG0zIe',
      accounts: {
        mnemonic: process.env.ETH_KEY!,
      },
    },
  },
  mocha: {
    timeout: 2000000,
  },
}

export default config
