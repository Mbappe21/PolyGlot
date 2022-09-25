import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ActiveLink from './activeLink';
import { useAccount, useContract, useSigner } from 'wagmi';
import { useRouter } from 'next/router';

import { useUser } from '../hooks/useUser'
import { contractABI, ContractAddress } from '../datas/constDatas';
import { isNullAddr } from './../utils/functions'

const Navbar = () => {

  const { isConnected } = useAccount()
  const { logoutUser } = useUser()
  const [displayPart2, setDisplayPart2] = useState(false)

  const {data: signer} = useSigner()
  const { address } = useAccount()

  const contract = useContract({
    addressOrName: ContractAddress,
    contractInterface: contractABI,
    signerOrProvider: signer
  })

//   const [isTranslator, setIsTranslator] = useState({translator: false, validator: false, fetched: false})

//   if(!isTranslator.fetched){
//     contract.findTranslator(address)
//     .then(val => {
//       console.log("trad",val)
//         if(isNullAddr(val.translator)){
//             setIsTranslator({translator: false, validator: false, fetched: true})
//         } else {
//             setIsTranslator({translator: true, validator: val.validator, fetched: true})
//         }
//     }). catch (err => console.log(err))

//   }
  

  const router = useRouter()

    useEffect(() =>{
        if(!isConnected){
            logoutUser()
            router.push("/")
        }
        if (isConnected && router.pathname !== "/"){
            setDisplayPart2(true)
        }
    }
    , [isConnected])


    return (
        <div>
            <nav className=" flex justify-between py-2">
                <div className="flex gap-2 items-center">
                    <div className="relative h-10 w-10">
                        <Image src="/logo.png" layout='fill' />
                    </div>

                    <span className="font-semibold text-white text-2xl">PolyGlot</span>
                </div>
                <ConnectButton chainStatus="icon" showBalance={false} />
            </nav>
            { 
              (displayPart2) &&
              
            //   ( 
                <div className="flex justify-center my-2 text-black p-2 rounded-lg border bg-white">
                    <ul className="flex justify-center gap-2">
                        <li className="mx-4">
                            <ActiveLink href="/dashboard" name="Dashboard"/>
                        </li>
                        {
                            true
                            ?(
                                <li className="mx-4">
                                    <ActiveLink href="/requests/list" name="Clients requests"/>
                                </li>
                            ):''
                        }
                        <li className="mx-4">
                            <ActiveLink href="/dashboard/documentation" name="Documentation"/>
                        </li>
                        <li className="mx-4">
                            <ActiveLink href="/requests/translation" name="Request for translation"/>
                        </li>
                    </ul>                
                </div> 
            //   )
            }
        </div>
    );
}

export default Navbar;
