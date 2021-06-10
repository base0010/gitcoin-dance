import React, {useState, useEffect, useContext} from 'react';
import {GameContext, ERC721MintableContext} from "./../hardhat/SymfoniContext";
import { ProviderContext, CurrentAddressContext} from "./../hardhat/SymfoniContext";
import { ethers} from "hardhat";
import hre from 'hardhat'
import * as zksync from "zksync"

import {
  Modal,
  Button
} from "antd"
import { nfts, ActiveNFT}  from '../assets/index';
import {EmptyBracketCell} from "./EmptyBracketCell"
import Timer from './Timer';
import { toast } from 'react-toastify';

import {VoteButton} from "./VoteButton";

import gitcoinLogo from "../assets/gitcoin/gitcoin-logo-illustrated-icon.png"
import danceOff from "../assets/gitcoin/danceOff.svg"
import {gameArray} from "../fixtures/gameData";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

const classNames = require('classnames');


export function Bracket(props: any) {
  const game = useContext(GameContext)
  const nft = useContext(ERC721MintableContext)
  const provider = useContext(ProviderContext)

  const { gameData1, gd2, gd3, gd4 } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [voting, setVoting] = useState<null | number>(null);
  const [activeNft, setActiveNft] = useState<null | ActiveNFT[]>(null);

  const openModal = (...nftArray: any[]) => {
    const active1 = nfts.find((n) => n.id === nftArray[0].gifId);
    const active2 = nfts.find((n) => n.id === nftArray[1].gifId);
    if(active1 && active2) {
      active1.name = nftArray[0].name;
      active2.name = nftArray[1].name;
      active1.nftId = nftArray[0].nftId;
      active2.nftId = nftArray[1].nftId;
      setModalOpen(true);
      setActiveNft([active1, active2]);
    } else {
      toast("Something went wrong")
    }
  };

  const vote = async (nft: ActiveNFT) => {
    console.log(nft, "nft")
    // @ts-ignore
    const nftAddress = await game.instance?.donationAddressByNftId(nft.nftId -1);
    const amount = zksync.utils.closestPackableTransactionAmount(ethers.utils.parseEther("100"));

    const setProviders = async function(){
      const zkprovider =  await zksync.getDefaultProvider("rinkeby");

      // const ethprovider = await ethers.getDefaultProvider("rinkeby");
      const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);

      const signer = provider.getSigner()
      const syncWallet = await zksync.Wallet.fromEthSigner(signer, zkprovider);

      const transfer = await syncWallet.syncTransfer({
          to: nftAddress || "",
          token: "DAI",
          amount,
      })
      const transfer_recepit = await transfer.awaitReceipt();
      console.log("transferred on l2", transfer_recepit);
    }




    //
    // // const withdrawl_to_game= await game.withdrawlFromDonationProxyToSelf(nftAddress)
    // const wd_from_sync = await syncWallet.withdrawFromSyncToEthereum({
    //     ethAddress:nftAddress,
    //     token: "ETH",
    //     amount: ethers.utils.parseEther("0.05")
    // })
    // const wd_verification = await wd_from_sync.awaitVerifyReceipt()
    // console.log("Withdrawl verification", wd_verification);
  }

  useEffect(() => {
    const initContract = async() =>{
      if (!game.instance) return;
      console.log("Game is deployed at ", game.instance.address);

      // const  w = await game.instance.determineBrackets();
      // alert(w?.value)

      // const mint = await game.instance.mintNFTAndDeployDonationAddress('http://fuck.com', game.instance.address);
      // let waited = await mint.wait()
      //
      // const dancer_created_e = waited?.events?.filter(event=>event.event === 'DancerCreated')
      // const nft_mint_e = waited?.events?.filter(event=>event.event === 'NFTMinted')
      // // const mint_debug_e = waited?.events?.filter(event=>event.event === 'MintDebug')
      // // console.log(" NFT mint debug", nft_mint_e?[0].args[0] )
      // console.log(" NFT mint debug", nft_mint_e)
      //
      // // const deployedDBAddress = dancer_created_e[0].args[0]
      // // console.log("deployed dancerproxy address ",deployedDBAddress)
      // console.log("deployed dancerproxy address ",dancer_created_e)

    };
    initContract();
  },[game]);

  const Msg = ({ closeToast, toastProps } : any) => (
    <div>
      <img style={{margin: "5px"}} height="50px" width="50px" src={gitcoinLogo} alt={'gitcoin Logo'} />
       <a>PENDING</a> vote sent
    </div>
  )

  const CloseIcon = () => {
    return <div className="imgBorder marginTen xButton">X</div>
  }
  

  return (
    <div>
      {activeNft && (
        <Modal 
        centered
        width={1200}
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
          <span className="modalContainer">
              <span className="darkCard paddingForty" style={{position: "relative"}}>
                {/* <h3 style={{ color: 'white', textAlign: 'center' }}>{i}</h3> */}
                <span className="ellipsisTruncation" style={{display: "flex"}}>
                <hr style={{width: "20%", backgroundColor: "yellow"}}></hr>
                <h3
                  title={activeNft[0].description}
                  className="tealText ellipsisTruncation cardTitleModal"
                >
                  {activeNft[0].description}
                </h3>
                <hr style={{width: "20%", backgroundColor: "yellow"}}></hr>
                </span>
                <h4 className="underscoreDanceText" style={{position: "absolute", top: "16%", right: "45%"}}>_dance</h4>
                <div className="imgBorder imageInCard" style={{  
                  backgroundImage: `url(${activeNft[0].src})`,
                  minHeight: "200px"
                }}></div>
              </span>
                <img style={{alignSelf: "center", margin: "40px"}} src={danceOff} alt="Dance Off" width="270px" height="160px"/> 
                <span className="darkCard paddingForty" style={{position: "relative"}}>
                {/* <h3 style={{ color: 'white', textAlign: 'center' }}>{i}</h3> */}
                <span className="ellipsisTruncation" style={{display: "flex"}}>
                <hr style={{width: "20%", backgroundColor: "yellow"}}></hr>
                <h3
                  title={activeNft[1].description}

                  className="tealText ellipsisTruncation cardTitleModal"

                >
                  {activeNft[1].description}
                </h3>
                <hr style={{width: "20%", backgroundColor: "yellow"}}></hr>
                </span>
                <h4 className="underscoreDanceText" style={{position: "absolute", top: "16%", right: "45%"}}>_dance</h4>
                <div className="imgBorder imageInCard" style={{  
                  backgroundImage: `url(${activeNft[1].src})`,
                  minHeight: "200px"
                }}></div>
              </span>
          </span>
          <div style={{textAlign: "center", display: "inline-block", width: "425px"}}>
            {voting !== 0 &&
                <Button
                onClick={() => setVoting(0)}
                type="ghost"
                size="large"
                className="imgBorder2"
                >
                 SELECT
               </Button>
            }
               {
                 voting === 0 &&       
                 <>
                <Button
                 onClick={() => vote(activeNft[0])}
                 type="ghost"
                 size="large"
                 className="imgBorder2"
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
               }
            </div>
            <div style={{width: "615px", textAlign: "end", display: "inline-block"}}>
               {voting !== 1 &&
                <Button
                onClick={() => setVoting(1)}
                type="ghost"
                size="large"
                className="imgBorder2"
                >
                SELECT
              </Button>
               }
               {
                 voting === 1 &&       
                 <>
                <Button
                 onClick={() => vote(activeNft[1])}
                 type="ghost"
                 size="large"
                 className="imgBorder2"
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
               }
              </div>
        </Modal>
      )}
      {/* <div className="flexCenter">
        <Timer />
      </div> */}
      {gameData1 && (
        <main id="tournament">
          <ul className="round round-1">
          <span className="spaceBetween">
          <h5 className="yellowText">FIRST</h5>
          <Timer active/>
          </span>
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
                  'purpTeal': true,
                  ellipsisTruncation: true,
                  winner: n.voteCount > gameData1[i - 1].voteCount,
                  imageInBracketCard: true

                });
                const topClass = classNames({
                  game: true,
                  'game-top': true,
                  'purpTeal': true,
                  ellipsisTruncation: true,
                  winner: n.voteCount > gameData1[i].voteCount,
                  imageInBracketCard: true
                });
                return (
                  <>
                  <li className="spacer">&nbsp;</li>
                  <span>       
                    <li className={topClass}>
                      <span className="darkCard darkCardBracket">
                      <img
                        style={{ textAlign: 'center', display: "inline" }}
                        height="60px"
                        width="60px"
                        src={pnft ? pnft.src : ""}
                        alt={pnft ? pnft.description : ""}
                      />
      
                      </span>
                      <span
                        className="link ellipsisTruncation tealText"
                        style={{ position: "relative"}}
                        onClick={() => openModal(prevNft, n)}
                      >
                        <h3
                        title={prevNft.name}
                        style={{marginLeft: "10px"}}
                        className="tealText ellipsisTruncation"
                        >
                        {prevNft.name}
                        </h3>
                        <h4 style={{left: "20%", top: "10%", position: "absolute"}} className="underscoreDanceText">_dance</h4>
                        {/* <hr style={{borderTop: "1px solid yellow"}}></hr> */}
                      </span>{' '}
                      
                      <span className="tealText" style={{position: "absolute", right: "10%", bottom: "10%"}}>{prevNft.voteCount} VOTES</span>
                    </li>
                      <li className="game game-spacer">&nbsp;</li>
                  <li className={bottomClass}>
                  <span className="darkCard darkCardBracket">
                    <img
                      style={{ textAlign: 'center', display: "inline" }}
                      height="60px"
                      width="60px"
                      src={nft ? nft.src : ""}
                      alt={nft ? nft.description : ""}
                    />
     
                    </span>
                      <span
                        className="link ellipsisTruncation tealText"
                        style={{position: "relative"}}
                        onClick={() => openModal(prevNft, n)}
                      >
                      <h3
                        style={{marginLeft: "10px"}}
                        title={n.name}
                        className="tealText ellipsisTruncation"
                      >
                       {n.name}
                      </h3>
                      <h4 style={{left: "20%", top: "10%", position: "absolute"}} className="underscoreDanceText">_dance</h4>
                        {/* <hr style={{borderTop: "1px solid yellow"}}></hr> */}
                      </span>{' '}
                      <span className="tealText" style={{position: "absolute", right: "10%", bottom: "10%"}}>{n.voteCount} VOTES</span>
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
          <span className="spaceBetween">
          <h5 className="polarisText">SECOND</h5>
          <Timer/>
          </span>
          <hr></hr>
          {gd2.map((n : any, i : number) => {
              if (i % 2 !== 0 || i === 0) {
                return <EmptyBracketCell/>
              }
              return (
                <>
                </>
              );
            })}
          </ul>
          <ul className="round round-3">
          <span className="spaceBetween">
          <h5 className="polarisText">SEMIS</h5>
          <Timer/>
          </span>
          <hr></hr>
          {gd3.map((n : any, i : number) => {
              if (i % 2 !== 0 || i === 0) {
                return <EmptyBracketCell/>
              }
              return (
                <>
                </>
              );
            })}
          </ul>
          <ul className="round round-4">
          <span className="spaceBetween">
          <h5 className="polarisText">FINALS</h5>
          <Timer/>
          </span>
          <hr></hr>
          {gd4.map((n : any, i : number) => {
              if (i % 2 !== 0 || i === 0) {
                return <EmptyBracketCell/>
              }
              return (
                <>
                </>
              );
            })}
          </ul>
        </main>
      )}
    </div>
  );
}

export default Bracket;
