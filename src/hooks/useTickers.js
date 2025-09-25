import { useState, useCallback } from 'react';
import { getNetworkConfig } from '../data/networks';

export const useTickers = () => {
  const [allTickers, setAllTickers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTickers = useCallback(async (selectedNetworks) => {
    setIsLoading(true);
    const baseUrl = 'https://api.dexscreener.com';
    const uniqueTickers = new Map();

    const addTicker = (address, symbol, name = '', chainId) => {
      if (address && symbol && !uniqueTickers.has(address)) {
        uniqueTickers.set(address, {
          address,
          symbol,
          name: name || symbol,
          chainId
        });
      }
    };

    const processPairs = (pairs, chainId) => {
      pairs.forEach(pair => {
        if (pair.chainId === chainId) {
          if (pair.baseToken) {
            addTicker(pair.baseToken.address, pair.baseToken.symbol, pair.baseToken.name, chainId);
          }
          if (pair.quoteToken) {
            addTicker(pair.quoteToken.address, pair.quoteToken.symbol, pair.quoteToken.name, chainId);
          }
        }
      });
    };

    try {
      for (const chainId of selectedNetworks) {
        const network = getNetworkConfig(chainId);

        // 1. Поиск по популярным токенам
        const popularTokens = network.popularTokens;
        
        for (let i = 0; i < popularTokens.length; i++) {
          const token = popularTokens[i];
          try {
            const response = await fetch(`${baseUrl}/latest/dex/search?q=${token}`);
            const data = await response.json();
            
            if (data.pairs) {
              processPairs(data.pairs, chainId);
            }
            
            await new Promise(resolve => setTimeout(resolve, 300));
          } catch (error) {
            console.error(`Ошибка поиска ${token}:`, error);
          }
        }

        // 2. Известные токены
        const knownTokens = network.knownTokens;
        if (knownTokens.length > 0) {
          try {
            const response = await fetch(`${baseUrl}/tokens/v1/${chainId}/${knownTokens.join(',')}`);
            const data = await response.json();
            
            if (Array.isArray(data)) {
              processPairs(data, chainId);
            }
          } catch (error) {
            console.error('Ошибка получения известных токенов:', error);
          }
        }

        // 3. Буст-токены
        try {
          const response = await fetch(`${baseUrl}/token-boosts/latest/v1`);
          const data = await response.json();
          
          if (Array.isArray(data)) {
            data.forEach(item => {
              if (item.chainId === chainId) {
                addTicker(item.tokenAddress, 'BOOST', 'Boosted Token', chainId);
              }
            });
          }
        } catch (error) {
          console.error('Ошибка получения буст-токенов:', error);
        }
      }

      const tickers = Array.from(uniqueTickers.values())
        .sort((a, b) => a.symbol.localeCompare(b.symbol));

      setAllTickers(tickers);
      return tickers;

    } catch (error) {
      console.error('Критическая ошибка:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    allTickers,
    fetchTickers,
    isLoading
  };
};
