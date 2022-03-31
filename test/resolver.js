const assert = require('assert')
const { impersonates } = require("./utils.js");
const Storage = artifacts.require("Storage");
const DoHardWorkResolver = artifacts.require("DoHardWorkResolver");
const ResolverProxy = artifacts.require("ResolverProxy");
const IController = artifacts.require("IController");

// use block 24223199 as example for profitability
// use block 26280966 as example for idleFraction trigger
// use block 26282000 as example for no trigger tests

const profitableBlockNumber = 24223199;
const idleFractionTriggerBlockNumber = 26280966;
const noTriggerBlockNumber = 26282000;

const profitabilityVault = "0x13ef392208a9963527346A20873058E826d7f0B7";
const vaultAddress = "0x102Df50dB22407B64a8A6b11734c8743B6AeF953";

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("Harvest Gelato DoHardWorkResolver", () => {
    const governance = "0xf00dD244228F51547f0563e60bCa65a30FBF5f7f";
    const controllerAddress = "0xebaFc813f66c3142E7993a88EE3361a1f4BDaB16";
    const priceFeedAddress = "0x327e23A4855b6F663a28c5161541d69Af8973302";
    const wethProfitSharingToken = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
    const profitSharingTarget = "0xf00dD244228F51547f0563e60bCa65a30FBF5f7f";

    // for this test we use governance as pokeMeAddress. 
    // We don't have to test Gelato internals - we have to test our resolver.
    const pokeMeAddress = governance;

    let resolver;
    let resolverProxy;
    let resolverImplementation;

    // the test behaves differently depending on the initial block number.
    // it checks for correct should trigger or correct should not trigger depending on the initial block
    let initialBlockNumber;

    before(async () => {
        initialBlockNumber = await web3.eth.getBlockNumber();
        if(![profitableBlockNumber, noTriggerBlockNumber, idleFractionTriggerBlockNumber]
            .includes(initialBlockNumber)
        ){
            console.warn("\n\n -------- \nNon supported block number test case! Please check trigger yourself!\n-------\n\n");
        }
        
        accounts = await web3.eth.getAccounts();
        await web3.eth.sendTransaction({ from: accounts[9], to: governance, value: 1e18});

        await impersonates([governance]);

        await initializeResolver();

        // whitelist deployed resolver as hardWorker at controller
        const controller = await IController.at(controllerAddress);
        await controller.addHardWorker(resolver.address, {from: governance});
    });

    it("should trigger doHardWork correctly", async () => {
        const vault = initialBlockNumber === profitableBlockNumber
                        ? profitabilityVault : vaultAddress;

        console.log("Running test for vault", vault, "at block number", initialBlockNumber);

        // use ethers.js because of support for callStatic
        // simulate with 30 GWEI gas price
        const result = await resolver.connect(governance).callStatic.checker(
            vault, 
            {gasPrice: 30000000000}
        );

        console.log("\n\n----- Transaction result: -----\n", result);

        if (initialBlockNumber === profitableBlockNumber || initialBlockNumber === idleFractionTriggerBlockNumber){
            assert(result['canExec'] === true, "ERROR: Trigger not detected (when it should)!");
            console.log("\n\nSuccess: Trigger detected correctly!");
        } else if(initialBlockNumber === noTriggerBlockNumber) {
            assert(result['canExec'] === false, "ERROR: Non-Trigger not detected (when it should)!");
            console.log("\n\nSuccess: Non-Trigger detected correctly!");
        } else {
            console.warn("\n\n -------- \nNon supported block number test case! Please check profitability yourself!\n-------\n\n");
            assert(true === false, "Not supported test case");
        }
    });

    const initializeResolver = async () => {
        console.log("initializing resolver")
        // deploy resolvers storage
        const storage = await Storage.new({from: governance});

        // deploy resolver implementation
        resolverImplementation = await DoHardWorkResolver.new(); 

        // deploy resolver proxy and link to implementation
        resolverProxy = await ResolverProxy.new(resolverImplementation.address);

        const DoHardWorkResolverEthers = await ethers.getContractFactory("DoHardWorkResolver");
        resolver = await DoHardWorkResolverEthers.attach(resolverProxy.address);

        await resolver.connect(governance);

        // initialize resolver
        await resolver.initialize(
            storage.address, 
            controllerAddress,
            profitSharingTarget,
            wethProfitSharingToken,
            priceFeedAddress, 
            pokeMeAddress);
    }
});