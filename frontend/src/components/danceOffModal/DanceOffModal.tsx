import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core/';
import { Modal, Button, Spin } from 'antd';
import Bracket from '../bracket/Bracket';
import LatestActivityCarousel from '../LatestActivityCarousel';
import { gameArray, dummyArray } from '../../fixtures/gameData';

import gitcoinDance from '../assets/gitcoin/gitcoinDance.svg';
import nftDanceOff from '../assets/gitcoin/nftDanceOff.svg';
import iconWallet from '../assets/gitcoin/iconWallet.svg';
import { nfts } from '../../assets';

export function DanceOffModal(props: any) {
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
    // <Modal
    //   centered
    //   width={1200}
    //   bodyStyle={{
    //     background:
    //       'radial-gradient(93.24% 93.24% at 50% 41.32%, #613dda 13.88%, #6f3ff5 41.01%, #05f5bc 88.02%)',
    //     minHeight: '600px',
    //   }}
    //   visible={modalOpen}
    //   closeIcon={<CloseIcon />}
    //   // title={activeNft.name}
    //   onCancel={() => {
    //     setActiveNft(null);
    //     setModalOpen(false);
    //   }}
    //   footer={null}
    // >
    //   <span className="modalContainer">
    //     {apiCall && (
    //       <Spin
    //         spinning={apiCall}
    //         style={{ position: 'absolute', top: '50%' }}
    //       />
    //     )}
    //     {!apiCall && (
    //       <>
    //         <span
    //           className="darkCard paddingForty"
    //           style={{ position: 'relative' }}
    //         >
    //           {/* <h3 style={{ color: 'white', textAlign: 'center' }}>{i}</h3> */}
    //           <span className="ellipsisTruncation" style={{ display: 'flex' }}>
    //             <hr style={{ width: '20%', backgroundColor: 'yellow' }} />
    //             <h3
    //               title={activeNft[0].description}
    //               className="tealText ellipsisTruncation cardTitleModal"
    //             >
    //               {activeNft[0].description}
    //             </h3>
    //             <hr style={{ width: '20%', backgroundColor: 'yellow' }} />
    //           </span>
    //           <h4
    //             className="underscoreDanceText"
    //             style={{ position: 'absolute', top: '16%', right: '45%' }}
    //           >
    //             _dance
    //           </h4>
    //           <div
    //             className="imgBorder imageInCard"
    //             style={{
    //               backgroundImage: `url(${activeNft[0].src})`,
    //               minHeight: '200px',
    //             }}
    //           />
    //         </span>
    //         <img
    //           style={{ alignSelf: 'center', margin: '40px' }}
    //           src={danceOff}
    //           alt="Dance Off"
    //           width="270px"
    //           height="160px"
    //         />
    //         <span
    //           className="darkCard paddingForty"
    //           style={{ position: 'relative' }}
    //         >
    //           <span className="ellipsisTruncation" style={{ display: 'flex' }}>
    //             <hr style={{ width: '20%', backgroundColor: 'yellow' }} />
    //             <h3
    //               title={activeNft[1].description}
    //               className="tealText ellipsisTruncation cardTitleModal"
    //             >
    //               {activeNft[1].description}
    //             </h3>
    //             <hr style={{ width: '20%', backgroundColor: 'yellow' }} />
    //           </span>
    //           <h4
    //             className="underscoreDanceText"
    //             style={{ position: 'absolute', top: '16%', right: '45%' }}
    //           >
    //             _dance
    //           </h4>
    //           <div
    //             className="imgBorder imageInCard"
    //             style={{
    //               backgroundImage: `url(${activeNft[1].src})`,
    //               minHeight: '200px',
    //             }}
    //           />
    //         </span>
    //       </>
    //     )}
    //   </span>
    //   {!apiCall && (
    //     <>
    //       <div
    //         style={{
    //           textAlign: 'center',
    //           display: 'inline-block',
    //           width: '425px',
    //         }}
    //       >
    //         {voting !== 0 && (
    //           <Button
    //             onClick={() => setVoting(0)}
    //             type="ghost"
    //             size="large"
    //             className="imgBorder2"
    //           >
    //             SELECT
    //           </Button>
    //         )}
    //         {voting === 0 && (
    //           <>
    //             <form>
    //               <label className="yellowText marginTen">
    //                 Donation:
    //                 <input
    //                   className="polarisText"
    //                   style={{ margin: '0px 5px' }}
    //                   type="text"
    //                   name="zkDai"
    //                   onChange={(e) => {
    //                     const val = e.target.value;
    //                     if (val !== '') {
    //                       setZkDonation(e.target.value);
    //                     }
    //                   }}
    //                 />
    //               </label>
    //             </form>
    //             <Button
    //               onClick={async () =>
    //                 await voteForNft(activeNft[0], zkDonation)
    //               }
    //               type="ghost"
    //               size="large"
    //               className="imgBorder2"
    //               style={{ margin: '5px' }}
    //             >
    //               VOTE
    //             </Button>
    //             <Button
    //               onClick={() => setVoting(null)}
    //               type="ghost"
    //               size="large"
    //               className="imgBorder2"
    //             >
    //               BACK
    //             </Button>
    //           </>
    //         )}
    //       </div>
    //       <div
    //         style={{
    //           width: voting ? '650px' : '615px',
    //           textAlign: 'end',
    //           display: 'inline-block',
    //         }}
    //       >
    //         {voting !== 1 && (
    //           <Button
    //             onClick={() => setVoting(1)}
    //             type="ghost"
    //             size="large"
    //             className="imgBorder2"
    //           >
    //             SELECT
    //           </Button>
    //         )}
    //         {voting === 1 && (
    //           <>
    //             <form>
    //               <label className="yellowText marginTen">
    //                 Donation:
    //                 <input
    //                   className="polarisText"
    //                   style={{ margin: '0px 5px' }}
    //                   type="text"
    //                   name="zkDai"
    //                   onChange={(e) => {
    //                     const val = e.target.value;
    //                     if (val !== '') {
    //                       setZkDonation(e.target.value);
    //                     }
    //                   }}
    //                 />
    //               </label>
    //             </form>
    //             <Button
    //               onClick={() => voteForNft(activeNft[1], zkDonation)}
    //               type="ghost"
    //               size="large"
    //               className="imgBorder2"
    //               style={{ margin: '5px' }}
    //             >
    //               VOTE
    //             </Button>
    //             <Button
    //               onClick={() => setVoting(null)}
    //               type="ghost"
    //               size="large"
    //               className="imgBorder2"
    //             >
    //               BACK
    //             </Button>
    //           </>
    //         )}
    //       </div>
    //     </>
    //   )}
    // </Modal>
    <div />
  );
}

export default DanceOffModal;
