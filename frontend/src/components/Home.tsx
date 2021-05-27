import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core/';
import Bracket from './Bracket';
import LatestActivityCarousel from './LatestActivityCarousel';
import gameArray from '../fixtures/gameData';


import gitcoinBanner from "../assets/gitcoin/gitcoinBanner.svg"
export function Home(props : any) {
  const [gameData1, setGameData1] = useState<any>(null);

  useEffect(  () => {
    const getGameData = async() =>{
        const getGameDataFromArray = async() => gameArray;
        if(!gameData1){
            const res = await getGameDataFromArray();
            setGameData1(res);
        };
    }
    getGameData();
  }, []);
  return (
    <div>
      
      {/* <Link to="/">
        <img
          className="marginTen"
          height="90px"
          width="145px"
          // src={gitcoinBanner}
          alt="gitcoinLogo"
        />
      </Link>
      <Link to="/create">
       <h1 className="link">CREATE NEW</h1>
      </Link> */}
      {!gameData1 && (
        <div>
         {' '}
         <LinearProgress />
      </div>
     )}
      {gameData1 && 
      <span>
       <div className="purp-teal">
          <h1 className="yellowText paddingTwenty">
           LATEST VOTES
       </h1>
          <LatestActivityCarousel gameData={gameData1} />
        </div>
        <hr></hr>
        <div>
          <h1 className="paddingTwenty textAlign yellowText">CURRENT ROUND</h1>
          <Bracket gameData1={gameData1} />
       </div>
      </span>
      }
    </div>
  );
}

export default Home;
