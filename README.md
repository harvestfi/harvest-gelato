# Hardhat Gelato Resolver

This repo contains the smart contract resolvers for Gelato (https://www.gelato.network/) which enables harvest to trigger `doHardWorks` through a decentralized network.

### Development

Create and setup `./dev-keys.json`:

```
{
  "alchemyKey": "<your key>"
}
```

### Permissions

- Harvest Controller has to whitelist the deployed Resolver as hardworker.
- The deployed resolver has to whitelist the PokeMe.sol (https://docs.gelato.network/guides/what-tasks-can-be-automated).


### Tests

- use block 23880727 as example for non-profitability
- use block 24223199 as example for profitability

```
npx hardhat test test/resolver.js
```

### Deployment

To deploy the resolver to mainnet, extend your ./dev-keys.json with the private key you want to deploy from and the polygonScan
or etherScan etc. api key to verify the contract code after deployment:

```
{
  "alchemyKey": "<your key>",
  "privateKey": "<your key>",
  "polygonscanApiKey": "<your key>",
}
```

You can then run

```
npx hardhat run scripts/deploy.js --network polygon_mainnet
```

which will print the deployed contract addresses.

To verify the contract code on the block explorers, run
```
npx hardhat verify <contract_address> --network polygon_mainnet
```

Note that to verify the resolver proxy you'll have to pass in the constructor arguments: 
```
npx hardhat verify <resolver_proxy_contract_address> --network polygon_mainnet "<resolver_implementation_contract_address>"
```

##### Upgrade
There is also a script to deploy the resolver only for an upgrade - see ./scripts/deploy-resolver-only.js and to schedule the upgrade, see ./scripts/schedule-upgrade.js.