import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core/';
import Bracket from './Bracket';
import LatestActivityCarousel from './LatestActivityCarousel';
import {gameArray, dummyArray } from '../fixtures/gameData';

import gitcoinDance from "../assets/gitcoin/gitcoinDance.svg"
import nftDanceOff from "../assets/gitcoin/nftDanceOff.svg"

export function Home(props : any) {
  const [gameData1, setGameData1] = useState<any>(null);
  const [gameData2, setGameData2] = useState<any>(dummyArray);
  const [gameData3, setGameData3] = useState<any>(dummyArray.slice(0,5));
  const [gameData4, setGameData4] = useState<any>(dummyArray.slice(0,3));

  useEffect(  () => {
    const getGameData = async() =>{
        const getGameDataFromArray = async() => gameArray;
        if(!gameData1){
            const res = await getGameDataFromArray();
            setGameData1(res);
        };
    }
    getGameData();
  }, [gameData1]);
  return (
    <div>
      <div style={{display: "flex"}}>
      <img style={{margin: "auto"}} src={gitcoinDance} alt="Gitcoin Dance Logo" />
      </div>
      <div style={{display: "flex", justifyContent: "flex-end"}}>
      <Link to="/about">
       <h1 style={{display: "inline"}} className="yellowText marginTen">ABOUT</h1>
      </Link>

      <Link to="/connect">
       <h1 style={{display: "inline"}} className="yellowText marginTen">CONNECT WALLET</h1>

      </Link>
      </div>
      <header className="bg-grid" style={{height: "120px"}}>
      </header>
      {!gameData1 && (
        <div>
         {' '}
         <LinearProgress />
      </div>
     )}
      {gameData1 && 
      <span>
          <h1 className="yellowText marginTen">
           RECENT VOTES
          </h1>
          <LatestActivityCarousel gameData={gameData1} />
          <div style={{margin: "20px"}}>
            <img src={nftDanceOff} alt="NFT Dance Off logo" />
            <hr style={{width: "85%", float: "right"}}></hr>
          </div>
        <div>
          <Bracket gameData1={gameData1}  gd2={gameData2} gd3={gameData3} gd4={gameData4} />
       </div>
      </span>
      }
    </div>
  );
}

export default Home;
