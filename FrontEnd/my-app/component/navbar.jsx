import React from 'react';
import Image from 'next/image'

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function() {

    return (
        <div>
            <nav className="flex justify-between py-2">

                <div className="flex gap-2 items-center">
                    <div className="relative h-10 w-10">
                        <Image src="/logo.png" layout='fill'/>
                    </div>

                    <span className="font-semibold text-white text-2xl">PolyGlot</span>
                </div>

                <ConnectButton chainStatus="icon" showBalance={false} />
            </nav>
        </div>
    )
}


