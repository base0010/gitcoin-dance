import React from 'react';
import { Symfoni } from "./hardhat/SymfoniContext";
import { NFT } from './components/NFT';
import {Route, Switch} from 'react-router-dom'
import {Home} from './components/Home'
import {VoteButton} from './components/VoteButton'
import {ZKSyncTest} from "./components/ZKSyncTest";
import {ConnectWallet} from "./components/ConnectWallet";


function App() {

  return (
    <div className="App">
      <header className="App-header">
      </header>
        <Symfoni autoInit={true} >
          <Switch>
              / <Route exact path="/"  component={Home} />
              / <Route exact path="/nft" component={NFT}  />
              / <Route exact path="/vote" component={VoteButton} />
              / <Route exact path="/zk" component={ZKSyncTest} />
              / <Route exact path="/connect" component={ConnectWallet} />
          </Switch>
        </Symfoni>
    </div>
  );
}

export default App;
