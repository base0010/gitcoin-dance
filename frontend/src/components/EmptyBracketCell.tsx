import React, { useState, useEffect } from 'react';

const classNames = require('classnames');


export function EmptyBracketCell(props : any) {
  const bottomClass2 = classNames({
    game: true,
    'game-bottom': true,
    'inactive-round': true,
    ellipsisTruncation: true,
    paddingTwenty: true,
    display: "flex"
  });
  const topClass2 = classNames({
    game: true,
    'game-top': true,
    'inactive-round': true,
    ellipsisTruncation: true,
    paddingTwenty: true,
    display: "flex"
  });
  
  return (
    <>
    <li className="spacer">&nbsp;</li>
    <span className="paddingTwenty">       
      <li style={{display: "flex", width: "550px", height: "200px"}} className={topClass2}>
        <p
        style={{fontSize: "12px"}}
          className="link backgroundForText ellipsisTruncation"
          // onClick={() => openModal(prevNft2)}
        >
          {/* {prevNft2.name} */}
        </p>{' '}
        {/* <span>{prevNft2.voteCount}</span> */}
      </li>
      <li className="game game-spacer">&nbsp;</li>
      <li style={{display: "flex", width: "550px", height: "200px"}} className={bottomClass2}>
        <p
          style={{fontSize: "12px"}}
          className="link backgroundForText ellipsisTruncation"
          // onClick={() => openModal(nft)}
        >
          {/* {n.name} */}
        </p>{' '}
        {/* <span>{n.voteCount}</span> */}
      </li>
    </span>
    </>
  );
}

export default EmptyBracketCell;
