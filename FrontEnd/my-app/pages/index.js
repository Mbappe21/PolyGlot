import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import MainLayout from '../components/mainLayout'
import StartBtn from '../components/StartBtn'
import { useUser } from '../hooks/useUser'

export default function Home() {

  const { isConnected } = useAccount()
  const router = useRouter()
  const { user } = useUser()

  useEffect(() =>{
    if(isConnected){
      if(user?.isLoggedIn !== false){
        router.push("/dashboard")
      } else {
        router.push("/api/login")
      }
    }
  }, [isConnected, user?.isLoggedIn])

  return ( 
    <div>
      <main>
        <div className="relative w-screen h-screen bg-gradient-to-tl from-gray-400 to-blue-800  overflow-hidden">
          <div className='absolute -right-[1200px] bottom-0 top-1/3 w-[3000px] h-[3000px] bg-blue-900 rounded-full
          filter blur-md bg-opacity-90' >
          </div>

          <div className="absolute inset-0 bg-transparent px-11 p-4 text-white">
              <MainLayout>
                <div className="flex  h-full py-10   justify-center">
                    <div className="flex flex-col gap-10 w-[512px] pt-12 ">

                      <h3 className="text-5xl font-semibold shrink">The web3 universe for anyone around the word</h3>

                      <div>
                        <StartBtn/>
                      </div>

                    </div>

                    <div className="flex flex-col items-center ">
                        <div className="w-48 h-48 bg-blue-200 bg-opacity-30 filter rotate-45 rounded-3xl drop-shadow-lg 
                        "> 
                          <div className="-rotate-45 flex flex-col items-center  gap-6 ">
                            {/* <Io.IoLayers  className="text-6xl"/> */}
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
                              {/* <Io.IoCreateOutline  className="text-6xl font-semibold"/> */}
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
                              {/* <Io.IoSwapHorizontal  className="text-6xl font-semibold"/> */}
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
              </MainLayout>
          </div>
        </div>
      </main>
    </div>
  )
}
