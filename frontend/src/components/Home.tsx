import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core/';
import  {Button} from "antd"
 import Bracket from './Bracket';
import LatestActivityCarousel from './LatestActivityCarousel';
import {gameArray, dummyArray } from '../fixtures/gameData';

import gitcoinDance from "../assets/gitcoin/gitcoinDance.svg"
import nftDanceOff from "../assets/gitcoin/nftDanceOff.svg"
import iconWallet from "../assets/gitcoin/iconWallet.svg"

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
      <div style={{float: "right", margin: "-50px 0px"}}>
      <Link to="/about">
       <h4 style={{display: "inline"}} className="yellowText marginTen">ABOUT</h4>
      </Link>
      <Link to="/connect">
       <Button style={{padding: "5px", borderRadius: "4px"}} type="ghost" className="marginTen meta-mask-button">        
          <img style={{verticalAlign: "baseline", margin: "0px 10px 0px 0px"}} src={iconWallet} alt="wallet" />
          <span className="gradeText">METAMASK</span>
      </Button>
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
