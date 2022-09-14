import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Io from "react-icons/io5";

import { ConnectButton } from '@rainbow-me/rainbowkit';


const Nav = () => {
    
    const handleConnect = async () => {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log(account)
    }

    return (
        <div>
            <nav className=" flex justify-between py-2">
                <div className="flex gap-2 items-center">
                    <div className="relative h-10 w-10">
                        <Image src="/logo.png" layout='fill' />
                    </div>

                    <span className="font-semibold text-white text-2xl">PolyGlot</span>
                </div>
                <ConnectButton/>
              </nav>
        </div>
    );
}

export default Nav;
