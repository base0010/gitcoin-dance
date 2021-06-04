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
    <div className="paddingForty purp-teal">
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
              <div className="dark-card paddingForty">
                {/* <h3 style={{ color: 'white', textAlign: 'center' }}>{i}</h3> */}
                <span className="ellipsisTruncation" style={{display: "flex"}}>
                <hr style={{width: "20%"}}></hr>
                <h3
                  title={nft.description}
                  className="tealText ellipsisTruncation"
                  style={{ textAlign: 'center', fontSize: "16px", width: "300px" }}
                >
                  {nft.description}
                </h3>
                <hr style={{width: "20%"}}></hr>
                </span>
                <h4 className="underscoreDance" style={{right: i * 252 + 100, top: 50, position: "absolute"}}>_dance</h4>
                <div className="imgBorder" style={{  
                  backgroundImage: `url(${nft.src})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
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
