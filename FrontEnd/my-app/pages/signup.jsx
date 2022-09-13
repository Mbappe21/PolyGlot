import Head from 'next/head'
import Image from 'next/image'
import * as Io from "react-icons/io5";
import Nav from '../component/nav';


export default function Home() {
  return (
    <div>
      

      <div className="relative w-screen h-screen bg-gradient-to-tl from-gray-400 to-blue-800  overflow-hidden">

          <div className='absolute -right-[1200px] bottom-0 top-1/3 w-[3000px] h-[3000px] bg-blue-900 rounded-full
          filter blur-md bg-opacity-90' >
          </div>

          <div className="absolute inset-0 bg-transparent px-11 p-4 text-white">
              <Nav />


              <div className="flex  h-full py-10  justify-center ">
                  <form className="w-[512px] h-96 p-8 bg-slate-50 bg-opacity-20 flex flex-col items-center gap-6 rounded-xl ">
                    <h3 className="font-medium text-2xl pb-5">Setting up your account</h3>

                    <div className="flex flex-col w-72 font-medium gap-2">
                        <label htmlFor="">Account type</label>
                        <select name="" id="" className="py-2 px-4 text-black rounded-md">
                            <option value="">Member</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-72 font-medium gap-2">
                        <label htmlFor="">Select language</label>
                        <select name="" id="" className="py-2 px-4 text-black rounded-md">
                            <option value="" >English</option>
                            <option value="" >Frensh</option>
                        </select>
                    </div>

                    <div>
                        <button className="py-1 px-10 bg-blue-500 hover:bg-blue-600 rounded-md font-medium">Validate</button>
                    </div>
                  </form>
              </div>
          </div>
        
      </div>
      
    </div>
  )
}