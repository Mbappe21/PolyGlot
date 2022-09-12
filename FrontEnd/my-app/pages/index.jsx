import * as Io from "react-icons/io5";


export default function Home() {

  return (
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
    // </MainLayout>
  )
}