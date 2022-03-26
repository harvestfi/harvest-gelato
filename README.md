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

doHardWork Trigger tests:
- use block 23880727 as example for non-profitability
- use block 24223199 as example for profitability
- use block 26280966 as example for idleFraction trigger
- use block 26282000 as example for non-idleFraction

```
npx hardhat test test/resolver.js
```

Deploy & Upgrade test:
```
npx hardhat test test/deploy-upgrade.js
```

### Simulations

You can simulate the checker and hardWork results locally. 

Checker: Adjust the values in `./test/simulate-checker.js` and run it with:

```
npx hardhat run test/simulate-checker.js
```

doHardWork from resolver only: Adjust the values in `./test/simulate-hardwork-resolver.js` and run it with:

```
npx hardhat run test/simulate-hardwork-resolver.js
```

Gelato hardwork simulation does not work for some reason, needs to be fixed:
> VM Exception while processing transaction: reverted with reason string 'Address: call to non-contract'

doHardWork triggered from gelato Ops: Adjust the values in `./test/simulate-hardwork-gelato.js` and run it with:

```
npx hardhat run test/simulate-hardwork-gelato.js
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