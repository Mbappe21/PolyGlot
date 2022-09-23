export const networks: Record<
  string,
  {
    unlockAddress: string;
    provider: string;
  }
> = {
  "5": {
    unlockAddress: "0xd8c88be5e8eb88e38e6ff5ce186d764676012b0b", // Smart contracts docs include all addresses on all networks
    provider: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    // provider: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  },
};

export const paywallConfig: Record<string, unknown> = {
  locks: {
    "0x0951438d8627bF4E0Da2B220355814234Eca0c07": {
      network: 5,
    },
  },
  pessimistic: true,
};
