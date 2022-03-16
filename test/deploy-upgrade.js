const ResolverProxy = artifacts.require("ResolverProxy");
const Storage = artifacts.require("Storage");
const DoHardWorkResolver = artifacts.require("DoHardWorkResolver");
const { time } = require("@openzeppelin/test-helpers");

const controllerAddress = "0xebaFc813f66c3142E7993a88EE3361a1f4BDaB16";
const priceFeedAddress = "0x327e23A4855b6F663a28c5161541d69Af8973302"; // price feed ETH -> MATIC (https://docs.chain.link/docs/matic-addresses/)
const wethProfitSharingToken = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
const profitSharingTarget = "0xf00dD244228F51547f0563e60bCa65a30FBF5f7f";
const pokeMeAddress = "0x527a819db1eb0e34426297b03bae11F2f8B3A19E"; // see https://docs.gelato.network/resources/contract-addresses#gelato-ops

describe("Harvest Gelato DoHardWorkResolver Deploy & Upgrade", () => {

    it("should deploy and execute upgrade", async () => {
        // deploy resolvers storage
        const storage = await Storage.new();
        console.log("storage deployed at", storage.address);

        // deploy resolver implementation
        const resolverImplementation = await DoHardWorkResolver.new(); 
        console.log("resolver deployed at", resolverImplementation.address);

        // deploy resolver proxy and link to implementation
        const resolverProxy = await ResolverProxy.new(resolverImplementation.address);
        console.log("resolverProxy deployed at", resolverProxy.address);

        // initialize resolver
        const DoHardWorkResolverEthers = await ethers.getContractFactory("DoHardWorkResolver");
        const resolver = await DoHardWorkResolverEthers.attach(resolverProxy.address);

        await resolver.initialize(
            storage.address, 
            controllerAddress,
            profitSharingTarget,
            wethProfitSharingToken,
            priceFeedAddress, 
            pokeMeAddress);

        console.log("resolver initialized.");

        const newResolverImplementation = await DoHardWorkResolver.new(); 
        console.log("new resolver deployed at", newResolverImplementation.address);

        await resolver.scheduleUpgrade(newResolverImplementation.address);

        // wait for implementation delay
        let advanceBlocks = 10000;
        let startingBlock = await time.latestBlock();
        await time.increase(15 * Math.round(advanceBlocks));
        let endBlock = startingBlock.addn(advanceBlocks);
        await time.advanceBlockTo(endBlock);

        await resolverProxy.upgrade();

        console.log("resolver upgrade executed.");
    })
})