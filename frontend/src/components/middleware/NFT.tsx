import React, {
  ChangeEvent,
  createRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ERC721MintableContext } from '../../hardhat/SymfoniContext';

interface Props {}

export const NFT: React.FC<Props> = () => {
  const nft = useContext(ERC721MintableContext);

  // todo: statenames are kinda janky redux or some complex state store needed
  const [nftInfo, getNftInfo] = useState('');
  const [uri, setUri] = useState('http://placehold.jp/300x300.png');
  const [nftMintInfo, setNftMintInfo] = useState('');

  const checkContractInstantiated = async () => {
    // nft.instance? true: false
    if (!nft.instance) {
      console.log('NO NFT instance');
      throw Error('NFT Contract not Instaniated');
    }
    console.log('NFT Instance Deployed@ ', nft.instance.address);
    return true;
  };

  useEffect(() => {
    const doAsync = async () => {
      // get default nft at id 1
      if (nft.instance) {
        getNftInfo(await nft.instance.tokenURI(1));
      }
    };
  });

  const handleGetNftInfo = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (nft.instance) {
      const hash = await nft.instance.tokenURI(nftInfo);

      if (hash) {
        const uri = `https://ipfs.io/ipfs/${hash}`;
        setUri(uri);
      }
    }
  };
  // just mints to silly value
  const handleNftMint = async (hash: string) => {
    if (nft.instance) {
      // mint an nft to deadbeef's address
      const tx = await nft.instance.mint(
        '0xdeadbeef00000000000000000000000000000000',
        hash,
      );
      console.log(tx);
    }
  };
  function getIPFSImg(): string {
    // todo: check base58
    if (uri) return `https://ipfs.io/ipfs/${uri}`;
    return `https://dummyimage.com/250/ffffff/000000`;
  }
  return (
    <div>
      <h4>Mint NFT</h4>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNftMintInfo(e.target.value)
        }
      />
      <button onClick={(e) => handleNftMint(nftMintInfo)}>Mint NFT</button>

      <h4>Get NFT Info</h4>
      <h6> NFT ipfs Hash: {uri}</h6>
      <p>Query NFT ID:</p>
      <input onChange={(e) => getNftInfo(e.target.value)} />
      <button onClick={(e) => handleGetNftInfo(e)}>Query NFT</button>
      <img src={uri} />
    </div>
  );
};
