import * as zksync from "zksync";
import * as ethers from 'ethers'

import React, { ChangeEvent, createRef, useContext, useEffect, useState} from "react";
import {Button} from "antd";
interface Props {};

const MNEMONIC:string =  "test test test test test test test test test test test junk";




export const ZKSyncTest: React.FC<Props> = () => {
    const [ethProvider, setEthProvider] = useState(undefined)
    const [zksyncProvider, setZksyncProvider] = useState(undefined);

    const [zWallet, setZWallet] = useState(undefined);

    const[depositReceipt, setDepositReciept] = useState(undefined);

    const[verifiedETHDeposit, setVerifiedETHDeposit] = useState("")
    const[committedETHDeposit, setComittedETHDeposit] = useState("")

    const setProviders = async function(){
        const zkprovider =  await zksync.getDefaultProvider("rinkeby");

        // const ethprovider = await ethers.getDefaultProvider("rinkeby");
        const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);

        const signer = provider.getSigner()
        const syncWallet = await zksync.Wallet.fromEthSigner(signer, zkprovider);

        //@ts-ignore
        setZWallet(syncWallet)

        // @ts-ignore
        setEthProvider(provider)
        // @ts-ignore

        setZksyncProvider(zkprovider)

    }
    const depositETHToL2 = async () => {
        if (zWallet){
            // @ts-ignore
        const deposit =  await zWallet.depositToSyncFromEthereum({
                //@ts-ignore
                depositTo: zWallet.address(),
                token: "DAI",
                amount: ethers.utils.parseEther("250"),
            })
            const depReceipt = await deposit.awaitReceipt();
            setDepositReciept(depReceipt)

            //some Cross Site nonsense waiting for verification maybe timeout?
            // const depositReceipt = await deposit.awaitVerifyReceipt();
            // console.log(depositReceipt)
        }
    }
    const zkBalance = async() =>{
        if(zWallet) {
            // @ts-ignore
            const committedETHBal = await zWallet.getBalance("DAI")

            setComittedETHDeposit(ethers.utils.formatEther(committedETHBal._hex))
            //@ts-ignore
            const verifiedETHBalance = await zWallet.getBalance("DAI", "verified");

            setVerifiedETHDeposit(ethers.utils.formatEther(verifiedETHBalance._hex));

        }
    }
    useEffect(()=>{
        setProviders()
        zkBalance()

    }, [])

    return(
        <div>
            {ethProvider ? (
                <div>
                <h4>
                ethProvider.provider.current
                </h4>
                <h3>
                Pending ZKSync Deposit:
                    {committedETHDeposit + " DAI"}
                </h3>
                <h3>
                Confirmed ZKSync Deposit:
                    {verifiedETHDeposit + " DAI"}
                </h3>
                </div>
            ) : (
                <h4>
                no provider
                </h4> )
            }

        <Button onClick={async ()=>{await depositETHToL2()}}>Deposit To L2</Button>
        <Button onClick={async ()=>{await zkBalance()}}>Refresh balances</Button>

        </div>
    )
}