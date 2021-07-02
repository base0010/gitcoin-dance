/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ActiveRoundCard from './ActiveRoundCard';
import InactiveRoundCard from './InactiveRoundCard';

import Timer from './Timer';

const classNames = require('classnames');

export function PreviousRound(props: any) {
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
        <h5 className="polarisText">{header}</h5>
        <Timer active={false} />
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
            purpTeal:
              Number(
                getZkVotes(prevNft.nftId, zkDeps, ethers) +
                  nftVotes[prevNft.nftId - 1],
              ) <
              Number(
                getZkVotes(n.nftId, zkDeps, ethers) + nftVotes[n.nftId - 1],
              ),
            inactiveRound:
              Number(
                getZkVotes(prevNft.nftId, zkDeps, ethers) +
                  nftVotes[prevNft.nftId - 1],
              ) >
              Number(
                getZkVotes(n.nftId, zkDeps, ethers) + nftVotes[n.nftId - 1],
              ),
            ellipsisTruncation: true,
            winner: n.voteCount > gameData[i - 1].voteCount,
            imageInBracketCard: true,
          });
          const topClass = classNames({
            game: true,
            'game-top': true,
            purpTeal:
              Number(
                getZkVotes(prevNft.nftId, zkDeps, ethers) +
                  nftVotes[prevNft.nftId - 1],
              ) >
              Number(
                getZkVotes(n.nftId, zkDeps, ethers) + nftVotes[n.nftId - 1],
              ),
            inactiveRound:
              Number(
                getZkVotes(prevNft.nftId, zkDeps, ethers) +
                  nftVotes[prevNft.nftId - 1],
              ) <
              Number(
                getZkVotes(n.nftId, zkDeps, ethers) + nftVotes[n.nftId - 1],
              ),
            ellipsisTruncation: true,
            winner: n.voteCount > gameData[i].voteCount,
            imageInBracketCard: true,
          });
          return (
            <>
              <span key={i} style={{ margin: 'auto' }}>
                <li
                  onClick={() => openModal(prevNft, n)}
                  className={topClass}
                  style={{ cursor: 'pointer' }}
                >
                  {Number(
                    getZkVotes(prevNft.nftId, zkDeps, ethers) +
                      nftVotes[prevNft.nftId - 1],
                  ) >=
                    Number(
                      getZkVotes(n.nftId, zkDeps, ethers) +
                        nftVotes[n.nftId - 1],
                    ) && (
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
                      zkVotes={Number(
                        getZkVotes(prevNft.nftId, zkDeps, ethers),
                      )}
                    />
                  )}
                  {Number(
                    getZkVotes(prevNft.nftId, zkDeps, ethers) +
                      nftVotes[prevNft.nftId - 1],
                  ) <
                    Number(
                      getZkVotes(n.nftId, zkDeps, ethers) +
                        nftVotes[n.nftId - 1],
                    ) && (
                    <InactiveRoundCard
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
                      zkVotes={Number(
                        getZkVotes(prevNft.nftId, zkDeps, ethers),
                      )}
                    />
                  )}
                </li>
                <li className="game game-spacer">&nbsp;</li>
                <li
                  onClick={() => openModal(prevNft, n)}
                  style={{ cursor: 'pointer' }}
                  className={bottomClass}
                >
                  {Number(
                    getZkVotes(n.nftId, zkDeps, ethers) + nftVotes[n.nftId - 1],
                  ) >=
                    Number(
                      getZkVotes(prevNft.nftId, zkDeps, ethers) +
                        nftVotes[prevNft.nftId - 1],
                    ) && (
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
                      zkVotes={Number(getZkVotes(n.nftId, zkDeps, ethers))}
                    />
                  )}
                  {Number(
                    getZkVotes(n.nftId, zkDeps, ethers) + nftVotes[n.nftId - 1],
                  ) <
                    Number(
                      getZkVotes(prevNft.nftId, zkDeps, ethers) +
                        nftVotes[prevNft.nftId - 1],
                    ) && (
                    <InactiveRoundCard
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
                      zkVotes={Number(getZkVotes(n.nftId, zkDeps, ethers))}
                    />
                  )}
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

export default PreviousRound;
