import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  ERC721MintableContext,
  SymfoniContext,
  ProviderContext,
} from '../../hardhat/SymfoniContext';

interface Props {}
const OnMumbai = () => (
  <div>
    <a>Connected to Matic</a> !
  </div>
);
const NotOnMumbai = () => (
  <div>
    <a>Please Connect to Matic (info)</a>
  </div>
);
export const VoteButton: React.FC<Props> = () => {
  // change
  const vote = useContext(ERC721MintableContext);
  const [provider, setProvider] = useContext(ProviderContext);

  useEffect(() => {
    const getChain = async () => {
      const net = await provider?.getNetwork();
      const chainId = net?.chainId;
      if (chainId === 137) {
        toast(OnMumbai);
        console.log('connected to MATIC');
      } else {
        toast(NotOnMumbai);
        console.log('Need to Connect to matic');
      }
    };
    getChain();
  }, []);

  function handleVote(votes: number) {
    if (vote.instance) {
      //
    }
  }

  return (
    <div>
      <button
        onClick={(e) => {
          console.log(provider);
        }}
      />
    </div>
  );
};
