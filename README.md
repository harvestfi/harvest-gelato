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