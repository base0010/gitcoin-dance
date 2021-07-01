/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// import { LinearProgress } from '@material-ui/core/';
import { Button } from 'antd';
import Bracket from './bracket/Bracket';
import LatestActivityCarousel from './LatestActivityCarousel';
import { gameArray, dummyArray } from '../fixtures/gameData';
import { GameContext } from '../hardhat/SymfoniContext';

import gitcoinDance from '../assets/gitcoin/gitcoinDance.svg';
import nftDanceOff from '../assets/gitcoin/nftDanceOff.svg';
import iconWallet from '../assets/gitcoin/iconWallet.svg';

const BigNumber = require('bignumber.js');

export function Home() {
  const game = useContext<any>(GameContext);

  const [gameData1, setGameData1] = useState<any>(null);
  const [gameData2, setGameData2] = useState<any>(dummyArray);
  const [gameData3, setGameData3] = useState<any>(dummyArray.slice(0, 5));
  const [gameData4, setGameData4] = useState<any>(dummyArray.slice(0, 3));

  const getRound = async () => {
    const res1 = await game.instance.gameByBracketByRound(1, 1, 2, 0);
    const res2 = await game.instance.gameByBracketByRound(1, 1, 2, 1);
    // const res3 = await game.instance.gameByBracketByRound(1, 2, 8, 3);
    // const res4 = await game.instance.gameByBracketByRound(1, 2, 8, 4);
    console.log(res1, 'res1');
    console.log(res2, 'res2');
    // console.log(res3, 'res3');
    // console.log(res4, 'res4');
    return [res1, res2];
  };

  useEffect(() => {
    console.log(game, 'changes?');
    const getGameData = async () => {
      const getGameDataFromArray = async () => gameArray;
      if (!gameData1) {
        const res = await getGameDataFromArray();
        setGameData1(res);
        setGameData2(res.slice(0, 8));
        setGameData3(res.slice(0, 4));
        setGameData4(res.slice(0, 2));
      }
    };
    getGameData();
  }, [gameData1]);
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
              gd2={gameData2}
              gd3={gameData3}
              gd4={gameData4}
              getRound={getRound}
            />
          </div>
        </span>
      )}
    </div>
  );
}

export default Home;
