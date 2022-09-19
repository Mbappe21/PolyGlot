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

const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai, chain.mainnet],
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



const Main = (props) => {
    return (
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          {props.children}
        </RainbowKitProvider>
      </WagmiConfig>
    );
  };

  export default Main