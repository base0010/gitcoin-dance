import React, {useEffect} from 'react'


const HARDHAT_NETWORK_ID = 5;

interface Props {};

export const ConnectWallet:React.FC<Props> = () =>{

    useEffect(()=>{
        let selectedAddress: any[] = [];

        const connect = async()=>{
            selectedAddress = await window.ethereum.enable()
            if(window.ethereum.networkVersion === HARDHAT_NETWORK_ID) return true
        }
        connect().then(()=>{return});
    },[])
    return(
        <div></div>
    )
}
