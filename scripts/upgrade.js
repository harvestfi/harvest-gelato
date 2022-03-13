const ResolverProxy = artifacts.require("ResolverProxy");

const upgrade = async () => {
    // Todo: set the resolver proxy address:
    const resolverProxyAddress = "0xe6840d91b7A7F2d9cc6731067cEBea19d39Eac46";

    const proxy = await ResolverProxy.at(resolverProxyAddress);
    await proxy.upgrade();

    console.log("resolver upgrade executed.");
}
  
upgrade()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });