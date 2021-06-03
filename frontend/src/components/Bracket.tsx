import React, { useState, useEffect } from 'react';

import {
  Modal,
  Button
} from "antd"
import { nfts, ActiveNFT}  from '../assets/index';
import Timer from './Timer';
import { toast } from 'react-toastify';
import gitcoinLogo from "../assets/gitcoin/gitcoin-logo-illustrated-icon.png"
const classNames = require('classnames');


export function Bracket(props: any) {
  const { gameData1, gd2, gd3, gd4 } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [voting, setVoting] = useState(false);
  const [activeNft, setActiveNft] = useState<null | ActiveNFT>(null);

  const openModal = (nft: any) => {
    const active = nfts.find((n) => n.id === nft.gifId);
    if(active) {
      active.name = nft.name;
      setModalOpen(true);
      setActiveNft(active);
    } else {
      toast("Something went wrong")
    }
  };

  const Msg = ({ closeToast, toastProps } : any) => (
    <div>
      <img style={{margin: "5px"}} height="50px" width="50px" src={gitcoinLogo} alt={'gitcoin Logo'} />
       <a>PENDING</a> vote sent
    </div>
  )

  const CloseIcon = () => {
    return <div className="imgBorder marginTen">X</div>
  }
  

  return (
    <div>
      {activeNft && (
        <Modal 
        centered
        width={1500}
        bodyStyle={{background: "radial-gradient(93.24% 93.24% at 50% 41.32%, #613dda 13.88%, #6f3ff5 41.01%, #05f5bc 88.02%)"}}
        visible={modalOpen} 
        closeIcon={<CloseIcon/>}
        // title={activeNft.name}
        onCancel={() => {
          setActiveNft(null);
          setModalOpen(false);
        }}
        footer={null}

        >
          <span style={{display: "flex", justifyContent: "space-around", padding: "100px 100px 40px"}}>
                <span className="dark-card paddingForty">
                {/* <h3 style={{ color: 'white', textAlign: 'center' }}>{i}</h3> */}
                <span className="ellipsisTruncation" style={{display: "flex"}}>
                <hr style={{width: "20%", backgroundColor: "yellow"}}></hr>
                <h3
                  title={activeNft.description}
                  className="tealText ellipsisTruncation"
                  style={{ textAlign: 'center', fontSize: "20px", width: "300px" }}
                >
                  {activeNft.description}
                </h3>
                <hr style={{width: "20%", backgroundColor: "yellow"}}></hr>
                </span>
                <h4 className="underscoreDance">_dance</h4>
                <div className="imgBorder" style={{  
                  backgroundImage: `url(${activeNft.src})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  minHeight: "200px"
                }}></div>
              </span>
                <span style={{margin: "50px"}}>VS</span>
                <span className="dark-card paddingForty">
                {/* <h3 style={{ color: 'white', textAlign: 'center' }}>{i}</h3> */}
                <span className="ellipsisTruncation" style={{display: "flex"}}>
                <hr style={{width: "20%", backgroundColor: "yellow"}}></hr>
                <h3
                  title={activeNft.description}
                  className="tealText ellipsisTruncation"
                  style={{ textAlign: 'center', fontSize: "20px", width: "300px" }}
                >
                  {activeNft.description}
                </h3>
                <hr style={{width: "20%", backgroundColor: "yellow"}}></hr>
                </span>
                <h4 className="underscoreDance">_dance</h4>
                <div className="imgBorder" style={{  
                  backgroundImage: `url(${activeNft.src})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  minHeight: "200px"
                }}></div>
              </span>
          </span>
          <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                <Button
                onClick={() => {
                  setActiveNft(null);
                  setModalOpen(false);
                }}
                type="ghost"
                size="large"
                className="imgBorder2"
                >
                 SELECT
               </Button>
                <Button
                onClick={() => setVoting(true)}
                type="ghost"
                size="large"
                className="imgBorder2"
                >
                SELECT
              </Button>
              </div>
        </Modal>
      )}
      <div className="flexCenter">
        <Timer />
      </div>
      {gameData1 && (
        <main id="tournament">
          <ul className="round round-1">
          <h1 className="paddingTwenty yellowText">FIRST</h1>
            <hr></hr>
            {gameData1.map((n : any, i : number) => {
              let nft = nfts.find((nf) => nf.id === n.gifId);
              let pnft
              if (i % 2 !== 0) {
                let prevNft = gameData1[i-1]
                pnft = nfts.find((nf) => nf.id === prevNft.gifId);
                const bottomClass = classNames({
                  game: true,
                  'game-bottom': true,
                  'purp-teal': true,
                  ellipsisTruncation: true,
                  winner: n.voteCount > gameData1[i - 1].voteCount,
                  paddingTwenty: true,
                  display: "flex"
                });
                const topClass = classNames({
                  game: true,
                  'game-top': true,
                  'purp-teal': true,
                  ellipsisTruncation: true,
                  winner: n.voteCount > gameData1[i].voteCount,
                  paddingTwenty: true,
                  display: "flex"
                });
                return (
                  <>
                  <li className="spacer">&nbsp;</li>
                  <span className="paddingTwenty">       
                    <li  style={{display: "flex", width: "550px", height: "200px"}}  className={topClass}>
                      <span className="dark-card paddingTwenty">
                      <img
                        style={{ textAlign: 'center', display: "inline" }}
                        height="100px"
                        width="100px"
                        src={pnft ? pnft.src : ""}
                        alt={pnft ? pnft.description : ""}
                      />
      
                      </span>
                      <span
                      style={{fontSize: "12px"}}
                        className="link backgroundForText ellipsisTruncation tealText"
                        onClick={() => openModal(prevNft)}
                      >
                        <h3
                        title={prevNft.name}
                        className="tealText ellipsisTruncation"
                        style={{ textAlign: 'center', fontSize: "20px", width: "300px" }}
                        >
                        {prevNft.name}
                        </h3>
                        <h4 className="underscoreDance">_dance</h4>
                        <hr style={{borderTop: "1px solid yellow"}}></hr>
                      </span>{' '}
                      
                      <span className="tealText" style={{alignSelf: "flex-end"}}>{prevNft.voteCount}</span>
                    </li>
                      <li className="game game-spacer">&nbsp;</li>
                    <li style={{display: "flex", width: "550px", height: "200px"}} className={bottomClass}>
                  <span  className="dark-card paddingTwenty">
                    <img
                      style={{ textAlign: 'center', display: "inline" }}
                      height="100px"
                      width="100px"
                      src={nft ? nft.src : ""}
                      alt={nft ? nft.description : ""}
                    />
     
                    </span>
                      <span
                        style={{fontSize: "12px"}}
                        className="link backgroundForText ellipsisTruncation tealText"
                        onClick={() => openModal(n)}
                      >
                                <h3
                      title={n.name}
                      className="tealText ellipsisTruncation"
                      style={{ textAlign: 'center', fontSize: "20px", width: "300px" }}
                      >
                       {n.name}
                      </h3>
                      <h4 className="underscoreDance">_dance</h4>
                        <hr style={{borderTop: "1px solid yellow"}}></hr>
                      </span>{' '}
                      <span className="tealText" style={{alignSelf: "flex-end"}}>{n.voteCount}</span>
                    </li>
                  </span>
                  </>
                );
              }
              return (
                <>
                </>
              );
            })}
            <li className="spacer">&nbsp;</li>
          </ul>
          <ul className="round round-2">
          <h1 className="paddingTwenty polarisText">SECOND</h1>
          <hr></hr>
          {gd2.map((n : any, i : number) => {
             let nft = nfts.find((nf) => nf.id === n.gifId);
             let pnft
              if (i % 2 !== 0) {
                let prevNft2 = gd2[i-1]
                pnft = nfts.find((nf) => nf.id === prevNft2.gifId);
                const bottomClass2 = classNames({
                  game: true,
                  'game-bottom': true,
                  'inactive-round': true,
                  ellipsisTruncation: true,
                  winner: n.voteCount > gameData1[i - 1].voteCount,
                  paddingTwenty: true,
                  display: "flex"
                });
                const topClass2 = classNames({
                  game: true,
                  'game-top': true,
                  'inactive-round': true,
                  ellipsisTruncation: true,
                  winner: n.voteCount > gameData1[i].voteCount,
                  paddingTwenty: true,
                  display: "flex"
                });
                return (
                  <>
                  <li className="spacer">&nbsp;</li>
                  <span className="paddingTwenty">       
                    <li style={{display: "flex", width: "550px", height: "200px"}} className={topClass2}>
                      <p
                      style={{fontSize: "12px"}}
                        className="link backgroundForText ellipsisTruncation"
                        onClick={() => openModal(prevNft2)}
                      >
                        {prevNft2.name}
                      </p>{' '}
                      <span>{prevNft2.voteCount}</span>
                    </li>
                    <li className="game game-spacer">&nbsp;</li>
                    <li style={{display: "flex", width: "550px", height: "200px"}} className={bottomClass2}>
                      <p
                        style={{fontSize: "12px"}}
                        className="link backgroundForText ellipsisTruncation"
                        onClick={() => openModal(nft)}
                      >
                        {n.name}
                      </p>{' '}
                      <span>{n.voteCount}</span>
                    </li>
                  </span>
                  </>
                );
              }
              return (
                <>
                </>
              );
            })}
            <li className="spacer">&nbsp;</li>
          </ul>
          <ul className="round round-3">
          <h1 className="paddingTwenty polarisText">SEMIS</h1>
          <hr></hr>
          {gd3.map((n : any, i : number) => {
             let nft = nfts.find((nf) => nf.id === n.gifId);
             let pnft
              if (i % 2 !== 0) {
                let prevNft2 = gd2[i-1]
                pnft = nfts.find((nf) => nf.id === prevNft2.gifId);
                const bottomClass2 = classNames({
                  game: true,
                  'game-bottom': true,
                  'inactive-round': true,
                  ellipsisTruncation: true,
                  winner: n.voteCount > gameData1[i - 1].voteCount,
                  paddingTwenty: true,
                  display: "flex"
                });
                const topClass2 = classNames({
                  game: true,
                  'game-top': true,
                  'inactive-round': true,
                  ellipsisTruncation: true,
                  winner: n.voteCount > gameData1[i].voteCount,
                  paddingTwenty: true,
                  display: "flex"
                });
                return (
                  <>
                  <li className="spacer">&nbsp;</li>
                  <span className="paddingTwenty">       
                    <li style={{display: "flex", width: "550px", height: "200px"}} className={topClass2}>
                      <p
                      style={{fontSize: "12px"}}
                        className="link backgroundForText ellipsisTruncation"
                        onClick={() => openModal(prevNft2)}
                      >
                        {prevNft2.name}
                      </p>{' '}
                      <span>{prevNft2.voteCount}</span>
                    </li>
                    <li className="game game-spacer">&nbsp;</li>
                    <li style={{display: "flex", width: "550px", height: "200px"}} className={bottomClass2}>
                      <p
                        style={{fontSize: "12px"}}
                        className="link backgroundForText ellipsisTruncation"
                        onClick={() => openModal(nft)}
                      >
                        {n.name}
                      </p>{' '}
                      <span>{n.voteCount}</span>
                    </li>
                  </span>
                  </>
                );
              }
              return (
                <>
                </>
              );
            })}
            <li className="spacer">&nbsp;</li>
          </ul>
          <ul className="round round-3">
          <h1 className="paddingTwenty polarisText">FINALS</h1>
          <hr></hr>
          {gd4.map((n : any, i : number) => {
             let nft = nfts.find((nf) => nf.id === n.gifId);
             let pnft
              if (i % 2 !== 0) {
                let prevNft2 = gd2[i-1]
                pnft = nfts.find((nf) => nf.id === prevNft2.gifId);
                const bottomClass2 = classNames({
                  game: true,
                  'game-bottom': true,
                  'inactive-round': true,
                  ellipsisTruncation: true,
                  winner: n.voteCount > gameData1[i - 1].voteCount,
                  paddingTwenty: true,
                  display: "flex"
                });
                const topClass2 = classNames({
                  game: true,
                  'game-top': true,
                  'inactive-round': true,
                  ellipsisTruncation: true,
                  winner: n.voteCount > gameData1[i].voteCount,
                  paddingTwenty: true,
                  display: "flex"
                });
                return (
                  <>
                  <li className="spacer">&nbsp;</li>
                  <span className="paddingTwenty">       
                    <li style={{display: "flex", width: "550px", height: "200px"}} className={topClass2}>
                      <p
                      style={{fontSize: "12px"}}
                        className="link backgroundForText ellipsisTruncation"
                        onClick={() => openModal(prevNft2)}
                      >
                        {prevNft2.name}
                      </p>{' '}
                      <span>{prevNft2.voteCount}</span>
                    </li>
                    <li className="game game-spacer">&nbsp;</li>
                    <li style={{display: "flex", width: "550px", height: "200px"}} className={bottomClass2}>
                      <p
                        style={{fontSize: "12px"}}
                        className="link backgroundForText ellipsisTruncation"
                        onClick={() => openModal(nft)}
                      >
                        {n.name}
                      </p>{' '}
                      <span>{n.voteCount}</span>
                    </li>
                  </span>
                  </>
                );
              }
              return (
                <>
                </>
              );
            })}
            <li className="spacer">&nbsp;</li>
          </ul>
        </main>
      )}
    </div>
  );
}

export default Bracket;
