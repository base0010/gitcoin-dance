/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import illusCrown from '../../assets/gitcoin/illusCrown.svg';

export function WinningCard(props: any) {
  const { activeNft, voting, selection } = props;
  return (
    <span
      className="darkCard paddingForty"
      style={{ position: 'relative', display: 'flex', flexWrap: 'wrap' }}
    >
      <img src={illusCrown} alt="crown" width="112" height="87" />
      <span
        className="ellipsisTruncation"
        style={{ display: 'flex', margin: '5px' }}
      >
        <hr style={{ width: '20%', backgroundColor: 'yellow' }} />
        <h3
          title={activeNft.description}
          className="tealText ellipsisTruncation cardTitleModal"
        >
          {activeNft.description}
        </h3>
        <hr style={{ width: '20%', backgroundColor: 'yellow' }} />
      </span>
      <h4
        className="underscoreDanceText"
        style={{ position: 'absolute', top: '16%', right: '45%' }}
      >
        _dance
      </h4>
      {voting !== selection && (
        <video
          className="imgBorder imageInCard"
          // height="120"
          width="150"
          autoPlay
          muted
          loop
        >
          <source src={activeNft.src} type="video/mp4" />
        </video>
      )}
      {voting === selection && (
        <video
          className="imgBorder imageInCard"
          // height="120"
          width="150"
          autoPlay
          //   muted
          loop
        >
          <source src={activeNft.src} type="video/mp4" />
        </video>
      )}
    </span>
  );
}

export default WinningCard;
