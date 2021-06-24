const getVotes = async (nftId: number, game: any, ethers: any) => {
  const totalVotes = await game.instance?.votesPerNftId(nftId);
  const formatedVotes = ethers.utils.formatEther(totalVotes?.toString() || '0');
  //   console.log(`TOTAL VOTES:${formatedVotes}`);
  return formatedVotes.toString().slice(0, -2) || '0';
};

const getNftZkAccountState = async (nftId: number, game: any, zksync: any) => {
  const nftAddress = await game.instance?.donationAddressByNftId(nftId);
  const zkprovider = await zksync.getDefaultProvider('rinkeby');

  const state = await zkprovider.getState(nftAddress || '');
  return state;
};

const getZkVotes = (nftId: number, zkDeps: any, ethers: any) => {
  if (zkDeps[nftId - 1]?.committed !== undefined) {
    const dep = zkDeps[nftId - 1].committed?.balances.DAI || '0';
    // @ts-ignore
    const depbn = ethers.BigNumber.from(dep);
    const str = ethers.utils.formatEther(depbn).toString();
    return str.substring(0, str.length - 2);
  }
};

export { getVotes, getNftZkAccountState, getZkVotes };
