/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Spin } from 'antd';

export function InactiveRoundCard(props: any) {
  const { nft, nftVotes, name, votes, zkVotes } = props;
  return (
    <>
      <span className="darkCard darkCardBracket">
        <video
          className="imageInCard"
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
        className="link ellipsisTruncation greyText"
        style={{ position: 'relative' }}
      >
        <h3
          title={name}
          style={{ marginLeft: '10px' }}
          className="greyText ellipsisTruncation"
        >
          {name}
        </h3>
        <h4
          style={{
            left: '20%',
            top: '10%',
            position: 'absolute',
          }}
          className="inactiveUnderscoreDanceText"
        >
          _dance
        </h4>
        <hr style={{ borderTop: '1px solid yellow' }} />
      </span>{' '}
      {nftVotes.length > 0 && (
        <span
          className="greyText"
          style={{
            position: 'absolute',
            right: '10%',
            bottom: '10%',
          }}
        >
          <div style={{ fontSize: '16px' }}>{zkVotes} VOTES</div>
          <span style={{ fontSize: '12px' }}>{votes} CONFIRMED</span>{' '}
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

export default InactiveRoundCard;
