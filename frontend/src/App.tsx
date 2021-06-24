/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Symfoni } from './hardhat/SymfoniContext';
import { NFT } from './components/middleware/NFT';
import { Home } from './components/Home';
import { VoteButton } from './components/middleware/VoteButton';
import ZKSyncTest from './components/middleware/ZKSyncTest';
import { ConnectWallet } from './components/middleware/ConnectWallet';

function App() {
  return (
    <div className="App">
      <header className="App-header" />
      <Symfoni autoInit>
        <Switch>
          / <Route exact path="/" component={Home} />
          / <Route exact path="/nft" component={NFT} />
          / <Route exact path="/vote" component={VoteButton} />
          / <Route exact path="/zk" component={ZKSyncTest} />
          / <Route exact path="/connect" component={ConnectWallet} />
        </Switch>
      </Symfoni>
    </div>
  );
}

export default App;
