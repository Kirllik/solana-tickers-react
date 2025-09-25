const BASE_URL = 'https://api.dexscreener.com';

export const dexScreenerApi = {
  // Поиск по символу
  searchBySymbol: async (symbol) => {
    const response = await fetch(`${BASE_URL}/latest/dex/search?q=${encodeURIComponent(symbol)}`);
    return response.json();
  },

  // Получение токена по адресу
  getTokenByAddress: async (networkId, address) => {
    const response = await fetch(`${BASE_URL}/tokens/v1/${networkId}/${address}`);
    return response.json();
  }
};
