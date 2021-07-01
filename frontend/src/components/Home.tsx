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
  const [gameData2, setGameData2] = useState<any>(null);
  const [gameData3, setGameData3] = useState<any>(dummyArray.slice(0, 5));
  const [gameData4, setGameData4] = useState<any>(dummyArray.slice(0, 3));
  const [gd2, setGd2] = useState<any>(dummyArray);
  const [gd3, setGd3] = useState<any>(dummyArray.slice(0, 5));
  const [gd4, setGd4] = useState<any>(dummyArray.slice(0, 3));

  const getRound = async (round: number) => {
    const res1 = await game.instance.gameByBracketByRound(1, 2, 0, 0);
    const res2 = await game.instance.gameByBracketByRound(1, 2, 0, 1);
    const res3 = await game.instance.gameByBracketByRound(1, 2, 1, 0);
    const res4 = await game.instance.gameByBracketByRound(1, 2, 1, 1);
    const res5 = await game.instance.gameByBracketByRound(1, 2, 2, 0);
    const res6 = await game.instance.gameByBracketByRound(1, 2, 2, 1);
    const res7 = await game.instance.gameByBracketByRound(1, 2, 3, 0);
    const res8 = await game.instance.gameByBracketByRound(1, 2, 3, 1);
    // const res3 = await game.instance.gameByBracketByRound(1, 2, 8, 3);
    // const res4 = await game.instance.gameByBracketByRound(1, 2, 8, 4);
    console.log(res1.toNumber(), 'res1');
    console.log(res2.toNumber(), 'res2');
    console.log(res3.toNumber(), 'res3');
    console.log(res4.toNumber(), 'res4');
    console.log(res5.toNumber(), 'res5');
    console.log(res6.toNumber(), 'res6');
    console.log(res7.toNumber(), 'res7');
    console.log(res8.toNumber(), 'res8');
    // console.log(res3, 'res3');
    // console.log(res4, 'res4');
    const resArray = [
      res1.toNumber(),
      res2.toNumber(),
      res3.toNumber(),
      res4.toNumber(),
      res5.toNumber(),
      res6.toNumber(),
      res7.toNumber(),
      res8.toNumber(),
    ];
    const result = [];

    for (let i = 0; i < gameArray.length; i++) {
      if (resArray.includes(i)) {
        result.push(gameArray[i]);
      }
    }
    switch (round + 1) {
      case 1:
        setGameData1(result);
        break;
      case 2:
        console.log(result, resArray, 'f');
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
    console.log(gameData2, 'home');

    const getGameData = async () => {
      const getGameDataFromArray = async () => gameArray;
      if (!gameData1) {
        const res = await getGameDataFromArray();
        setGameData1(res);
        // setGameData2(res.slice(0, 8));
        // setGameData3(res.slice(0, 4));
        // setGameData4(res.slice(0, 2));
      }
    };
    getGameData();
  }, [gameData1, gameData2]);
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
