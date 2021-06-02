import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import {nfts} from '../assets';

const contentStyle : any = {
  //   height: '160px',
  color: '#fff',
  //   lineHeight: '160px',
  textAlign: 'center',
  // background: '#15003e',
  maxWidth: '1500px',
  display: 'inline-block',
};

export function LatestActivityCarousel(props : any) {
  const { gameData } = props;

  return (
    <div className="flexCenter paddingTwenty purp-teal">
      <Carousel
        slidesToShow={5}
        arrows
        infinite={false}
        style={contentStyle}
        autoplay
        dots
      >
        {gameData.map((n : any, i : any) => {
          const nft = nfts.find((nf) => nf.id === n.gifId);
          if(nft) {
            return (
              <div className="dark-card paddingTwenty">
                {/* <h3 style={{ color: 'white', textAlign: 'center' }}>{i}</h3> */}
                <div className="imgBorder" style={{  
                  backgroundImage: `url(${nft.src})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  minHeight: "200px"
                }}></div>
                {/* <img
                  style={{ textAlign: 'center', display: "inline", 
                  }}
                  className="imgBorder"
                  height="200px"
                  width="200px"
                  src={nft.src || ""}
                  alt={nft.description || ""}
                /> */}
                <h3
                  style={{ color: 'white',textAlign: 'center' }}
                >
                  {nft.description}
                </h3>
              </div>
            );
          }
        })}
      </Carousel>
    </div>
  );
}

export default LatestActivityCarousel;
