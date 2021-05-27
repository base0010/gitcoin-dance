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
  Input
} from "antd"
import { nfts, ActiveNFT}  from '../assets/index';
import Timer from './Timer';
import { toast } from 'react-toastify';
import gitcoinLogo from "../assets/gitcoin/gitcoin-logo-illustrated-icon.png"
const classNames = require('classnames');


export function Bracket(props: any) {
  const { gameData1 } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [voting, setVoting] = useState(false);
  const [activeNft, setActiveNft] = useState<null | ActiveNFT>(null);

  const useStyles = makeStyles((theme) => ({
    backDrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));


  const classes = useStyles();

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
        <Backdrop className={classes.backDrop} open={modalOpen}>
          <Dialog
            BackdropProps={{
              classes: {
                root: classes.backDrop,
              },
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
            open={modalOpen}
            onClose={() => {
              setActiveNft(null);
              setModalOpen(false);
            }}
            onBackdropClick={() => {
              setActiveNft(null);
              setModalOpen(false);
            }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            
            <div>
              
              <DialogTitle id="form-dialog-title">{activeNft.name}</DialogTitle>
              { !voting &&
              <span>
              <DialogContent>
                <img width="250px" height="250px" src={activeNft.src || ""} alt={activeNft.description || ""} />
                <a style={{ display: 'block' }} href="#">
                  View On Etherscan
                </a>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setActiveNft(null);
                    setModalOpen(false);
                  }}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setVoting(true)}
                  color="primary"
                >
                  Vote
                </Button>
              </DialogActions>
              </span>
            }
            {
              voting &&
              <span>
              <DialogContent>
                <img width="250px" height="250px" src={activeNft.src || ""} alt={activeNft.description || ""} />
                <p>How Much DAI?</p>
                <Input style={{width: "250px", display: "flex"}}></Input>
                <p>DAI Remaining: 0</p>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setVoting(false)}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                onClick={() => {
                  setActiveNft(null);
                  setModalOpen(false);
                  setVoting(false);
                  toast(Msg)
                }}
                color="primary"
                >
                  Ok
                </Button>
              </DialogActions>
              </span>
            }
            </div>
          </Dialog>
        </Backdrop>
      )}
      <div className="flexCenter">
        <Timer />
      </div>
      {gameData1 && (
        <main id="tournament">
          <ul className="round round-1">
            {gameData1.map((nft : any, i : number) => {
              if (i % 2 !== 0) {
                let prevNft = gameData1[i-1]
                const bottomClass = classNames({
                  game: true,
                  'game-bottom': true,
                  winner: nft.voteCount > gameData1[i - 1].voteCount,
                });
                const topClass = classNames({
                  game: true,
                  'game-top': true,
                  winner: nft.voteCount > gameData1[i].voteCount,
                });
                return (
                  <>
                  <li className="spacer">&nbsp;</li>
                  <span className="purp-teal paddingTwenty">       
                  <li className={topClass}>
                    <p
                      className="link backgroundForText"
                      onClick={() => openModal(prevNft)}
                    >
                      {prevNft.name}
                    </p>{' '}
                    <span>{prevNft.voteCount}</span>
                  </li>
                    <li className="game game-spacer">&nbsp;</li>
                    <li className={bottomClass}>
                      <p
                        className="link backgroundForText"
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
          <ul className="round round-2">
            <li className="spacer">&nbsp;</li>
            <li className="game game-top winner">
            </li>
            <li className="game game-spacer">&nbsp;</li>
            <li className="game game-bottom ">
            </li>
            <li className="spacer">&nbsp;</li>
            <li className="game game-top winner">
            </li>
            <li className="game game-spacer">&nbsp;</li>
            <li className="game game-bottom ">
            </li>
            <li className="spacer">&nbsp;</li>
            <li className="game game-top "></li>
            <li className="game game-spacer">&nbsp;</li>
            <li className="game game-bottom winner">
            </li>

            <li className="spacer">&nbsp;</li>

            <li className="game game-top ">
            </li>
            <li className="game game-spacer">&nbsp;</li>
            <li className="game game-bottom winner">
            </li>

            <li className="spacer">&nbsp;</li>
          </ul>
          <ul className="round round-3">
            <li className="spacer">&nbsp;</li>
            <li className="game game-top winner">
            </li>
            <li className="game game-spacer">&nbsp;</li>
            <li className="game game-bottom ">
            </li>
            <li className="spacer">&nbsp;</li>
            <li className="game game-top "></li>
            <li className="game game-spacer">&nbsp;</li>
            <li className="game game-bottom winner">
            </li>
            <li className="spacer">&nbsp;</li>
          </ul>
          <ul className="round round-4">
            <li className="spacer">&nbsp;</li>
            <li className="game game-top winner">
            </li>
            <li className="game game-spacer">&nbsp;</li>
            <li className="game game-bottom "></li>
            <li className="spacer">&nbsp;</li>
          </ul>
        </main>
      )}
    </div>
  );
}

export default Bracket;
