import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Button,
  DialogContent,
  DialogActions,
  DialogTitle,
  makeStyles,
  Backdrop,
} from '@material-ui/core/';
import {
  Input,
  Modal
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

  // const useStyles = makeStyles((theme) => ({
  //   backDrop: {
  //     zIndex: theme.zIndex.drawer + 1,
  //     color: '#fff',
  //   },
  // }));


  // const classes = useStyles();

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
       <a >PENDING</a> vote sent
    </div>
  )
  

  return (
    <div>
      {activeNft && (
        <Modal 
        centered
        width={1000}
        bodyStyle={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}
        visible={modalOpen} 
        // title={activeNft.name}
        onCancel={() => {
          setActiveNft(null);
          setModalOpen(false);
        }}
        footer={[
          <Button
          onClick={() => {
            setActiveNft(null);
            setModalOpen(false);
          }}
          color="primary"
        >
          Vote
        </Button>,
          <Button
          onClick={() => setVoting(true)}
          color="primary"
        >
          Vote
        </Button>
        ]}
        >
                <img width="350px" height="350px" src={activeNft.src || ""} alt={activeNft.description || ""} />
                <span style={{margin: "50px"}}>VS</span>
                <img width="350px" height="350px" src={activeNft.src || ""} alt={activeNft.description || ""} />
        </Modal>
      )}
      <div className="flexCenter">
        <Timer />
      </div>
      {gameData1 && (
        <main id="tournament">
          <ul className="round round-1">
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
                  <li  style={{display: "flex"}}  className={topClass}>
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
                      {prevNft.name}
                      <hr style={{borderTop: "1px solid yellow"}}></hr>
                    </span>{' '}
                    <span className="tealText" style={{alignSelf: "flex-end"}}>{prevNft.voteCount}</span>
                  </li>
                    <li className="game game-spacer">&nbsp;</li>
                    <li style={{display: "flex"}} className={bottomClass}>
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
                        onClick={() => openModal(nft)}
                      >
                        {n.name}
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
          {gd2.map((n : any, i : number) => {
             let nft = nfts.find((nf) => nf.id === n.gifId);
             let pnft
              if (i % 2 !== 0) {
                let prevNft2 = gd2[i-1]
                pnft = nfts.find((nf) => nf.id === prevNft2.gifId);
                const bottomClass2 = classNames({
                  game: true,
                  'game-bottom': true,
                  ellipsisTruncation: true,
                  winner: n.voteCount > gd2[i - 1].voteCount,
                  paddingTwenty: true,
                  display: "flex"
                });
                const topClass2 = classNames({
                  game: true,
                  'game-top': true,
                  ellipsisTruncation: true,
                  winner: n.voteCount > gd2[i].voteCount,
                  paddingTwenty: true,
                  display: "flex"
                });
                return (
                  <>
                  <li className="spacer">&nbsp;</li>
                  <span className="paddingTwenty">       
                  <li className={topClass2}>
                  <span className="dark-card paddingTwenty">
                    {/* <img
                      // style={{ textAlign: 'center', display: "inline" }}
                      height="100px"
                      width="100px"
                      src={nft ? nft.src : ""}
                      alt={nft ? nft.description : ""}
                    /> */}
                    </span>
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
                    <li className={bottomClass2}>
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
          {gd3.map((nft : any, i : number) => {
              if (i % 2 !== 0) {
                let prevNft = gd3[i-1]
                const bottomClass = classNames({
                  game: true,
                  'game-bottom': true,
                  ellipsisTruncation: true,
                  winner: nft.voteCount > gd3[i - 1].voteCount,
                });
                const topClass = classNames({
                  game: true,
                  'game-top': true,
                  ellipsisTruncation: true,
                  winner: nft.voteCount > gd3[i].voteCount,
                });
                return (
                  <>
                  <li className="spacer">&nbsp;</li>
                  <span className="purp-teal paddingTwenty">       
                  <li className={topClass}>
                    <p
                    style={{fontSize: "12px"}}
                      className="link backgroundForText ellipsisTruncation"
                      onClick={() => openModal(prevNft)}
                    >
                      {prevNft.name}
                    </p>{' '}
                    <span>{prevNft.voteCount}</span>
                  </li>
                    <li className="game game-spacer">&nbsp;</li>
                    <li className={bottomClass}>
                      <p
                        style={{fontSize: "12px"}}
                        className="link backgroundForText ellipsisTruncation"
                        onClick={() => openModal(nft)}
                      >
                        {nft.name}
                      </p>{' '}
                      <span>{nft.voteCount}</span>
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
          {gd4.map((nft : any, i : number) => {
              if (i % 2 !== 0) {
                let prevNft = gd4[i-1]
                const bottomClass = classNames({
                  game: true,
                  'game-bottom': true,
                  ellipsisTruncation: true,
                  winner: nft.voteCount > gd4[i - 1].voteCount,
                });
                const topClass = classNames({
                  game: true,
                  'game-top': true,
                  ellipsisTruncation: true,
                  winner: nft.voteCount > gd4[i].voteCount,
                });
                return (
                  <>
                  <li className="spacer">&nbsp;</li>
                  <span className="purp-teal paddingTwenty">       
                  <li className={topClass}>
                    <p
                    style={{fontSize: "12px"}}
                      className="link backgroundForText ellipsisTruncation"
                      onClick={() => openModal(prevNft)}
                    >
                      {prevNft.name}
                    </p>{' '}
                    <span>{prevNft.voteCount}</span>
                  </li>
                    <li className="game game-spacer">&nbsp;</li>
                    <li className={bottomClass}>
                      <p
                        style={{fontSize: "12px"}}
                        className="link backgroundForText ellipsisTruncation"
                        onClick={() => openModal(nft)}
                      >
                        {nft.name}
                      </p>{' '}
                      <span>{nft.voteCount}</span>
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
