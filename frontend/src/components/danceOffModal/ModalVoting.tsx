/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Button } from 'antd';

export function ModalVoting(props: any) {
  const {
    voting,
    setVoting,
    selection,
    setZkDonation,
    voteForNft,
    activeNft,
    zkDonation,
  } = props;

  return (
    <>
      {voting !== selection && (
        <Button
          onClick={() => setVoting(selection)}
          type="ghost"
          size="large"
          className="imgBorder2"
        >
          SELECT
        </Button>
      )}
      {voting === selection && (
        <>
          <form>
            <label className="yellowText marginTen">
              Donation:
              <input
                placeholder="DAI"
                className="polarisText"
                style={{ margin: '0px 5px' }}
                type="number"
                name="zkDai"
                onChange={(e) => {
                  const val = e.target.value;
                  if (val !== '') {
                    setZkDonation(e.target.value);
                  }
                }}
              />
            </label>
          </form>
          <Button
            onClick={() => voteForNft(activeNft, zkDonation)}
            type="ghost"
            size="large"
            className="imgBorder2"
            style={{ margin: '5px' }}
          >
            VOTE
          </Button>
          <Button
            onClick={() => setVoting(null)}
            type="ghost"
            size="large"
            className="imgBorder2"
          >
            BACK
          </Button>
        </>
      )}
    </>
  );
}

export default ModalVoting;
