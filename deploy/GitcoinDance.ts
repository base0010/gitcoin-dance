module.exports = async ({
                            getNamedAccounts,
                            deployments,
                            getChainId,
                            getUnnamedAccounts,
                        }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
    let erc721mintable = await deploy("ERC721Mintable", {
        from: deployer,
        // gas: 4000000,
        args: [],
    });
    const predicate_address = "0x1470E07a6dD1D11eAE439Acaa6971C941C9EF48f"
    const matic_root = await deploy("Root", {from:deployer, args:[predicate_address], } )
};
