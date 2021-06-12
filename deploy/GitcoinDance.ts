module.exports = async ({
                            getNamedAccounts,
                            deployments,
                            getChainId,
                            getUnnamedAccounts,
                        }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const r_fake_dai = '0x2e055eee18284513b993db7568a592679ab13188';
    const round_blocktime = 25;
    const num_dancers = 16;
    const intermission_time = 50;

    let game;
    let dancer_base_contracts = [];

    const deploy_game = async function(){
        console.log(`Deploying game from ${deployer}`);

        game = await deploy("Game",{
            from: deployer,
            args:[num_dancers, round_blocktime, intermission_time, r_fake_dai]
        })

        const address = await game.address;
        console.log(`Deploying game to ${address}`);

        return game
    }

    await deploy_game();

};
