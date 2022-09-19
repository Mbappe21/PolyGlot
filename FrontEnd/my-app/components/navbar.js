import React from 'react';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ActiveLink from './activeLink';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';

const Navbar = () => {

  const { isConnected } = useAccount()
  const router = useRouter()

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
            { 
              (isConnected && router.pathname !== "/") &&
              ( 
                <div className="flex justify-center my-2 text-black p-2 rounded-lg border bg-white">
                    <ul className="flex justify-center gap-2">
                        <li className="mx-4">
                            <ActiveLink href="/dashboard" name="Dashboard"/>
                        </li>
                        <li className="mx-4">
                            <ActiveLink href="/requests/list" name="Clients requests"/>
                        </li>
                        <li className="mx-4">
                            <a href="">Documentation</a>
                        </li>
                        <li className="mx-4">
                            <ActiveLink href="/requests/translation" name="Request for translation"/>
                        </li>
                    </ul>                
                </div> 
              )
            }
        </div>
    );
}

export default Navbar;
