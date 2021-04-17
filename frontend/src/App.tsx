import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Symfoni } from "./hardhat/SymfoniContext";
import { NFT } from './components/NFT';


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Symfoni autoInit={true} >

          <NFT></NFT>
        </Symfoni>
      </header>
    </div>
  );
}

export default App;
