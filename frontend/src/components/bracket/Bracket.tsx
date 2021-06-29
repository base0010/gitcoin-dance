/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useContext } from 'react';
import * as ethers from 'ethers';
import * as zksync from 'zksync';
import { toast } from 'react-toastify';
import { GameContext } from '../../hardhat/SymfoniContext';
import { nfts, ActiveNFT } from '../../assets/index';
import gitcoinLogo from '../../assets/gitcoin/gitcoinIcon.png';
import DanceOffModal from '../danceOffModal/DanceOffModal';
import InactiveRound from './InactiveRound';
import ActiveRound from './ActiveRound';
import {
  getVotes,
  getNftZkAccountState,
  getZkVotes,
} from '../../logic/hardhat';
import PreviousRound from './PreviousRound';

export function Bracket(props: any) {
  const game = useContext(GameContext);
  const [gettingBalances, setGettingBalances] = useState(false);
  const [zkProvider, setZkProvider] = useState<any>(undefined);
  const [zkWallet, setZkWallet] = useState<any>(undefined);
  const [zkDonation, setZkDonation] = useState<string>('50');
  const { gameData1, gd2, gd3, gd4 } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [gameLoaded, setGameLoaded] = useState(false);

  const [nftVotes, setnftVotes] = useState<string[]>([]);
  const [zkDeps, setzkDeps] = useState<any[]>([]);
  const [apiCall, setApiCall] = useState(false);
  const [voting, setVoting] = useState<null | number>(null);
  const [activeNft, setActiveNft] = useState<null | ActiveNFT[]>(null);
  const [round, setRound] = useState(1);

  const getNftZkBalances = async function (numDancers: number = 16) {
    const voteArrary = [];
    const zkDepArray = [];
    setGettingBalances(true);
    console.log('starting');
    for (let i = 0; i <= numDancers; i++) {
      const votes = await getVotes(i, game, ethers);
      voteArrary.push(votes);
      const zkAccountInfo = await getNftZkAccountState(i, game, zksync);

      zkDepArray.push(zkAccountInfo);
    }
    console.log('finished');

    setGettingBalances(false);
    setnftVotes(voteArrary);
    setzkDeps(zkDepArray);

    console.log('VOTES ARRY', voteArrary);
    console.log('DEPS ARRY', zkDeps);
  };

  const setupZkProvider = async () => {
    const zkprovider = await zksync.getDefaultProvider('rinkeby');
    setZkProvider(zkprovider);
  };

  useEffect(() => {
    const initContract = async () => {
      if (!game.instance) return;
      console.log('Game is deployed at ', game.instance.address);
      if (game.instance.address) {
        setGameLoaded(true);
      }
    };

    if (!gameLoaded) {
      initContract();
    }
    setupZkProvider();
    if (!gettingBalances) {
      getNftZkBalances();
    }
  }, [game, getNftZkBalances, nftVotes]);

  const setupZkSigner = async () => {
    const provider = new ethers.providers.Web3Provider(
      window.web3.currentProvider,
    );
    const signer = provider.getSigner();
    const zkWallet = await zksync.Wallet.fromEthSigner(signer, zkProvider);
    setZkWallet(zkWallet);
  };

  const voteForNft = async (nft: ActiveNFT, zkDaiAmount: string) => {
    setApiCall(true);
    let nftAddress;
    // @ts-ignore
    if (nft.nftId) {
      nftAddress = await game.instance?.donationAddressByNftId(nft.nftId - 1);
      console.log(nftAddress);
    } else {
      toast('NO NFT ID!');
    }
    // todo: make this a dynamic dep amount
    const amount = zksync.utils.closestPackableTransactionAmount(
      ethers.utils.parseEther(zkDonation.toString()),
    );
    const provider = new ethers.providers.Web3Provider(
      window.web3.currentProvider,
    );
    const signer = provider.getSigner();
    const zWallet = await zksync.Wallet.fromEthSigner(signer, zkProvider);
    const transfer = await zWallet.syncTransfer({
      to: nftAddress || '',
      token: 'DAI',
      amount,
    });
    const transferRecepit = await transfer.awaitReceipt();
    console.log(
      `transferred on ${zkDonation} DAI on  zksync to ${nftAddress} ${JSON.stringify(
        transfer.txHash,
      )}`,
    );
    if (transferRecepit.success) {
      toast(
        <div className="purpTeal">
          transferred on {zkDonation} DAI on l2 to {nftAddress}{' '}
          {transfer.txHash}
        </div>,
        {
          className: 'purpTeal yellowText',
          bodyClassName: 'purpTeal yellowText',
          progressClassName: 'fancy-progress-bar',
        },
      );
    }
    setTimeout(() => {
      setApiCall(false);
      setModalOpen(false);
      setVoting(null);
      toast(
        <span className="purpTeal">
          <img
            style={{ margin: '5px', display: 'inline' }}
            height="20px"
            width="20px"
            src={gitcoinLogo}
            alt="gitcoin Logo"
          />
          <span>
            You have succesfully voted for <b>{nft.name}</b>!! 🎉
          </span>
        </span>,
        {
          className: 'purpTeal yellowText',
          bodyClassName: 'purpTeal yellowText',
          progressClassName: 'fancy-progress-bar',
        },
      );
    }, 50);
  };

  const openModal = (...nftArray: any[]) => {
    const active1 = nfts.find((n) => n.id === nftArray[0].gifId);
    const active2 = nfts.find((n) => n.id === nftArray[1].gifId);
    if (active1 && active2) {
      active1.name = nftArray[0].name;
      active2.name = nftArray[1].name;
      active1.nftId = nftArray[0].nftId;
      active2.nftId = nftArray[1].nftId;
      setModalOpen(true);
      setActiveNft([active1, active2]);
    } else {
      toast('Something went wrong');
    }
  };

  const newRound = () => {
    setRound(round + 1);
  };

  return (
    <div>
      {activeNft && (
        <DanceOffModal
          modalOpen={modalOpen}
          setActiveNft={setActiveNft}
          setModalOpen={setModalOpen}
          apiCall={apiCall}
          activeNft={activeNft}
          voting={voting}
          setVoting={setVoting}
          setZkDonation={setZkDonation}
          voteForNft={voteForNft}
          zkDonation={zkDonation}
        />
      )}
      {gameData1 && (
        <main id="tournament">
          <ul className="round round-1">
            {round === 1 && (
              <ActiveRound
                gameData={gameData1}
                header="FIRST"
                nfts={nfts}
                openModal={openModal}
                nftVotes={nftVotes}
                getZkVotes={getZkVotes}
                zkDeps={zkDeps}
                ethers={ethers}
                newRound={() => newRound()}
              />
            )}
            {round > 1 && (
              <PreviousRound
                gameData={gameData1}
                header="FIRST"
                nfts={nfts}
                openModal={openModal}
                nftVotes={nftVotes}
                getZkVotes={getZkVotes}
                zkDeps={zkDeps}
                ethers={ethers}
                // newRound={() => newRound()}
              />
            )}
          </ul>
          <ul className="round round-2">
            {round < 2 && (
              <InactiveRound key="gd2" gameData={gd2} header="SECOND" />
            )}
            {round === 2 && (
              <ActiveRound
                gameData={gd2}
                header="SECOND"
                nfts={nfts}
                openModal={openModal}
                nftVotes={nftVotes}
                getZkVotes={getZkVotes}
                zkDeps={zkDeps}
                ethers={ethers}
                newRound={() => newRound()}
              />
            )}
            {round > 2 && (
              <PreviousRound
                gameData={gd2}
                header="SECOND"
                nfts={nfts}
                openModal={openModal}
                nftVotes={nftVotes}
                getZkVotes={getZkVotes}
                zkDeps={zkDeps}
                ethers={ethers}
                // newRound={() => newRound()}
              />
            )}
          </ul>
          <ul className="round round-3">
            {round < 3 && (
              <InactiveRound key="gd3" gameData={gd3} header="SEMIS" />
            )}
            {round === 3 && (
              <ActiveRound
                gameData={gd3}
                header="SEMIS"
                nfts={nfts}
                openModal={openModal}
                nftVotes={nftVotes}
                getZkVotes={getZkVotes}
                zkDeps={zkDeps}
                ethers={ethers}
                newRound={() => newRound()}
              />
            )}
            {round > 3 && (
              <PreviousRound
                gameData={gd3}
                header="SEMIS"
                nfts={nfts}
                openModal={openModal}
                nftVotes={nftVotes}
                getZkVotes={getZkVotes}
                zkDeps={zkDeps}
                ethers={ethers}
                // newRound={() => newRound()}
              />
            )}
          </ul>
          <ul className="round round-4">
            {round < 4 && (
              <InactiveRound key="gd4" gameData={gd4} header="FINALS" />
            )}
            {round === 4 && (
              <ActiveRound
                gameData={gd4}
                header="FINALS"
                nfts={nfts}
                openModal={openModal}
                nftVotes={nftVotes}
                getZkVotes={getZkVotes}
                zkDeps={zkDeps}
                ethers={ethers}
                newRound={() => newRound()}
              />
            )}
            {round > 4 && (
              <PreviousRound
                gameData={gd4}
                header="FINALS"
                nfts={nfts}
                openModal={openModal}
                nftVotes={nftVotes}
                getZkVotes={getZkVotes}
                zkDeps={zkDeps}
                ethers={ethers}
                // newRound={() => newRound()}
              />
            )}
          </ul>
        </main>
      )}
    </div>
  );
}

export default Bracket;
