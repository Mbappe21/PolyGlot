import React from 'react';
import Image from 'next/image'
import * as Io from "react-icons/io5";

const Nav = () => {
    return (
        <div>
            <nav className=" flex justify-between py-2">
                <div className="flex gap-2 items-center">
                    <div className="relative h-10 w-10">
                        <Image src="/logo.png" layout='fill' />
                    </div>

                    <span className="font-semibold text-white text-2xl">PolyGlot</span>
                </div>

                <div>
                    <div className="text-black p-1 px-2 flex items-center gap-2 rounded-lg shadow-lg bg-slate-50">
                        <Io.IoPersonCircleOutline  className="text-black text-3xl"/>
                        <p>0x123456</p>

                        <Io.IoChevronDown className="font-medium text-2xl" />
                    </div>
                </div>
              </nav>
        </div>
    );
}

export default Nav;
