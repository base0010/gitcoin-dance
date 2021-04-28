import React, { useState, useEffect } from 'react';
import {
  LinearProgress,
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
import nfts from '../assets';
import Timer from './Timer';
import { toast } from 'react-toastify';
import gitcoinLogo from "../assets/gitcoin/gitcoin-logo-illustrated-icon.png"
const classNames = require('classnames');

export function Bracket(props) {
  const { gameData1 } = props;
  // const [gameData1, setGameData1] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [voting, setVoting] = useState(false);
  const [activeNft, setActiveNft] = useState(null);

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

  const classes = useStyles();

  // useEffect(async () => {
  //   const getGameData1 = async () => {
  //     const result = await fetch('http://localhost:3000/game', {
  //       method: 'GET',
  //     });
  //     return result.json();
  //   };
  //   if (!gameData1) {
  //     const res = await getGameData1();
  //     setGameData1(res);
  //   }
  // });

  const openModal = (nft) => {
    const active = nfts.find((n) => n.id === nft.gifId);
    active.name = nft.name;
    setModalOpen(true);
    setActiveNft(active);
  };

  const Msg = ({ closeToast, toastProps }) => (
    <div>
      <img style={{margin: "5px"}} height="50px" width="50px" src={gitcoinLogo} alt={'gitcoin Logo'} />
       <a >PENDING</a> vote sent
    </div>
  )
  

  return (
    <div>
      {activeNft && (
        <Backdrop className={classes.backdrop} open={modalOpen}>
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
                <img width="250px" height="250px" src={activeNft.src} alt={activeNft.description} />
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
                <img width="250px" height="250px" src={activeNft.src} alt={activeNft.description} />
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
            {gameData1.map((nft, i) => {
              if (i % 2 !== 0) {
                const bottomClass = classNames({
                  game: true,
                  'game-bottom': true,
                  winner: nft.voteCount > gameData1[i - 1].voteCount,
                });
                return (
                  <>
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
                  </>
                );
              }
              const topClass = classNames({
                game: true,
                'game-top': true,
                winner: nft.voteCount > gameData1[i + 1].voteCount,
              });
              return (
                <>
                  <li className="spacer">&nbsp;</li>

                  <li className={topClass}>
                    <p
                      className="link backgroundForText"
                      onClick={() => openModal(nft)}
                    >
                      {nft.name}
                    </p>{' '}
                    <span>{nft.voteCount}</span>
                  </li>
                </>
              );
            })}
            <li className="spacer">&nbsp;</li>
          </ul>
          <ul className="round round-2">
            <li className="spacer">&nbsp;</li>

            <li className="game game-top winner">
              {/* Lousville <span>82</span> */}
            </li>
            <li className="game game-spacer">&nbsp;</li>
            <li className="game game-bottom ">
              {/* Colo St <span>56</span> */}
            </li>

            <li className="spacer">&nbsp;</li>

            <li className="game game-top winner">
              {/* Oregon <span>74</span> */}
            </li>
            <li className="game game-spacer">&nbsp;</li>
            <li className="game game-bottom ">
              {/* Saint Louis <span>57</span> */}
            </li>

            <li className="spacer">&nbsp;</li>

            <li className="game game-top ">{/* Memphis <span>48</span> */}</li>
            <li className="game game-spacer">&nbsp;</li>
            <li className="game game-bottom winner">
              {/* Mich St <span>70</span> */}
            </li>

            <li className="spacer">&nbsp;</li>

            <li className="game game-top ">
              {/* Creighton <span>50</span> */}
            </li>
            <li className="game game-spacer">&nbsp;</li>
            <li className="game game-bottom winner">
              {/* Duke <span>66</span> */}
            </li>

            <li className="spacer">&nbsp;</li>
          </ul>
          <ul className="round round-3">
            <li className="spacer">&nbsp;</li>

            <li className="game game-top winner">
              {/* Lousville <span>77</span> */}
            </li>
            <li className="game game-spacer">&nbsp;</li>
            <li className="game game-bottom ">
              {/* Oregon <span>69</span> */}
            </li>

            <li className="spacer">&nbsp;</li>

            <li className="game game-top ">{/* Mich St <span>61</span> */}</li>
            <li className="game game-spacer">&nbsp;</li>
            <li className="game game-bottom winner">
              {/* Duke <span>71</span> */}
            </li>

            <li className="spacer">&nbsp;</li>
          </ul>
          <ul className="round round-4">
            <li className="spacer">&nbsp;</li>

            <li className="game game-top winner">
              {/* Lousville <span>85</span> */}
            </li>
            <li className="game game-spacer">&nbsp;</li>
            <li className="game game-bottom ">{/* Duke <span>63</span> */}</li>

            <li className="spacer">&nbsp;</li>
          </ul>
        </main>
      )}
    </div>
  );
}

export default Bracket;
