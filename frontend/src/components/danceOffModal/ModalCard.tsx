/* eslint-disable react/jsx-filename-extension */
import React from 'react';

export function ModalCard(props: any) {
  const { activeNft } = props;
  return (
    <span className="darkCard paddingForty" style={{ position: 'relative' }}>
      <span className="ellipsisTruncation" style={{ display: 'flex' }}>
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
      <div
        className="imgBorder imageInCard"
        style={{
          backgroundImage: `url(${activeNft.src})`,
          minHeight: '200px',
        }}
      />
    </span>
  );
}

export default ModalCard;
