const DoHardWorkResolver = artifacts.require("DoHardWorkResolver");

const initializeResolver = async () => {
    // deploy resolver implementation
    const resolverImplementation = await DoHardWorkResolver.new(); 
    console.log("resolver deployed at", resolverImplementation.address);

    console.log("resolver deployed. you should schedule an upgrade next.");
}
  
initializeResolver()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });