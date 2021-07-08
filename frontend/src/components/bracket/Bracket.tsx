/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useContext } from 'react';
import * as ethers from 'ethers';
import * as zksync from 'zksync';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
import { LinearProgress } from '@material-ui/core';
import { GameContext } from '../../hardhat/SymfoniContext';
import { nfts, ActiveNFT } from '../../assets/index';
import gitcoinLogo from '../../assets/gitcoin/gitcoinIcon.png';
import DanceOffModal from '../danceOffModal/DanceOffModal';
import InactiveRound from './InactiveRound';
import ActiveRound from './ActiveRound';
// import { LinearProgress } from '@material-ui/core/';

import {
  getVotes,
  getNftZkAccountState,
  getZkVotes,
} from '../../logic/hardhat';
import PreviousRound from './PreviousRound';
import IntermissionModal from './IntermissionModal';

export function Bracket(props: any) {
  const game = useContext(GameContext);
  const [gettingBalances, setGettingBalances] = useState(false);
  const [winner, setWinner] = useState<any>(null);
  const [currentGameData, setCurrentGameData] = useState<any>(null);
  const [zkProvider, setZkProvider] = useState<any>(undefined);
  const [zkWallet, setZkWallet] = useState<any>(undefined);
  const [intermission, setIntermission] = useState<any>(false);
  const [zkDonation, setZkDonation] = useState<string>('50');
  const { gameData1, gameData2, gameData3, gameData4, gd2, gd3, gd4 } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [gameLoaded, setGameLoaded] = useState(false);

  const [nftVotes, setnftVotes] = useState<string[]>([]);
  const [zkDeps, setzkDeps] = useState<any[]>([]);
  const [apiCall, setApiCall] = useState(false);
  const [voting, setVoting] = useState<null | number>(null);
  const [activeNft, setActiveNft] = useState<null | ActiveNFT[]>(null);
  const [round, setRound] = useState<any>(null);

  const newRound = async () => {
    if (round < 5) {
      setIntermission(true);
      await props.getRound(round);
      setIntermission(false);
    }
  };

  const getNftZkBalances = async function (numDancers: number = 16) {
    const voteArrary = [];
    const zkDepArray = [];
    setGettingBalances(true);
    for (let i = 0; i <= numDancers; i++) {
      const votes = await getVotes(i, game, ethers);
      voteArrary.push(votes);
      const zkAccountInfo = await getNftZkAccountState(i, game, zksync);
      zkDepArray.push(zkAccountInfo);
    }
    setGettingBalances(false);
    setnftVotes(voteArrary);
    setzkDeps(zkDepArray);
    const currentRound = await game.instance?.g_current_round();
    if (round && currentRound?.toNumber() !== round) {
      setRound(currentRound?.toNumber());
      await newRound();
    }
  };

  const setupZkProvider = async () => {
    const zkprovider = await zksync.getDefaultProvider('rinkeby');
    setZkProvider(zkprovider);
  };

  useEffect(() => {
    const getCurrentRound = async () => {
      const currentRound = await game.instance?.g_current_round();
      setRound(currentRound?.toNumber());
    };
    if (!round) {
      getCurrentRound();
    }
    if (round && !currentGameData) {
      switch (round) {
        case 1:
          setCurrentGameData(gameData1);
          break;
        case 2:
          setCurrentGameData(gameData2);
          break;
        case 3:
          setCurrentGameData(gameData3);
          break;
        case 4:
          setCurrentGameData(gameData4);
          break;
        default:
          setCurrentGameData(gameData1);
          break;
      }
    }
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
  }, [
    game,
    getNftZkBalances,
    nftVotes,
    modalOpen,
    activeNft,
    gameData2,
    zkDeps,
    round,
  ]);

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
          autoClose: 10000,
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
          autoClose: 10000,
        },
      );
    }, 50);
  };

  const openModal = (currentRound: boolean, ...nftArray: any[]) => {
    if (!currentRound) {
      for (let i = 0; i < nftArray.length; i++) {
        if (currentGameData.includes(nftArray[i])) {
          setWinner(i);
        }
      }
    }
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

  return (
    <div>
      {intermission && (
        <IntermissionModal intermission={intermission} round={round} />
      )}
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
          winner={winner}
          setWinner={setWinner}
        />
      )}
      {zkDeps.length < 1 && (
        <div
          style={{
            margin: '40px',
            height: '1000px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <LinearProgress />
          <span className="yellowText textAlign">LOADING</span>
        </div>
      )}
      {gameData1 && zkDeps.length > 0 && (
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
            {(round < 2 || intermission) && (
              <InactiveRound key="gd2" gameData={gd2} header="SECOND" />
            )}
            {!intermission && round === 2 && gameData2 && (
              <ActiveRound
                gameData={gameData2}
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
                gameData={gameData2}
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
            {(round < 3 || intermission) && (
              <InactiveRound key="gd3" gameData={gd3} header="SEMIS" />
            )}
            {!intermission && round === 3 && gameData3 && (
              <ActiveRound
                gameData={gameData3}
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
                gameData={gameData3}
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
            {(round || intermission) < 4 && (
              <InactiveRound key="gd4" gameData={gd4} header="FINALS" />
            )}
            {!intermission && round === 4 && gameData4 && (
              <ActiveRound
                gameData={gameData4}
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
                gameData={gameData4}
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
