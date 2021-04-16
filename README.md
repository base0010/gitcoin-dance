# Hardhat React + Integration for Gitcoin Dance NFT 
1. Clone the repo and cd into it
2. Install deps with yarn `yarn` or npm `npm install`
3. Start hardhat `npx hardhat node --watch`

![](https://media.giphy.com/media/9l6z9MzXfHX9gKzbvU/giphy.gif)

```text
It runs up a Hardhat node, compile contracts, generates typescript interfaces, creates React context and instantiates your contract instances and factories with frontend provider.
```

4. Open up a new terminal
5. Enter the frontend directory: `cd frontend`
6. Install dependencies: `npm install`
   
7. Import seed phrase in Metamask. The default mnemonic currently used by hardhat is `test test test test test test test test test test test junk`
  1. Please note that you need to sign out from your current Metamask wallet to import a new one. **Instead of logging out**, you can use a new browser profile to do your Ethereum development:
  3. Click your profile icon in the top right corner of Chrome (right next to the hamburger menu icon)
  4. Click "Add"
  5. Give the profile a name and click "Add"
  6. In this new browser window, install Metamask and import the keyphrase above
8. Ensure Metamask RPC is set to `http://localhost:8545` and chainID `31337`.
9. Start the React app: `npm start`

The frontend should open at http://localhost:3000/

Interacting with NFT DANCE Contracts:
1. Get the IPFS hash of an image and place it in the [Mint NFT]
2. Wait for tx to confirm (you'll see notification from the UI/MM)
3. Query the NFT ID number [Query NFT] if it was your first one then query `1` (it will be higher if you run test cases first or had more mints for example)

### Running Automated Tests:
1. go to the root project directory
2. Run `npx hardhat compile && npx hardhat test`

### Troubleshooting:
Ensure you are useing RPC to http://localhost:8545.
You may also need to set the chainID to 31337 if you are useing Hardhat blockchain development node.
