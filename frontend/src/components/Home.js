import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core/';
import Bracket from './Bracket';
import LatestActivityCarousel from './LatestActivityCarousel';
import gameArray from '../fixtures/gameData';

export function Home(props) {
  const [gameData1, setGameData1] = useState(null);

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
      <Link to="/">
        <img
          className="marginTen"
          height="90px"
          width="145px"
          src="../assets/gitcoin/gitcoinBanner.svg"
          alt="gitcoinLogo"
        />
      </Link>
      {/*<Link to="/create">*/}
      {/*  <h1 className="link">CREATE NEW</h1>*/}
      {/*</Link>*/}
      {/*{!gameData1 && (*/}
      {/*  <div>*/}
      {/*    {' '}*/}
      {/*    <LinearProgress />*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{gameData1 && (*/}
      {/*  <span>*/}
      {/*    <div className="milkyBackground">*/}
      {/*      <h1 className="greenText paddingTwenty textAlign">*/}
      {/*        LATEST ACTIVITY*/}
      {/*      </h1>*/}
      {/*      <LatestActivityCarousel gameData={gameData1} />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <h1 className="paddingTwenty textAlign">CURRENT ROUND</h1>*/}
      {/*      <Bracket gameData1={gameData1} />*/}
      {/*    </div>*/}
      {/*  </span>*/}
      {/*)}*/}
    </div>
  );
}

export default Home;
