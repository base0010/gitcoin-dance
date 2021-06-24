/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Timer from './Timer';

const classNames = require('classnames');

export function ActiveRound(props: any) {
  const {
    gameData,
    header,
    nfts,
    openModal,
    nftVotes,
    getZkVotes,
    zkDeps,
    ethers,
  } = props;
  return (
    <>
      <span className="spaceBetween">
        <h5 className="yellowText">{header}</h5>
        <Timer active />
      </span>
      {gameData.map((n: any, i: number) => {
        const nft = nfts.find((nf: any) => nf.id === n.gifId);
        let pnft;
        if (i % 2 !== 0) {
          const prevNft = gameData[i - 1];
          pnft = nfts.find((nf: any) => nf.id === prevNft.gifId);
          const bottomClass = classNames({
            game: true,
            'game-bottom': true,
            purpTeal: true,
            ellipsisTruncation: true,
            winner: n.voteCount > gameData[i - 1].voteCount,
            imageInBracketCard: true,
          });
          const topClass = classNames({
            game: true,
            'game-top': true,
            purpTeal: true,
            ellipsisTruncation: true,
            winner: n.voteCount > gameData[i].voteCount,
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
                    <span>
                      {getZkVotes(prevNft.nftId, zkDeps, ethers)} ZK VOTES
                    </span>
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
                    <span>{getZkVotes(n.nftId, zkDeps, ethers)} ZK VOTES</span>
                  </span>
                  {/* <span className="tealText" style={{position: "absolute", right: "10%", bottom: "10%"}}></span> */}
                </li>
              </span>
            </>
          );
        }
        return <></>;
      })}
    </>
  );
}

export default ActiveRound;
