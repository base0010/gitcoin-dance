import React from 'react';
import logo from './logo.svg';
// import './App.css';
import './main.scss'
import "./colors.scss"

import { Symfoni } from "./hardhat/SymfoniContext";
import { NFT } from './components/NFT';
import {Route, Switch} from 'react-router-dom'
import {Home} from './components/Home'
import {VoteButton} from './components/VoteButton'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Symfoni autoInit={true} >

          <Switch>
              / <Route exact path="/"  component={Home} />
              / <Route exact path="/nft" component={NFT}  />
              / <Route exact path="/vote" component={VoteButton} />
          </Switch>
        </Symfoni>
      </header>

    </div>
  );
}

export default App;
