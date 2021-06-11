# Gitcoin Dance 
This repo contains everything to create Gitcoin Dance based on hardhat-react boilerplate

IE. This contains solidity smart contracts, tests for said contracts, and a react-based frontend using the hardhat framework.

**Install/Usage:**      
(all commands assume run from repo root)

To install:      
```npm i && cd frontend && npm i && cd ../```

To run the frontend (needs Metamask browser extension):  

   -Build the HH Symfoni React Context and Typechain types:    
   ```npx hardhat compile && npx hardhat react```

   -Start the Dev Webserver:  
   ```cd frontend && npm run start```

To run smart contract tests(on instant ephemeral local chain):

```npx hardhat test```

To run setup/deployment scripts (for live chains):

```npx hardhat --network rinkeby run scripts/mint_nft.ts```