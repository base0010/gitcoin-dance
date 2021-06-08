import React from 'react';

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
    <li className="spacer"></li>
    <span>       
      <li style={{display: "flex", width: "275px", height: "100px"}} className={topClass2}>
        <p
        style={{fontSize: "12px"}}
          className="link backgroundForText ellipsisTruncation"
        >
        </p>{' '}
      </li>
      <li className="game game-spacer">&nbsp;</li>
      <li style={{display: "flex", width: "275px", height: "100px"}} className={bottomClass2}>
        <p
          style={{fontSize: "12px"}}
          className="link backgroundForText ellipsisTruncation"
        >
        </p>{' '}
      </li>
    </span>
    </>
  );
}

export default EmptyBracketCell;
