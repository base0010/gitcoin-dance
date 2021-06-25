/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Timer from './Timer';
import { EmptyBracketCell } from './EmptyBracketCell';

export function InactiveRound(props: any) {
  const { gameData, header } = props;
  return (
    <>
      <span className="spaceBetween">
        <h5 className="polarisText">{header}</h5>
        <Timer />
      </span>
      {/* <hr></hr> */}
      {gameData.map((n: any, i: number) => {
        if (i % 2 !== 0) {
          return <EmptyBracketCell key={i} />;
        }
        return <></>;
      })}
    </>
  );
}

export default InactiveRound;
