/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ActiveRoundCard from './ActiveRoundCard';
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
        <Timer active newRound={() => props.newRound()} />
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
            imageInBracketCard: true,
          });
          const topClass = classNames({
            game: true,
            'game-top': true,
            purpTeal: true,
            ellipsisTruncation: true,
            imageInBracketCard: true,
          });
          return (
            <>
              <span key={i} style={{ margin: 'auto' }}>
                <li className={topClass}>
                  <ActiveRoundCard
                    nft={pnft}
                    activeNft={prevNft}
                    prevNft={prevNft}
                    n={n}
                    openModal={openModal}
                    nftVotes={nftVotes}
                    name={prevNft.name}
                    getZkVotes={getZkVotes}
                    zkDeps={zkDeps}
                    ethers={ethers}
                    votes={nftVotes[prevNft.nftId - 1]}
                    zkVotes={getZkVotes(prevNft.nftId, zkDeps, ethers)}
                  />
                </li>
                <li className="game game-spacer">&nbsp;</li>
                <li className={bottomClass}>
                  <ActiveRoundCard
                    nft={nft}
                    prevNft={prevNft}
                    activeNft={n}
                    n={n}
                    name={n.name}
                    openModal={openModal}
                    nftVotes={nftVotes}
                    getZkVotes={getZkVotes}
                    zkDeps={zkDeps}
                    ethers={ethers}
                    votes={nftVotes[n.nftId - 1]}
                    zkVotes={getZkVotes(n.nftId, zkDeps, ethers)}
                  />
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
