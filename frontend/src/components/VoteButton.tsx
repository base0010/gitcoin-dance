import {ERC721MintableContext, SymfoniContext, ProviderContext} from "../hardhat/SymfoniContext";
import React, {useContext,useEffect} from 'react'

interface Props {};
export const VoteButton: React.FC<Props> = () => {
    //change
    const [provider, setProvider] = useContext(ProviderContext);

    const vote = useContext(ERC721MintableContext);


    useEffect(()=>{
        const connToMatic = async()=>{
            const network = await provider?.getNetwork()
            if (network?.chainId != 137) {
                //toastify needs matic
            }
        }
        connToMatic();
    },[])

    function handleVote(votes:number){
        if(vote.instance){
            //
        }
    }

    return(
        <div>
            <button onClick={(e)=>{return 1;}}/>
        </div>
    )
}