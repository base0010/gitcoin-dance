import React from 'react';
import logo from './logo.svg';
// import './App.css';
import './main.scss'
import "./colors.scss"

import { Symfoni } from "./hardhat/SymfoniContext";
import { NFT } from './components/NFT';
import {Route, Switch} from 'react-router-dom'
import {Home} from './components/Home'

function App() {

  return (
    <div className="App">
      <header className="App-header">
      </header>
        <Symfoni autoInit={true} >
          <Switch>
              / <Route exact path="/"  component={Home} />
              / <Route exact path="/nft" component={NFT}  />
          </Switch>
        </Symfoni>


    </div>
  );
}

export default App;
