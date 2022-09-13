import Head from 'next/head'
import Image from 'next/image'
import * as Io from "react-icons/io5";
import { ethers } from "ethers";
import dynamic from 'next/dynamic';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Nav from '../component/nav';

const provider = new WalletConnectProvider({
  infuraId: 'INFURA_ID',
});


export default function Home() {
  const handleConnect = async(e) => {
    e.preventDefault();


    const ethersProvider = new ethers.providers.Web3Provider(provider);
    await provider.enable();
    provider.on('accountsChanged', (accounts) => {
      // you can access the accounts here
    console.log(accounts);
    });
    
    provider.on('disconnect', (code, reason) => {
    //fired when disconnecting WalletConnect
    console.log(code, reason);
    });

  }


  return (
    <div>

      <div className="relative w-screen h-screen bg-gradient-to-tl from-gray-400 to-blue-800  overflow-hidden">

          <div className='absolute -right-[1200px] bottom-0 top-1/3 w-[3000px] h-[3000px] bg-blue-900 rounded-full
          filter blur-md bg-opacity-90' >
          </div>

          <div className="absolute inset-0 bg-transparent px-11 p-4 text-white">
              {/* <nav className=" flex justify-between py-2">
                <div className="flex gap-2 items-center">
                    <div className="relative h-10 w-10">
                        <Image src="/logo.png" layout='fill' />
                    </div>

                    <span className="font-semibold text-white text-2xl">PolyGlot</span>
                </div>

                <button className="drop-shadow-xl shadow-black font-semibold p-0.5 px-5 rounded-lg  bg-blue-500
                hover:bg-blue-600"
                onClick={(e) => handleConnect(e)}>Connect Wallet</button>
              </nav> */}
              <Nav/>


              <div className="flex  h-full py-10   justify-center">
                  <div className="flex flex-col gap-10 w-[512px] pt-12 ">

                    <h3 className="text-5xl font-semibold shrink">The web3 universe for anyone around the word</h3>

                    <div><button className="drop-shadow-xl shadow-black font-semibold p-1 px-5 rounded-lg  bg-amber-600
                    hover:bg-amber-500 "> Start Experience </button>
                    </div>

                  </div>

                  <div className="flex flex-col items-center ">
                      <div className="w-48 h-48 bg-blue-200 bg-opacity-30 filter rotate-45 rounded-3xl drop-shadow-lg 
                      "> 
                        <div className="-rotate-45 flex flex-col items-center  gap-6 ">
                          <Io.IoLayers  className="text-6xl"/>
                          <p className="text-lg flex flex-col  items-center mx-5 leading-5">
                            <span>Explore</span>
                            <span>Documentations</span>
                          </p>
                          <p className="text-3xl font-semibold">02</p>
                        </div>
                      </div>

                      <div className="flex gap-x-32 ">
                        <div className="w-48 h-48 bg-blue-200 bg-opacity-30 filter rotate-45 rounded-3xl shadow-lg 
                        ">
                          <div className="-rotate-45 flex flex-col items-center  gap-6 ">
                            <Io.IoCreateOutline  className="text-6xl font-semibold"/>
                            <p className="text-lg flex flex-col  items-center mx-5 leading-5">
                              <span>Ask for</span>
                              <span>Translation</span>
                            </p>
                            <p className="text-3xl font-semibold">01</p>
                          </div>
                        </div>

                        <div className="w-48 h-48 bg-blue-200 bg-opacity-30 filter rotate-45 rounded-3xl shadow-lg 
                         ">
                          <div className="-rotate-45 flex flex-col items-center  gap-6 ">
                            <Io.IoSwapHorizontal  className="text-6xl font-semibold"/>
                            <p className="text-lg flex flex-col  items-center mx-5 leading-5">
                              <span>Become a</span>
                              <span>Translator</span>
                            </p>
                            <p className="text-3xl font-semibold">03</p>
                          </div>
                         </div>
                      </div>
                  </div>
              </div>
          </div>
        
      </div>
      
    </div>
  )
}
