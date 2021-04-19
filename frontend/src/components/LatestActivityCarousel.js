import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import nfts from '../assets';

const contentStyle = {
  //   height: '160px',
  color: '#fff',
  //   lineHeight: '160px',
  textAlign: 'center',
  background: '#15003e',
  maxWidth: '1000px',
  display: 'inline-block',
};

export function LatestActivityCarousel(props) {
  const { gameData } = props;

  return (
    <div className="paddingTwenty flexCenter">
      <Carousel
        slidesToShow={4}
        arrows
        infinite={false}
        style={contentStyle}
        autoplay
      >
        {gameData.map((n, i) => {
          const nft = nfts.find((nf) => nf.id === n.gifId);
          return (
            <div>
              <h3 style={{ color: 'white', textAlign: 'center' }}>{i}</h3>
              <img
                style={{ textAlign: 'center' }}
                height="200px"
                width="200px"
                src={nft.src}
                alt={nft.description}
              />
              <h3
                style={{ color: 'white', padding: '45px', textAlign: 'center' }}
              >
                {nft.description}
              </h3>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default LatestActivityCarousel;
