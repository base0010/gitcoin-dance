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
import gitcoinLogo from '../../assets/gitcoin/gitcoin-logo-illustrated-icon.png';
import DanceOffModal from '../danceOffModal/DanceOffModal';
import InactiveRound from './InactiveRound';
import ActiveRound from './ActiveRound';
import {
  getVotes,
  getNftZkAccountState,
  getZkVotes,
} from '../../logic/hardhat';

export function Bracket(props: any) {
  const game = useContext(GameContext);
  const [zkProvider, setZkProvider] = useState<any>(undefined);
  const [zkWallet, setZkWallet] = useState<any>(undefined);
  const [zkDonation, setZkDonation] = useState<string>('50');
  const { gameData1, gd2, gd3, gd4 } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [nftVotes, setnftVotes] = useState<string[]>([]);
  const [zkDeps, setzkDeps] = useState<any[]>([]);
  const [apiCall, setApiCall] = useState(false);
  const [voting, setVoting] = useState<null | number>(null);
  const [activeNft, setActiveNft] = useState<null | ActiveNFT[]>(null);

  const getNftZkBalances = async function (numDancers: number = 16) {
    const voteArrary = [];
    const zkDepArray = [];
    for (let i = 0; i <= numDancers; i++) {
      const votes = await getVotes(i, game, ethers);
      voteArrary.push(votes);
      const zkAccountInfo = await getNftZkAccountState(i, game, zksync);
      zkDepArray.push(zkAccountInfo);
    }
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
    };
    initContract();
    setupZkProvider();
    getNftZkBalances();
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
    console.log(nftArray, 'bftA?');
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
            <ActiveRound
              gameData={gameData1}
              header="FIRST"
              nfts={nfts}
              openModal={openModal}
              nftVotes={nftVotes}
              getZkVotes={getZkVotes}
              zkDeps={zkDeps}
              ethers={ethers}
            />
          </ul>
          <ul className="round round-2">
            <InactiveRound gameData={gd2} header="SECOND" />
          </ul>
          <ul className="round round-3">
            <InactiveRound gameData={gd3} header="SEMIS" />
          </ul>
          <ul className="round round-4">
            <InactiveRound gameData={gd4} header="FINALS" />
          </ul>
        </main>
      )}
    </div>
  );
}

export default Bracket;
