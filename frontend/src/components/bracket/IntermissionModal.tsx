/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Modal } from 'antd';
import gitcoinIcon from '../../assets/gitcoin/gitcoinIcon.png';

export function IntermissionModal(props: any) {
  // const CloseIcon = () => <div className="imgBorder marginTen xButton">X</div>;
  const [intermissionModal, setIntermissionModal] = useState<any>(true);
  const { round } = props;
  return (
    <Modal
      centered
      width={600}
      bodyStyle={{
        background:
          'radial-gradient(93.24% 93.24% at 50% 41.32%, #613dda 13.88%, #6f3ff5 41.01%, #05f5bc 88.02%)',
        minHeight: '300px',
      }}
      visible={intermissionModal}
      // closeIcon={<CloseIcon />}
      onCancel={() => {
        setIntermissionModal(false);
      }}
      footer={null}
    >
      <span>
        <div />
        <div style={{ display: 'flex' }}>
          <img
            style={{ margin: 'auto' }}
            src={gitcoinIcon}
            alt="gitcoin icon"
            width="200"
            height="200"
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          PLEASE WAIT, WE ARE DETERMINING THE WINNERS OF ROUND {round - 1}
        </div>
      </span>
      {/* {!apiCall && (
        <>
          <div
            style={{
              textAlign: 'center',
              display: 'inline-block',
              width: '425px',
            }}
          >
            <ModalVoting
              voting={voting}
              setZkDonation={setZkDonation}
              voteForNft={voteForNft}
              selection={0}
              zkDonation={zkDonation}
              setVoting={setVoting}
              activeNft={activeNft[0]}
            />
          </div>
          <div
            style={{
              width: voting ? '650px' : '615px',
              textAlign: 'end',
              display: 'inline-block',
            }}
          >
            <ModalVoting
              voting={voting}
              setZkDonation={setZkDonation}
              voteForNft={voteForNft}
              selection={1}
              zkDonation={zkDonation}
              setVoting={setVoting}
              activeNft={activeNft[1]}
            />
          </div>
        </>
      )} */}
    </Modal>
  );
}

export default IntermissionModal;
