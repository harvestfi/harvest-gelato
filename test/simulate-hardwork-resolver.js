const { impersonates } = require("./utils.js");
const DoHardWorkResolver = artifacts.require("DoHardWorkResolver");

const gelato = "0x7598e84B2E114AB62CAB288CE5f7d5f6bad35BbA";
const governance = "0xE2F7a4e37112153e467072327dc2FC7e124BcB8c";

const doHardWork = async () => {
    // Todo: set the resolver proxy address and vault to be hardWorked:
    const resolverProxyAddress = "0xe6840d91b7A7F2d9cc6731067cEBea19d39Eac46";
    const vault = "0xC2F50f1886D790e199Cd8a5c0AC360DF44636012";
    const calldata = ethers.utils.defaultAbiCoder.encode(['address'], [vault]);

    const accounts = await web3.eth.getAccounts();
    await web3.eth.sendTransaction({ from: accounts[9], to: gelato, value: 1e18});
    await web3.eth.sendTransaction({ from: accounts[9], to: governance, value: 1e18});
    await impersonates([gelato, governance]);

    const resolver = await DoHardWorkResolver.at(resolverProxyAddress);
    await resolver.setPokeMe(gelato, {from: governance});
    console.log("adjusted pokeMe to be ", gelato);

    console.log("executing doHardWork");
    const result = await resolver.doHardWork(calldata, {from: gelato});

    console.log(result);
}
  
doHardWork()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });