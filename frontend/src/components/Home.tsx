/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// import { LinearProgress } from '@material-ui/core/';
import { Button } from 'antd';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';

import { toast } from 'react-toastify';
import Bracket from './bracket/Bracket';
import LatestActivityCarousel from './LatestActivityCarousel';
import { gameArray, dummyArray } from '../fixtures/nftData';
import { GameContext } from '../hardhat/SymfoniContext';

import gitcoinDance from '../assets/gitcoin/gitcoinDance.svg';
import nftDanceOff from '../assets/gitcoin/nftDanceOff.svg';
import iconWallet from '../assets/gitcoin/iconWallet.svg';

export function Home() {
  let provider;
  let web3Modal: Web3Modal;
  const game = useContext<any>(GameContext);

  const [gameData1, setGameData1] = useState<any>(null);
  const [walletSelected, setWalletSelected] = useState<any>(false);
  const [gameData2, setGameData2] = useState<any>(null);
  const [gameData3, setGameData3] = useState<any>(dummyArray.slice(0, 5));
  const [gameData4, setGameData4] = useState<any>(dummyArray.slice(0, 3));
  const [gd2, setGd2] = useState<any>(dummyArray);
  const [gd3, setGd3] = useState<any>(dummyArray.slice(0, 5));
  const [gd4, setGd4] = useState<any>(dummyArray.slice(0, 3));

  const getRound = async (round: number) => {
    if (!game.instance) {
      return;
    }

    const resArray = [];
    const result: any = [];
    let len = 16;
    switch (round) {
      case 1:
        len = 16;
        break;
      case 2:
        len = 8;
        break;
      case 3:
        len = 4;
        break;
      case 4:
        len = 2;
        break;
      default:
        break;
    }
    for (let i = 0; i < len; i++) {
      const res = await game.instance.gameByBracketByRound(
        1,
        round,
        Math.floor(i / 2),
        i % 2,
      );
      resArray.push(res.toNumber());
    }
    for (let i = 0; i < gameArray.length; i++) {
      if (resArray.includes(i)) {
        result.push(gameArray[i]);
      }
    }
    switch (round) {
      case 1:
        setGameData1(result);
        break;
      case 2:
        setGameData2(result);
        break;
      case 3:
        setGameData3(result);
        break;
      case 4:
        setGameData4(result);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const getCurrentRound = async () => {
      const currentRound = await game.instance?.g_current_round();
      if (currentRound) {
        return currentRound.toNumber();
      }
    };
    const getGameData = async () => {
      const getGameDataFromArray = async () => gameArray;
      if (!gameData1) {
        const res = await getGameDataFromArray();
        setGameData1(res);
      }
      const cr = await getCurrentRound();
      getRound(cr);
    };

    const selectWallet = async () => {
      if (!walletSelected) {
        const providerOptions = {
          walletconnect: {
            package: WalletConnectProvider, // required
            options: {
              infuraId: 'bea2648e203b482bbf33738642188ac4', // required
            },
          },
        };

        web3Modal = new Web3Modal({
          network: 'rinkeby', // optional
          // cacheProvider: true, // optional

          providerOptions, // required
        });
        web3Modal.clearCachedProvider();
        provider = await web3Modal.connect();
        // provider.on('chainChanged', (chainId: number) => {
        //   selectWallet();
        // });
        let cid;
        if (!window.ethereum) {
          setWalletSelected(false);
        } else {
          window.ethereum
            .request({ method: 'eth_chainId' })
            .then((chainId: any) => {
              cid = parseInt(chainId, 16);
              if (cid === 4) {
                console.log('chainid', cid);
                setWalletSelected(true);
              } else {
                alert('PLEASE SWITCH TO RINKEBY NETWORK AND RELOAD PAGE');
              }
            })
            .catch((error: any) => {
              console.error(
                `Error fetching chainId: ${error.code}: ${error.message}`,
              );
            });
        }
      }
    };
    if (!walletSelected) {
      selectWallet();
    }
    if (walletSelected) {
      getGameData();
    }
  }, [gameData1, gameData2, gameData3, gameData4, walletSelected]);
  return (
    <div>
      <Link style={{ margin: 'auto' }} to="/">
        <div style={{ display: 'flex' }}>
          <img
            style={{ margin: 'auto' }}
            src={gitcoinDance}
            alt="Gitcoin Dance Logo"
          />
        </div>
      </Link>
      <div className="navBar">
        <Link to="/about">
          <h4 style={{ display: 'inline' }} className="yellowText marginTen">
            ABOUT
          </h4>
        </Link>
        <Link to="/connect">
          <Button type="ghost" className="marginTen metaMaskButton">
            <img
              style={{ verticalAlign: 'baseline', margin: '0px 10px 0px 0px' }}
              src={iconWallet}
              alt="wallet"
            />
            <span className="metaMaskText">METAMASK</span>
          </Button>
        </Link>
      </div>
      <header className="bg-grid" style={{ height: '120px' }} />
      {!gameData1 && <div> {/* <LinearProgress /> */}</div>}
      {gameData1 && (
        <span>
          <LatestActivityCarousel gameData={gameData1} />
          <div style={{ margin: '20px' }}>
            <img src={nftDanceOff} alt="NFT Dance Off logo" />
            <hr style={{ width: '85%', float: 'right' }} />
          </div>
          <div>
            <Bracket
              gameData1={gameData1}
              gameData2={gameData2}
              gameData3={gameData3}
              gameData4={gameData4}
              gd2={gd2}
              gd3={gd3}
              gd4={gd4}
              getRound={getRound}
            />
          </div>
        </span>
      )}
    </div>
  );
}

export default Home;
