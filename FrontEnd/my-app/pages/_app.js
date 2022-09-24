import '../styles/globals.css'
import Head from 'next/head';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  useAccount,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { useRouter } from "next/router";
import { RoleProvider } from '../contexts/role';

const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai, chain.mainnet, chain.goerli, chain.rinkeby],
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
    
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Head>
          <title>Polyglot</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <RoleProvider>
          <Component {...pageProps} />
        </RoleProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
