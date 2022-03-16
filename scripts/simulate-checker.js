const checker = async () => {
    // Todo: set the resolver proxy address and vault to be checked:
    const resolverProxyAddress = "0xe6840d91b7A7F2d9cc6731067cEBea19d39Eac46";
    const vault = "0xC2F50f1886D790e199Cd8a5c0AC360DF44636012";

    // use ethers.js for callStatic
    const DoHardWorkResolverEthers = await ethers.getContractFactory("DoHardWorkResolver");
    const resolver = await DoHardWorkResolverEthers.attach(resolverProxyAddress);

    const result = await resolver.callStatic.checker(vault);

    console.log(result);
}
  
checker()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });