/* eslint-disable global-require */
export interface ActiveNFT {
  id: string | null;
  src: string | undefined;
  description: string | undefined;
  name?: string | null;
  nftId?: number | null;
}

export const nfts: ActiveNFT[] = [
  {
    id: 'b304b757-30cf-4c16-a04b-8ad9ca369fd7',
    src: require('./nfts/combonus.mp4'),
    description: 'alex',
  },
  {
    id: '674448bf-4cbe-46cc-9fa0-98b87710f831',
    src: require('./nfts/Chibie_scaled.mp4'),
    description: 'chibie',
  },
  {
    id: 'e4288011-8a4f-494b-a4e0-b7442b3329fa',
    src: require('./nfts/Owocki_scaled.mp4'),
    description: 'owocki',
  },
  {
    id: '8c713f8a-79e4-49de-9ac9-f3e1a7868e68',
    src: require('./nfts/Connor.mp4'),
    description: 'connor',
  },
  {
    id: 'c50218a4-5c60-4af6-bd55-3268fac273c6',
    src: require('./nfts/sam.mp4'),
    description: 'sam',
  },
  {
    id: '32b7496c-c655-475f-b218-7060bcdf3178',
    src: require('./nfts/dylan.mp4'),
    description: 'dylan',
  },
  {
    id: 'a141de63-09f1-40bd-914d-8f8447e75475',
    src: require('./nfts/disruptionJoe_scaled.mp4'),
    description: 'disruptionJoe',
  },
  {
    id: 'd07fc3f8-2876-46d6-abb1-2da1a2f71f39',
    src: require('./nfts/zackDuck_scaled.mp4'),
    description: 'zackDuck',
  },
  {
    id: '155cf4fb-3e7b-4f86-9669-32fecd135ceb',
    src: require('./nfts/lilKyle.mp4'),
    description: 'lilKyle',
  },
  {
    id: '7eebd81d-5532-4a72-8659-313bba56bd43',
    src: require('./nfts/Fred2_scaled.mp4'),
    description: 'fred2',
  },
  {
    id: 'b5117532-bcd1-483a-874f-1dc78d2ad8c1',
    src: require('./nfts/Fred1_scaled.mp4'),
    description: 'fred1',
  },
  {
    id: 'eec986f1-b6ea-4aa7-b315-5c02ff86f4de',
    src: require('./nfts/bigKyle.mp4'),
    description: 'bigKyle',
  },
  {
    id: 'cc74cbe2-1fac-4eb5-892b-f95515e02003',
    src: require('./nfts/uzi.mp4'),
    description: 'uzi',
  },
  {
    id: '21eb5c06-257a-4cf7-9006-32d0c2c4ca27',
    src: require('./nfts/james.mp4'),
    description: 'james',
  },
  {
    id: 'a8878574-fd73-44c5-a1a7-cda2c345045a',
    src: require('./nfts/lebowski.mp4'),
    description: 'lebowski',
  },
  {
    id: '61dc671e-9cdf-46da-81d7-255724b71eb7',
    src: require('./nfts/joker.mp4'),
    description: 'joker',
  },
];
