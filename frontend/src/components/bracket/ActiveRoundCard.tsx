/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Spin } from 'antd';

export function ActiveRoundCard(props: any) {
  const {
    nft,
    activeNft,
    n,
    openModal,
    zkDeps,
    ethers,
    getZkVotes,
    nftVotes,
    prevNft,
    name,
  } = props;
  return (
    <>
      <span className="darkCard darkCardBracket">
        {/* <img
          style={{ textAlign: 'center', display: 'inline' }}
          height="60px"
          width="60px"
          src={nft ? nft.src : ''}
          alt={nft ? nft.description : ''}
        /> */}
        <video
          className="imgBorder imageInCard"
          //   height="40"
          width="40"
          autoPlay
          muted
          loop
        >
          <source src={nft.src} type="video/mp4" />
        </video>
      </span>
      <span
        className="link ellipsisTruncation tealText"
        style={{ position: 'relative' }}
        onClick={() => openModal(prevNft, n)}
      >
        <h3
          title={name}
          style={{ marginLeft: '10px' }}
          className="tealText ellipsisTruncation"
        >
          {name}
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
        <hr style={{ borderTop: '1px solid yellow' }} />
      </span>{' '}
      {nftVotes.length > 0 && (
        <span
          className="tealText"
          style={{
            position: 'absolute',
            right: '10%',
            bottom: '10%',
          }}
        >
          <div>{nftVotes[activeNft.nftId - 1]} VOTES</div>{' '}
          <span>{getZkVotes(activeNft.nftId, zkDeps, ethers)} ZK VOTES</span>
        </span>
      )}
      {nftVotes.length < 1 && (
        <span
          style={{
            position: 'absolute',
            right: '20%',
            bottom: '0%',
          }}
        >
          <div style={{ margin: '15px' }}>
            <Spin spinning={nftVotes.length < 1} />
          </div>
          <div style={{ margin: '15px' }}>
            <Spin spinning={nftVotes.length < 1} />
          </div>
        </span>
      )}
    </>
  );
}

export default ActiveRoundCard;
