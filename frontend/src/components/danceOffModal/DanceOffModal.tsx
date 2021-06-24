/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { Modal, Spin } from 'antd';
import danceOff from '../../assets/gitcoin/danceOff.svg';
import ModalCard from './ModalCard';
import ModalVoting from './ModalVoting';

export function DanceOffModal(props: any) {
  const CloseIcon = () => <div className="imgBorder marginTen xButton">X</div>;
  const {
    modalOpen,
    setActiveNft,
    setModalOpen,
    apiCall,
    activeNft,
    voting,
    setVoting,
    setZkDonation,
    voteForNft,
    zkDonation,
  } = props;
  return (
    <Modal
      centered
      width={1200}
      bodyStyle={{
        background:
          'radial-gradient(93.24% 93.24% at 50% 41.32%, #613dda 13.88%, #6f3ff5 41.01%, #05f5bc 88.02%)',
        minHeight: '600px',
      }}
      visible={modalOpen}
      closeIcon={<CloseIcon />}
      onCancel={() => {
        setActiveNft(null);
        setModalOpen(false);
      }}
      footer={null}
    >
      <span className="modalContainer">
        {apiCall && (
          <Spin
            spinning={apiCall}
            style={{ position: 'absolute', top: '50%' }}
          />
        )}
        {!apiCall && (
          <>
            <ModalCard activeNft={activeNft[0]} />
            <img
              style={{ alignSelf: 'center', margin: '40px' }}
              src={danceOff}
              alt="Dance Off"
              width="270px"
              height="160px"
            />
            <ModalCard activeNft={activeNft[1]} />
          </>
        )}
      </span>
      {!apiCall && (
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
      )}
    </Modal>
  );
}

export default DanceOffModal;
