import React from 'react';

const classNames = require('classnames');


export function EmptyBracketCell(props : any) {
  const bottomClass2 = classNames({
    game: true,
    'game-bottom': true,
    'inactiveRound': true,
    ellipsisTruncation: true,
    paddingTwenty: true,
    display: "flex",
    bracketCard: true
  });
  const topClass2 = classNames({
    game: true,
    'game-top': true,
    'inactiveRound': true,
    ellipsisTruncation: true,
    paddingTwenty: true,
    bracketCard: true
  });
  
  return (
    <>
    {/* <li className="spacer">&nbsp;</li> */}
    <span style={{margin: "auto"}}>       
      <li className={topClass2}>
        <p
        style={{fontSize: "12px"}}
          className="link backgroundForText ellipsisTruncation"
        >
        </p>{' '}
      </li>
      <li className="game game-spacer">&nbsp;</li>
      <li className={bottomClass2}>
        <p
          style={{fontSize: "12px"}}
          className="link backgroundForText ellipsisTruncation"
        >
        </p>{' '}
      </li>
    </span>
    {/* <li className="spacer"></li> */}
    </>
  );
}

export default EmptyBracketCell;
