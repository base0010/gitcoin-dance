import {ERC721MintableContext, SymfoniContext, ProviderContext} from "./../hardhat/SymfoniContext";
import React, {useContext,useEffect} from 'react'

interface Props {};
export const VoteButton: React.FC<Props> = () => {
    //change
    const vote = useContext(ERC721MintableContext);
    const [provider, setProvider] = useContext(ProviderContext);

    useEffect(()=>{

        const getChain = async()=>{
            const net = await provider?.getNetwork();
            const chainId = net?.chainId;
            if(chainId === 137){
                console.log("connected to MATIC")
            }
            else{console.log("Need to Connect to matic")}
        }
        getChain();

    },[])

    function handleVote(votes:number){
        if(vote.instance){
            //
        }
    }

    return(
        <div>
            <button onClick={(e)=>{console.log(provider);}}/>
        </div>
    )
}