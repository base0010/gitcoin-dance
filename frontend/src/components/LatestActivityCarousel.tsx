/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import { nfts } from '../assets';

const contentStyle: any = {
  color: '#fff',
  textAlign: 'center',
  maxHeight: '277px',
};

export function LatestActivityCarousel(props: any) {
  const { gameData } = props;

  return (
    <div className="paddingForty purpTeal" style={{ minHeight: '414px' }}>
      <h1 className="yellowText">RECENT VOTES</h1>
      <Carousel
        slidesToShow={5}
        // arrows
        infinite={false}
        style={contentStyle}
        autoplay
        dots={false}
        adaptiveHeight
      >
        {gameData.map((n: any) => {
          const nft = nfts.find((nf) => nf.id === n.gifId);
          if (nft) {
            return (
              <div className="darkCard paddingTwenty">
                {/* <h3 style={{ color: 'white', textAlign: 'center' }}>{i}</h3> */}
                <span
                  className="ellipsisTruncation textOverlay"
                  style={{ display: 'flex', position: 'relative' }}
                >
                  {/* <hr style={{width: "20%", float: "right"}}></hr> */}
                  <span />
                  <h3
                    title={nft.description}
                    className="tealText ellipsisTruncation cardTitle"
                  >
                    {nft.description}
                  </h3>
                  {/* <hr style={{width: "20%", float: "right"}}></hr> */}
                  <h4
                    className="underscoreDanceText"
                    style={{ right: '35%', top: '25%', position: 'absolute' }}
                  >
                    _dance
                  </h4>
                </span>
                <video
                  className="imgBorder imageInCard"
                  // height="120"
                  width="100"
                  autoPlay
                  muted
                  loop
                >
                  <source src={nft.src} type="video/mp4" />
                </video>
                <p
                  style={{ textAlign: 'end' }}
                  className="yellowText marginTen"
                >
                  {n.userAddress}
                </p>
              </div>
            );
          }
          return <span />;
        })}
      </Carousel>
    </div>
  );
}

export default LatestActivityCarousel;
