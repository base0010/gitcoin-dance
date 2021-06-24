import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';

const networkId = 5;

interface Props {}

const CloseIcon = () => <div className="imgBorder marginTen xButton">X</div>;
export const ConnectWallet: React.FC<Props> = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [connectedAccount, setConnectedAccount] = useState(undefined);

  const getAccounts = async () => {
    setConnectedAccount(
      await window.ethereum.request({ method: 'eth_requestAccounts' }),
    );
    console.log(`Connected Account ${connectedAccount}`);
  };
  useEffect(() => {
    const selectedAddress: any[] = [];
    getAccounts();
  }, []);
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
      // title={activeNft.name}
      onCancel={() => {
        setModalOpen(false);
      }}
      footer={null}
    >
      <span className="modalContainer">
        <span
          className="darkCard paddingForty"
          style={{ position: 'relative' }}
        >
          <Button
            onClick={async () => {
              await getAccounts();
            }}
            type="ghost"
            size="large"
            className="imgBorder2"
          >
            Connect To MM
          </Button>
        </span>
      </span>
      <h3
        className="tealText ellipsisTruncation cardTitleModal"
        style={{ width: '33%' }}
      >
        Connected Account:
        {connectedAccount}
      </h3>
    </Modal>
  );
};
