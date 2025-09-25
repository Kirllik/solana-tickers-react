// Список всех доступных сетей с эмодзи и категориями
export const availableNetworks = [
  { id: 'solana', name: '🔷 Solana', category: 'popular' },
  { id: 'ethereum', name: '⟠ Ethereum', category: 'popular', evm: true },
  { id: 'bsc', name: '🟡 BSC', category: 'popular', evm: true },
  { id: 'base', name: '🟦 Base', category: 'popular', evm: true },
  { id: 'polygon', name: '🟣 Polygon', category: 'popular', evm: true },
  { id: 'avalanche', name: '🔺 Avalanche', category: 'popular', evm: true },
  { id: 'arbitrum', name: '🔵 Arbitrum', category: 'popular', evm: true },
  { id: 'optimism', name: '🔴 Optimism', category: 'popular', evm: true },
  { id: 'fantom', name: '👻 Fantom', category: 'popular', evm: true },
  { id: 'pulsechain', name: '💓 PulseChain', category: 'new', evm: true },
  { id: 'ton', name: '💎 TON', category: 'new' },
  { id: 'abstract', name: '🎨 Abstract', category: 'new', evm: true },
  { id: 'sui', name: '🌊 Sui', category: 'new' },
  { id: 'cronos', name: '💎 Cronos', category: 'other', evm: true },
  { id: 'world-chain', name: '🌍 World Chain', category: 'new', evm: true },
  { id: 'hedera', name: '🌿 Hedera', category: 'other' },
  { id: 'hyperliquid', name: '⚡ Hyperliquid', category: 'new' },
  { id: 'tron', name: '🔴 Tron', category: 'other' },
  { id: 'linea', name: '📏 Linea', category: 'new', evm: true },
  { id: 'hyperevm', name: '⚡ HyperEVM', category: 'new', evm: true },
  { id: 'xrpl', name: '💧 XRPL', category: 'other' },
  { id: 'sonic', name: '🦔 Sonic', category: 'new', evm: true },
  { id: 'story', name: '📖 Story', category: 'new', evm: true },
  { id: 'osmosis', name: '🧪 Osmosis', category: 'other' },
  { id: 'near', name: '🔭 NEAR', category: 'other' },
  { id: 'berachain', name: '🐻 Berachain', category: 'new', evm: true },
  { id: 'ink', name: '🖋️ Ink', category: 'new' },
  { id: 'aptos', name: '🅰️ Aptos', category: 'other' },
  { id: 'sei-v2', name: '🌊 Sei V2', category: 'new' },
  { id: 'icp', name: '♾️ ICP', category: 'other' },
  { id: 'unichain', name: '🦄 Unichain', category: 'new', evm: true },
  { id: 'algorand', name: '🅰️ Algorand', category: 'other' },
  { id: 'mantle', name: '🧥 Mantle', category: 'other', evm: true },
  { id: 'multiversx', name: '✖️ MultiversX', category: 'other' },
  { id: 'cardano', name: '♠️ Cardano', category: 'other' },
  { id: 'soneium', name: '📱 Soneium', category: 'new', evm: true },
  { id: 'merlin-chain', name: '🧙 Merlin Chain', category: 'new', evm: true },
  { id: 'zksync', name: '⚡ zkSync', category: 'other', evm: true },
  { id: 'apechain', name: '🐵 ApeChain', category: 'new', evm: true },
  { id: 'neon-evm', name: '🌈 Neon EVM', category: 'other', evm: true },
  { id: 'core', name: '⚡ Core', category: 'other', evm: true },
  { id: 'starknet', name: '⭐ Starknet', category: 'other' },
  { id: 'blast', name: '💥 Blast', category: 'new', evm: true },
  { id: 'dogechain', name: '🐕 Dogechain', category: 'other', evm: true },
  { id: 'conflux', name: '🌀 Conflux', category: 'other', evm: true },
  { id: 'flare', name: '🔥 Flare', category: 'other', evm: true },
  { id: 'movement', name: '🏃 Movement', category: 'new' },
  { id: 'flow-evm', name: '🌊 Flow EVM', category: 'other', evm: true },
  { id: 'beam', name: '📡 Beam', category: 'other', evm: true },
  { id: 'shibarium', name: '🐕 Shibarium', category: 'other', evm: true },
  { id: 'harmony', name: '🎵 Harmony', category: 'other', evm: true },
  { id: 'vana', name: '🌸 Vana', category: 'new', evm: true },
  { id: 'katana', name: '⚔️ Katana', category: 'new' },
  { id: 'injective', name: '💉 Injective', category: 'other' },
  { id: 'celo', name: '📱 Celo', category: 'other', evm: true },
  { id: 'moonbeam', name: '🌙 Moonbeam', category: 'other', evm: true },
  { id: 'metis', name: '🌟 Metis', category: 'other', evm: true },
  { id: 'scroll', name: '📜 Scroll', category: 'other', evm: true },
  { id: 'venom', name: '🐍 Venom', category: 'other' },
  { id: 'opbnb', name: '🟡 opBNB', category: 'other', evm: true },
  { id: 'avalanche-dfk', name: '🔺 Avalanche DFK', category: 'other', evm: true },
  { id: 'ethereumpow', name: '⚡ EthereumPoW', category: 'other', evm: true },
  { id: 'elastos', name: '🔗 Elastos', category: 'other', evm: true },
  { id: 'zircuit', name: '⚡ Zircuit', category: 'new', evm: true },
  { id: 'ethereum-classic', name: '⟠ Ethereum Classic', category: 'other', evm: true },
  { id: 'bouncebit', name: '🏀 BounceBit', category: 'new', evm: true },
  { id: 'kcc', name: '🔗 KCC', category: 'other', evm: true },
  { id: 'gnosis-chain', name: '🦉 Gnosis Chain', category: 'other', evm: true },
  { id: 'energi', name: '⚡ Energi', category: 'other', evm: true },
  { id: 'manta', name: '🐙 Manta', category: 'other', evm: true },
  { id: 'kava', name: '☕ Kava', category: 'other', evm: true },
  { id: 'aurora', name: '🌅 Aurora', category: 'other', evm: true },
  { id: 'mode', name: '⚙️ Mode', category: 'new', evm: true },
  { id: 'fraxtal', name: '❄️ Fraxtal', category: 'new', evm: true },
  { id: 'zora', name: '🎨 Zora', category: 'other', evm: true },
  { id: 'moonriver', name: '🌙 Moonriver', category: 'other', evm: true },
  { id: 'oasis-sapphire', name: '💎 Oasis Sapphire', category: 'other', evm: true },
  { id: 'astar', name: '⭐ Astar', category: 'other', evm: true },
  { id: 'iotex', name: '📡 IoTeX', category: 'other', evm: true },
  { id: 'fuse', name: '🔗 Fuse', category: 'other', evm: true },
  { id: 'telos', name: '🌐 Telos', category: 'other', evm: true },
  { id: 'taiko', name: '🥁 Taiko', category: 'new', evm: true },
  { id: 'polygon-zkevm', name: '🟣 Polygon zkEVM', category: 'other', evm: true },
  { id: 'arbitrum-nova', name: '🔵 Arbitrum Nova', category: 'other', evm: true },
  { id: 'oasis-emerald', name: '💚 Oasis Emerald', category: 'other', evm: true },
  { id: 'bitgert', name: '⚡ Bitgert', category: 'other', evm: true },
  { id: 'boba', name: '🧋 Boba', category: 'other', evm: true },
  { id: 'step-network', name: '👣 Step Network', category: 'other', evm: true },
  { id: 'velas', name: '⚡ Velas', category: 'other', evm: true },
  { id: 'zkfair', name: '⚖️ ZKFair', category: 'other', evm: true },
  { id: 'polkadot', name: '⚫ Polkadot', category: 'other' },
  { id: 'meter', name: '📏 Meter', category: 'other', evm: true }
];

// Информация о сетях (базовая конфигурация для популярных токенов)
export const getNetworkConfig = (chainId) => {
  const baseConfig = {
    name: chainId.charAt(0).toUpperCase() + chainId.slice(1).replace(/-/g, ' '),
    description: `Блокчейн сеть ${chainId}`,
    popularTokens: ['USDC', 'USDT', 'ETH', 'BTC', 'WETH'],
    knownTokens: []
  };

  // Специальные конфигурации для основных сетей
  const specialConfigs = {
    'solana': {
      name: 'Solana',
      description: 'Высокопроизводительная блокчейн сеть с низкими комиссиями',
      popularTokens: ['SOL', 'USDC', 'USDT', 'RAY', 'SRM', 'MNGO', 'COPE', 'ATLAS'],
      knownTokens: [
        'So11111111111111111111111111111111111111112',
        'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
        '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
        'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt'
      ]
    },
    'ethereum': {
      name: 'Ethereum',
      description: 'Первая программируемая блокчейн платформа для смарт-контрактов',
      popularTokens: ['ETH', 'USDC', 'USDT', 'WETH', 'DAI', 'LINK', 'UNI', 'AAVE'],
      knownTokens: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xA0b86a33E6441FE2Ad3dD9D6A3d50B9BF6fbAcCD',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0x514910771AF9Ca656af840dff83E8264EcF986CA'
      ]
    },
    'bsc': {
      name: 'BSC (Binance Smart Chain)',
      description: 'Быстрая и недорогая блокчейн сеть от Binance',
      popularTokens: ['BNB', 'BUSD', 'USDT', 'CAKE', 'XVS', 'BETH', 'VAI'],
      knownTokens: [
        '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        '0x55d398326f99059fF775485246999027B3197955',
        '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
        '0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63'
      ]
    },
    'polygon': {
      name: 'Polygon',
      description: 'Решение масштабирования для Ethereum с низкими комиссиями',
      popularTokens: ['MATIC', 'USDC', 'USDT', 'WETH', 'DAI', 'AAVE', 'QUICK'],
      knownTokens: [
        '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
        '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
        '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'
      ]
    },
    'avalanche': {
      name: 'Avalanche',
      description: 'Высокопроизводительная платформа для децентрализованных приложений',
      popularTokens: ['AVAX', 'USDC', 'USDT', 'WAVAX', 'JOE', 'PNG', 'QI'],
      knownTokens: [
        '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
        '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
        '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
        '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd',
        '0x60781C2586D68229fde47564546784ab3fACA982'
      ]
    },
    'arbitrum': {
      name: 'Arbitrum',
      description: 'Решение масштабирования Ethereum второго уровня',
      popularTokens: ['ETH', 'ARB', 'USDC', 'USDT', 'WETH', 'GMX', 'MAGIC'],
      knownTokens: [
        '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
        '0x912CE59144191C1204E64559FE8253a0e49E6548',
        '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
        '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a'
      ]
    },
    'base': {
      name: 'Base',
      description: 'Блокчейн от Coinbase на основе Optimism',
      popularTokens: ['ETH', 'USDC', 'WETH', 'DAI', 'CBETH'],
      knownTokens: [
        '0x4200000000000000000000000000000000000006',
        '0x833589fCD6eDB6E08f4c7C32D4f71b54bdA02913',
        '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
        '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22'
      ]
    },
    'ton': {
      name: 'TON',
      description: 'The Open Network - масштабируемая блокчейн платформа',
      popularTokens: ['TON', 'USDT', 'NOT', 'DOGS'],
      knownTokens: []
    },
    'tron': {
      name: 'Tron',
      description: 'Высокопропускная блокчейн платформа для DApps',
      popularTokens: ['TRX', 'USDT', 'USDC', 'BTT', 'SUN'],
      knownTokens: []
    }
  };

  return specialConfigs[chainId] || baseConfig;
};
