import '../styles/globals.css'
import Head from 'next/head';
import Navbar from '../component/navbar';

// third parti
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'Polyglot',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} >
        <div>
          <Head>
            <title>Polyglot</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <div className="relative w-screen h-screen bg-[url('/background.jpg')] bg-cover bg-no-repeat overflow-hidden">
              <div className="absolute inset-0 bg-transparent px-11 p-4 text-white">
                  <Navbar/>
                  <main className="flex h-full py-10 justify-center">
                        <Component {...pageProps} />
                  </main>
              </div>
          </div>
          
        </div>
    
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}

export default MyApp
