/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { LinearProgress } from '@material-ui/core/';
import { Button, Row, Col } from 'antd';
import Bracket from './bracket/Bracket';
import LatestActivityCarousel from './LatestActivityCarousel';
import { gameArray, dummyArray } from '../fixtures/gameData';

import gitcoinDance from '../assets/gitcoin/gitcoinDance.svg';
import headerAbout from '../assets/gitcoin/headerAbout.svg';
import headerFAQs from '../assets/gitcoin/headerFAQs.svg';

import iconWallet from '../assets/gitcoin/iconWallet.svg';

export function About() {
  const [gameData1, setGameData1] = useState<any>(null);
  const [gameData2, setGameData2] = useState<any>(dummyArray);
  const [gameData3, setGameData3] = useState<any>(dummyArray.slice(0, 5));
  const [gameData4, setGameData4] = useState<any>(dummyArray.slice(0, 3));

  useEffect(() => {
    const getGameData = async () => {
      const getGameDataFromArray = async () => gameArray;
      if (!gameData1) {
        const res = await getGameDataFromArray();
        setGameData1(res);
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
      <img src={headerAbout} alt="header about" />
      <div
        className="paddingForty purpTeal marginTen"
        style={{ minHeight: '414px' }}
      >
        <video />
      </div>
      <div className="marginTen">
        <div>
          <img src={headerFAQs} alt="FAQ" />
          <hr style={{ width: '85%', float: 'right' }} />
          <Row gutter={8}>
            <Col span={12}>
              <h3>ABOUT GITCOIN DANCE</h3>
              <span className="faqText marginTen">
                <p>
                  Gitcoin Dance is a bracket-style elimination danceoff where
                  <i>dancers</i> are NFTs of community members dancing (or{' '}
                  <i>doing a thing</i>). Winners are determined by the GTC
                  community at large{' '}
                  <i>putting their money where their mouth is</i> and donating
                  zkDAI to their favorite dancer(s) in a bracket round. All
                  donations throughout the entirety of the game will go into the
                  GTC funding pool.
                </p>{' '}
                <p>
                  TL;DR Fund GTC and opensource software by participating in a
                  cool competitive NFT-based game that runs on L2
                </p>
              </span>
            </Col>
            <Col span={12}>
              <span className="faqText marginTen">
                <p>
                  You can try it out by visiting the website with your Metamask
                  wallet connected to Rinkeby. You need RDAI / zkRDAI. more info
                  incoming. Rules are Simple: Users vote for their favorite NFT
                  dancer within a bracket matchup instantly with ZkDAI on L2.
                  1zkDAI donation = 1 vote for the dancer you choose within a
                  bracket/round At the end of the round dancers inside a bracket
                  with the least zkDAI are eliminated, the dancer with the most
                  donations advances until all dancers are eliminated and one
                  NFT is crowned open source dance king/queen.
                </p>
              </span>
            </Col>
          </Row>
        </div>
        <hr />
        <h2 className="yellowText">FAQ Header</h2>
        <hr />
        <h2 className="yellowText">FAQ Header</h2>
        <hr />
        <h2 className="yellowText">FAQ Header</h2>
        <hr />
        <h2 className="yellowText">FAQ Header</h2>
      </div>

      {/* {gameData1 && (
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
            />
          </div>
        </span>
      )} */}
    </div>
  );
}

export default About;
