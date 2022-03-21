const scheduleUpgrade = async () => {
    // Todo: set the two values:
    const newResolverAddress = "0x393D754f571121E0e0F5B156AAC7D4ffB347EEA2";
    const resolverProxyAddress = "0xe6840d91b7A7F2d9cc6731067cEBea19d39Eac46";

    // initialize resolver
    const DoHardWorkResolverEthers = await ethers.getContractFactory("DoHardWorkResolver");
    const resolver = await DoHardWorkResolverEthers.attach(resolverProxyAddress);

    await resolver.scheduleUpgrade(newResolverAddress);

    console.log("resolver upgrade scheduled.");
}
  
scheduleUpgrade()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });