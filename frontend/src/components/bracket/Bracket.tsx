/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useContext } from 'react';
import * as ethers from 'ethers';
import * as zksync from 'zksync';
import { Modal, Button, Spin } from 'antd';
import { toast } from 'react-toastify';
import { GameContext } from '../../hardhat/SymfoniContext';
import { nfts, ActiveNFT } from '../../assets/index';
import { EmptyBracketCell } from './EmptyBracketCell';
import Timer from './Timer';
import gitcoinLogo from '../../assets/gitcoin/gitcoin-logo-illustrated-icon.png';
import danceOff from '../../assets/gitcoin/danceOff.svg';

const classNames = require('classnames');

export function Bracket(props: any) {
  const game = useContext(GameContext);

  // zksync provider/wallet
  const [zkProvider, setZkProvider] = useState<any>(undefined);
  const [zkWallet, setZkWallet] = useState<any>(undefined);

  const [zkDonation, setZkDonation] = useState<string>('50');

  const { gameData1, gd2, gd3, gd4 } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [nftVotes, setnftVotes] = useState<string[]>([]);
  const [zkDeps, setzkDeps] = useState<any[]>([]);
  const [apiCall, setApiCall] = useState(false);
  const [voting, setVoting] = useState<null | number>(null);
  const [activeNft, setActiveNft] = useState<null | ActiveNFT[]>(null);

  const openModal = (...nftArray: any[]) => {
    const active1 = nfts.find((n) => n.id === nftArray[0].gifId);
    const active2 = nfts.find((n) => n.id === nftArray[1].gifId);
    if (active1 && active2) {
      active1.name = nftArray[0].name;
      active2.name = nftArray[1].name;
      active1.nftId = nftArray[0].nftId;
      active2.nftId = nftArray[1].nftId;
      setModalOpen(true);
      setActiveNft([active1, active2]);
    } else {
      toast('Something went wrong');
    }
  };
  const setupZkProvider = async function () {
    const zkprovider = await zksync.getDefaultProvider('rinkeby');
    setZkProvider(zkprovider);
  };

  const setupZkSigner = async function () {
    const provider = new ethers.providers.Web3Provider(
      window.web3.currentProvider,
    );
    const signer = provider.getSigner();
    const zkWallet = await zksync.Wallet.fromEthSigner(signer, zkProvider);
    setZkWallet(zkWallet);
  };

  const getVotes = async function (nftId: number) {
    const totalVotes = await game.instance?.votesPerNftId(nftId);
    const formatedVotes = ethers.utils.formatEther(
      totalVotes?.toString() || '0',
    );
    console.log(`TOTAL VOTES:${formatedVotes}`);

    return formatedVotes.toString().slice(0, -2) || '0';
  };

  // get zkDai balance (will be votes later)
  const getNftZkAccountState = async function (nftId: number) {
    const nftAddress = await game.instance?.donationAddressByNftId(nftId);
    const zkprovider = await zksync.getDefaultProvider('rinkeby');

    const state = await zkprovider.getState(nftAddress || '');
    return state;
  };

  const getNftZkBalances = async function (num_dancers: number = 16) {
    const voteArrary = [];
    const zkDepArray = [];
    for (let i = 0; i <= num_dancers; i++) {
      const votes = await getVotes(i);
      voteArrary.push(votes);
      const zkAccountInfo = await getNftZkAccountState(i);
      zkDepArray.push(zkAccountInfo);
    }
    setnftVotes(voteArrary);
    setzkDeps(zkDepArray);

    console.log('VOTES ARRY', voteArrary);
    console.log('DEPS ARRY', zkDeps);
  };
  const voteForNft = async (nft: ActiveNFT, zkDaiAmount: string) => {
    setApiCall(true);
    let nftAddress;
    // @ts-ignore
    if (nft.nftId) {
      nftAddress = await game.instance?.donationAddressByNftId(nft.nftId - 1);
      console.log(nftAddress);
    }

    // todo: make this a dynamic dep amount
    const amount = zksync.utils.closestPackableTransactionAmount(
      ethers.utils.parseEther(zkDonation.toString()),
    );

    const provider = new ethers.providers.Web3Provider(
      window.web3.currentProvider,
    );
    const signer = provider.getSigner();
    const zWallet = await zksync.Wallet.fromEthSigner(signer, zkProvider);

    const transfer = await zWallet.syncTransfer({
      to: nftAddress || '',
      token: 'DAI',
      amount,
    });
    const transfer_recepit = await transfer.awaitReceipt();

    console.log(
      `transferred on ${zkDonation} DAI on  zksync to ${nftAddress} ${JSON.stringify(
        transfer.txHash,
      )}`,
    );
    if (transfer_recepit.success) {
      toast(
        <div className="purpTeal">
          transferred on {zkDonation} DAI on l2 to {nftAddress}{' '}
          {transfer.txHash}
        </div>,
        {
          className: 'purpTeal yellowText',
          bodyClassName: 'purpTeal yellowText',
          progressClassName: 'fancy-progress-bar',
        },
      );
    }

    setTimeout(() => {
      setApiCall(false);
      setModalOpen(false);
      setVoting(null);
      toast(
        <span className="purpTeal">
          <img
            style={{ margin: '5px', display: 'inline' }}
            height="20px"
            width="20px"
            src={gitcoinLogo}
            alt="gitcoin Logo"
          />
          <span>
            You have succesfully voted for <b>{nft.name}</b>!! 🎉
          </span>
        </span>,
        {
          className: 'purpTeal yellowText',
          bodyClassName: 'purpTeal yellowText',
          progressClassName: 'fancy-progress-bar',
        },
      );
    }, 50);
    // console.log(ethAddress, "etths")
  };

  const getZkVotes = (nftId: number) => {
    if (zkDeps[nftId - 1]?.committed !== undefined) {
      const dep = zkDeps[nftId - 1].committed?.balances.DAI || '0';
      // @ts-ignore
      const depbn = ethers.BigNumber.from(dep);
      const str = ethers.utils.formatEther(depbn).toString();
      return str.substring(0, str.length - 2);
    }
  };

  useEffect(() => {
    const initContract = async () => {
      if (!game.instance) return;
      console.log('Game is deployed at ', game.instance.address);
    };
    initContract();
    setupZkProvider();
    getNftZkBalances();
  }, [game, getNftZkBalances, nftVotes]);

  const CloseIcon = () => <div className="imgBorder marginTen xButton">X</div>;

  return (
    <div>
      {activeNft && (
        <Modal
          centered
          width={1200}
          bodyStyle={{
            background:
              'radial-gradient(93.24% 93.24% at 50% 41.32%, #613dda 13.88%, #6f3ff5 41.01%, #05f5bc 88.02%)',
            minHeight: '600px',
          }}
          visible={modalOpen}
          closeIcon={<CloseIcon />}
          // title={activeNft.name}
          onCancel={() => {
            setActiveNft(null);
            setModalOpen(false);
          }}
          footer={null}
        >
          <span className="modalContainer">
            {apiCall && (
              <Spin
                spinning={apiCall}
                style={{ position: 'absolute', top: '50%' }}
              />
            )}
            {!apiCall && (
              <>
                <span
                  className="darkCard paddingForty"
                  style={{ position: 'relative' }}
                >
                  {/* <h3 style={{ color: 'white', textAlign: 'center' }}>{i}</h3> */}
                  <span
                    className="ellipsisTruncation"
                    style={{ display: 'flex' }}
                  >
                    <hr style={{ width: '20%', backgroundColor: 'yellow' }} />
                    <h3
                      title={activeNft[0].description}
                      className="tealText ellipsisTruncation cardTitleModal"
                    >
                      {activeNft[0].description}
                    </h3>
                    <hr style={{ width: '20%', backgroundColor: 'yellow' }} />
                  </span>
                  <h4
                    className="underscoreDanceText"
                    style={{ position: 'absolute', top: '16%', right: '45%' }}
                  >
                    _dance
                  </h4>
                  <div
                    className="imgBorder imageInCard"
                    style={{
                      backgroundImage: `url(${activeNft[0].src})`,
                      minHeight: '200px',
                    }}
                  />
                </span>
                <img
                  style={{ alignSelf: 'center', margin: '40px' }}
                  src={danceOff}
                  alt="Dance Off"
                  width="270px"
                  height="160px"
                />
                <span
                  className="darkCard paddingForty"
                  style={{ position: 'relative' }}
                >
                  <span
                    className="ellipsisTruncation"
                    style={{ display: 'flex' }}
                  >
                    <hr style={{ width: '20%', backgroundColor: 'yellow' }} />
                    <h3
                      title={activeNft[1].description}
                      className="tealText ellipsisTruncation cardTitleModal"
                    >
                      {activeNft[1].description}
                    </h3>
                    <hr style={{ width: '20%', backgroundColor: 'yellow' }} />
                  </span>
                  <h4
                    className="underscoreDanceText"
                    style={{ position: 'absolute', top: '16%', right: '45%' }}
                  >
                    _dance
                  </h4>
                  <div
                    className="imgBorder imageInCard"
                    style={{
                      backgroundImage: `url(${activeNft[1].src})`,
                      minHeight: '200px',
                    }}
                  />
                </span>
              </>
            )}
          </span>
          {!apiCall && (
            <>
              <div
                style={{
                  textAlign: 'center',
                  display: 'inline-block',
                  width: '425px',
                }}
              >
                {voting !== 0 && (
                  <Button
                    onClick={() => setVoting(0)}
                    type="ghost"
                    size="large"
                    className="imgBorder2"
                  >
                    SELECT
                  </Button>
                )}
                {voting === 0 && (
                  <>
                    <form>
                      <label className="yellowText marginTen">
                        Donation:
                        <input
                          className="polarisText"
                          style={{ margin: '0px 5px' }}
                          type="text"
                          name="zkDai"
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val !== '') {
                              setZkDonation(e.target.value);
                            }
                          }}
                        />
                      </label>
                    </form>
                    <Button
                      onClick={async () =>
                        await voteForNft(activeNft[0], zkDonation)
                      }
                      type="ghost"
                      size="large"
                      className="imgBorder2"
                      style={{ margin: '5px' }}
                    >
                      VOTE
                    </Button>
                    <Button
                      onClick={() => setVoting(null)}
                      type="ghost"
                      size="large"
                      className="imgBorder2"
                    >
                      BACK
                    </Button>
                  </>
                )}
              </div>
              <div
                style={{
                  width: voting ? '650px' : '615px',
                  textAlign: 'end',
                  display: 'inline-block',
                }}
              >
                {voting !== 1 && (
                  <Button
                    onClick={() => setVoting(1)}
                    type="ghost"
                    size="large"
                    className="imgBorder2"
                  >
                    SELECT
                  </Button>
                )}
                {voting === 1 && (
                  <>
                    <form>
                      <label className="yellowText marginTen">
                        Donation:
                        <input
                          className="polarisText"
                          style={{ margin: '0px 5px' }}
                          type="text"
                          name="zkDai"
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val !== '') {
                              setZkDonation(e.target.value);
                            }
                          }}
                        />
                      </label>
                    </form>
                    <Button
                      onClick={() => voteForNft(activeNft[1], zkDonation)}
                      type="ghost"
                      size="large"
                      className="imgBorder2"
                      style={{ margin: '5px' }}
                    >
                      VOTE
                    </Button>
                    <Button
                      onClick={() => setVoting(null)}
                      type="ghost"
                      size="large"
                      className="imgBorder2"
                    >
                      BACK
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </Modal>
      )}
      {gameData1 && (
        <main id="tournament">
          <ul className="round round-1">
            <span className="spaceBetween">
              <h5 className="yellowText">FIRST</h5>
              <Timer active />
            </span>
            {gameData1.map((n: any, i: number) => {
              const nft = nfts.find((nf) => nf.id === n.gifId);
              let pnft;
              if (i % 2 !== 0) {
                const prevNft = gameData1[i - 1];
                pnft = nfts.find((nf) => nf.id === prevNft.gifId);
                const bottomClass = classNames({
                  game: true,
                  'game-bottom': true,
                  purpTeal: true,
                  ellipsisTruncation: true,
                  winner: n.voteCount > gameData1[i - 1].voteCount,
                  imageInBracketCard: true,
                });
                const topClass = classNames({
                  game: true,
                  'game-top': true,
                  purpTeal: true,
                  ellipsisTruncation: true,
                  winner: n.voteCount > gameData1[i].voteCount,
                  imageInBracketCard: true,
                });
                return (
                  <>
                    <span style={{ margin: 'auto' }}>
                      <li className={topClass}>
                        <span className="darkCard darkCardBracket">
                          <img
                            style={{ textAlign: 'center', display: 'inline' }}
                            height="60px"
                            width="60px"
                            src={pnft ? pnft.src : ''}
                            alt={pnft ? pnft.description : ''}
                          />
                        </span>
                        <span
                          className="link ellipsisTruncation tealText"
                          style={{ position: 'relative' }}
                          onClick={() => openModal(prevNft, n)}
                        >
                          <h3
                            title={prevNft.name}
                            style={{ marginLeft: '10px' }}
                            className="tealText ellipsisTruncation"
                          >
                            {prevNft.name}
                          </h3>
                          <h4
                            style={{
                              left: '20%',
                              top: '10%',
                              position: 'absolute',
                            }}
                            className="underscoreDanceText"
                          >
                            _dance
                          </h4>
                          {/* <hr style={{borderTop: "1px solid yellow"}}></hr> */}
                        </span>{' '}
                        <span
                          className="tealText"
                          style={{
                            position: 'absolute',
                            right: '10%',
                            bottom: '10%',
                          }}
                        >
                          <div>{nftVotes[prevNft.nftId - 1]} VOTES</div>{' '}
                          <span>{getZkVotes(prevNft.nftId)} ZK VOTES</span>
                        </span>
                      </li>
                      <li className="game game-spacer">&nbsp;</li>
                      <li className={bottomClass}>
                        <span className="darkCard darkCardBracket">
                          <img
                            style={{ textAlign: 'center', display: 'inline' }}
                            height="60px"
                            width="60px"
                            src={nft ? nft.src : ''}
                            alt={nft ? nft.description : ''}
                          />
                        </span>
                        <span
                          className="link ellipsisTruncation tealText"
                          style={{ position: 'relative' }}
                          onClick={() => openModal(prevNft, n)}
                        >
                          <h3
                            style={{ marginLeft: '10px' }}
                            title={n.name}
                            className="tealText ellipsisTruncation"
                          >
                            {n.name}
                          </h3>
                          <h4
                            style={{
                              left: '20%',
                              top: '10%',
                              position: 'absolute',
                            }}
                            className="underscoreDanceText"
                          >
                            _dance
                          </h4>
                          {/* <hr style={{borderTop: "1px solid yellow"}}></hr> */}
                        </span>{' '}
                        <span
                          className="tealText"
                          style={{
                            position: 'absolute',
                            right: '10%',
                            bottom: '10%',
                          }}
                        >
                          <div>{nftVotes[n.nftId - 1]} VOTES</div>{' '}
                          <span>{getZkVotes(n.nftId)} ZK VOTES</span>
                        </span>
                        {/* <span className="tealText" style={{position: "absolute", right: "10%", bottom: "10%"}}></span> */}
                      </li>
                    </span>
                  </>
                );
              }
              return <></>;
            })}
            {/* <li className="spacer">&nbsp;</li> */}
          </ul>
          <ul className="round round-2">
            <span className="spaceBetween">
              <h5 className="polarisText">SECOND</h5>
              <Timer />
            </span>
            {/* <hr></hr> */}
            {gd2.map((n: any, i: number) => {
              if (i % 2 !== 0) {
                return <EmptyBracketCell />;
              }
              return <></>;
            })}
          </ul>
          <ul className="round round-3">
            <span className="spaceBetween">
              <h5 className="polarisText">SEMIS</h5>
              <Timer />
            </span>
            {/* <hr></hr> */}
            {gd3.map((n: any, i: number) => {
              if (i % 2 !== 0) {
                return <EmptyBracketCell />;
              }
              return <></>;
            })}
          </ul>
          <ul className="round round-4">
            <span className="spaceBetween">
              <h5 className="polarisText">FINALS</h5>
              <Timer />
            </span>
            {/* <hr></hr> */}
            {gd4.map((n: any, i: number) => {
              if (i % 2 !== 0) {
                return <EmptyBracketCell />;
              }
              return <></>;
            })}
          </ul>
        </main>
      )}
    </div>
  );
}

export default Bracket;
