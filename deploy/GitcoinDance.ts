module.exports = async ({
                            getNamedAccounts,
                            deployments,
                            getChainId,
                            getUnnamedAccounts,
                        }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    console.log(`Deploying game from ${deployer}`);

    // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
    // let erc721mintable = await deploy("ERC721Mintable", {
    //     from: deployer,
    //     // gas: 4000000,
    //     args: [],
    // });
    // const rinkeby_dai_address = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa';
    //
    // let game = await deploy("Game",{
    //     from: deployer,
    //     args:[16, 20, rinkeby_dai_address]
    // })
    // console.log(game)
};
