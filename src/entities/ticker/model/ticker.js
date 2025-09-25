// Модель тикера
export const createTicker = (data) => ({
  symbol: data.symbol || data.ticker || 'Unknown',
  address: data.address || '',
  name: data.name || data.symbol || data.ticker || 'Unknown'
});

// Модель результата ликвидности
export const createLiquidityResult = (ticker, pairs = []) => {
  const liquidPairs = pairs
    .filter(pair => pair.liquidity && pair.liquidity.usd)
    .map(pair => ({
      chainId: pair.chainId,
      dexId: pair.dexId,
      pairAddress: pair.pairAddress,
      baseToken: pair.baseToken,
      quoteToken: pair.quoteToken,
      priceUsd: pair.priceUsd,
      liquidity: pair.liquidity.usd,
      volume24h: pair.volume ? Object.values(pair.volume)[0] : null,
      url: pair.url
    }))
    .sort((a, b) => b.liquidity - a.liquidity);

  const bestPair = liquidPairs.length > 0 ? liquidPairs[0] : null;

  return {
    ...ticker,
    pairs: liquidPairs,
    maxLiquidity: bestPair ? bestPair.liquidity : null,
    bestPair: bestPair,
    found: liquidPairs.length > 0,
    totalPairs: liquidPairs.length
  };
};
