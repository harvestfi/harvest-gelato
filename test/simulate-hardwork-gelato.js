const { impersonates } = require("./utils.js");
const IGelatoOps = artifacts.require("IGelatoOps");

const gelato = "0x7598e84B2E114AB62CAB288CE5f7d5f6bad35BbA";
const gelatoOpsAddress = "0x527a819db1eb0e34426297b03bae11F2f8B3A19E";

const doHardWork = async () => {
    const resolverProxyAddress = "0xe6840d91b7A7F2d9cc6731067cEBea19d39Eac46";

    const accounts = await web3.eth.getAccounts();
    await web3.eth.sendTransaction({ from: accounts[9], to: gelato, value: 1e18});
    await impersonates([gelato]);

    const gelatoOps = await IGelatoOps.at(gelatoOpsAddress);

    // can be obtained by running simulate-checker.js -> output data "execData"
    const execData = "0x0af210a1000000000000000000000000c2f50f1886d790e199cd8a5c0ac360df44636012";

    console.log("executing doHardWork");
    const result = await gelatoOps.exec(
        0, // txFee
        "0x0000000000000000000000000000000000000000", // feeToken
        "0xE2F7a4e37112153e467072327dc2FC7e124BcB8c", // _taskCreator
        true, // _useTaskTreasuryFunds
        true, // _revertOnFailure
        "0x6f075dfc193f921ccd7ed4919493e0dc3b0aa19acb834f232ea87fa5832ad3e6", // resolverHash
        resolverProxyAddress, // _execAddress
        execData // execdata
        , {from: gelato});

    console.log(result);
}
  
doHardWork()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });