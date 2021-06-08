import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import {nfts} from '../assets';

const contentStyle : any = {
  color: '#fff',
  textAlign: 'center',
  maxHeight: "277px"
};

export function LatestActivityCarousel(props : any) {
  const { gameData } = props;

  return (
    <div className="paddingForty purpTeal">
      <Carousel
        slidesToShow={5}
        // arrows
        infinite={false}
        style={contentStyle}
        autoplay
        dots={false}
        adaptiveHeight
      >
        {gameData.map((n : any, i : any) => {
          const nft = nfts.find((nf) => nf.id === n.gifId);
          if(nft) {
            return (
              <div className="darkCard paddingForty">
                {/* <h3 style={{ color: 'white', textAlign: 'center' }}>{i}</h3> */}
                <span className="ellipsisTruncation textOverlay" style={{display: "flex", position: "relative"}}>
                {/* <hr style={{width: "20%", float: "right"}}></hr> */}
                <span></span>
                <h3
                  title={nft.description}
                  className="tealText ellipsisTruncation cardTitle"
                >
                  {nft.description}
                </h3>
                {/* <hr style={{width: "20%", float: "right"}}></hr> */}
                <h4 className="underscoreDanceText" style={{right: "25%", top: "25%", position: "absolute"}}>_dance</h4>
                </span>
                <div className="imgBorder imageInCard" style={{  
                  backgroundImage: `url(${nft.src})`,
                  minHeight: "100px"
                }}></div>
                <p style={{textAlign: "end"}} className="yellowText marginTen">{n.userAddress}</p>
              </div>
            );
          }
        })}
      </Carousel>
    </div>
  );
}

export default LatestActivityCarousel;
