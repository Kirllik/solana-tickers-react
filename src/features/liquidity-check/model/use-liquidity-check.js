import { useState, useCallback, useEffect } from 'react';
import { dexScreenerApi } from '../../../shared';
import { createLiquidityResult } from '../../../entities';

// Ключи для localStorage
const LIQUIDITY_RESULTS_KEY = 'liquidity-check-results';
const UPLOADED_TICKERS_KEY = 'uploaded-tickers';
const SELECTED_NETWORKS_KEY = 'selected-networks';

export const useLiquidityCheck = () => {
  const [liquidityResults, setLiquidityResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStoredData, setHasStoredData] = useState(false);

  // Загружаем данные из localStorage при инициализации
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const storedResults = localStorage.getItem(LIQUIDITY_RESULTS_KEY);
        const storedTickers = localStorage.getItem(UPLOADED_TICKERS_KEY);
        const storedNetworks = localStorage.getItem(SELECTED_NETWORKS_KEY);
        
        if (storedResults) {
          const results = JSON.parse(storedResults);
          setLiquidityResults(results);
          setHasStoredData(true);
          console.log('📦 Загружены сохраненные результаты:', results.length, 'тикеров');
        }
        
        if (storedTickers) {
          const tickers = JSON.parse(storedTickers);
          console.log('📦 Загружены сохраненные тикеры:', tickers.length, 'тикеров');
        }
        
        if (storedNetworks) {
          const networks = JSON.parse(storedNetworks);
          console.log('📦 Загружены сохраненные сети:', networks);
        }
        
      } catch (error) {
        console.error('❌ Ошибка загрузки данных из localStorage:', error);
      }
    };
    
    loadStoredData();
  }, []);

  // Сохраняем результаты в localStorage
  const saveResultsToStorage = useCallback((results) => {
    try {
      localStorage.setItem(LIQUIDITY_RESULTS_KEY, JSON.stringify(results));
      console.log('💾 Результаты сохранены в localStorage:', results.length, 'тикеров');
    } catch (error) {
      console.error('❌ Ошибка сохранения результатов в localStorage:', error);
    }
  }, []);

  // Сохраняем загруженные тикеры в localStorage
  const saveTickersToStorage = useCallback((tickers) => {
    try {
      localStorage.setItem(UPLOADED_TICKERS_KEY, JSON.stringify(tickers));
      console.log('💾 Тикеры сохранены в localStorage:', tickers.length, 'тикеров');
    } catch (error) {
      console.error('❌ Ошибка сохранения тикеров в localStorage:', error);
    }
  }, []);

  // Сохраняем выбранные сети в localStorage
  const saveNetworksToStorage = useCallback((networks) => {
    try {
      localStorage.setItem(SELECTED_NETWORKS_KEY, JSON.stringify(networks));
      console.log('💾 Сети сохранены в localStorage:', networks);
    } catch (error) {
      console.error('❌ Ошибка сохранения сетей в localStorage:', error);
    }
  }, []);

  // Очищаем все данные из localStorage
  const clearStoredData = useCallback(() => {
    try {
      localStorage.removeItem(LIQUIDITY_RESULTS_KEY);
      localStorage.removeItem(UPLOADED_TICKERS_KEY);
      localStorage.removeItem(SELECTED_NETWORKS_KEY);
      setLiquidityResults([]);
      setHasStoredData(false);
      console.log('🗑️ Все данные очищены из localStorage');
    } catch (error) {
      console.error('❌ Ошибка очистки localStorage:', error);
    }
  }, []);

  // Получаем сохраненные тикеры
  const getStoredTickers = useCallback(() => {
    try {
      const storedTickers = localStorage.getItem(UPLOADED_TICKERS_KEY);
      return storedTickers ? JSON.parse(storedTickers) : [];
    } catch (error) {
      console.error('❌ Ошибка получения тикеров из localStorage:', error);
      return [];
    }
  }, []);

  // Получаем сохраненные сети
  const getStoredNetworks = useCallback(() => {
    try {
      const storedNetworks = localStorage.getItem(SELECTED_NETWORKS_KEY);
      return storedNetworks ? JSON.parse(storedNetworks) : ['solana'];
    } catch (error) {
      console.error('❌ Ошибка получения сетей из localStorage:', error);
      return ['solana'];
    }
  }, []);

  const searchTickerInNetwork = async (ticker, networkId) => {
    const foundPairs = [];
    
    try {
      // 1. Поиск по символу
      if (ticker.symbol && ticker.symbol !== 'Unknown') {
        const searchData = await dexScreenerApi.searchBySymbol(ticker.symbol);
        
        if (searchData && searchData.pairs) {
          // Фильтруем пары для нужной сети
          const networkPairs = searchData.pairs.filter(pair => pair.chainId === networkId);
          foundPairs.push(...networkPairs);
        }
      }
      
      // 2. Поиск по адресу (если есть)
      if (ticker.address && ticker.address.trim() !== '') {
        try {
          const tokenData = await dexScreenerApi.getTokenByAddress(networkId, ticker.address);
          
          if (tokenData && Array.isArray(tokenData)) {
            foundPairs.push(...tokenData);
          }
        } catch (error) {
          console.log(`Адрес ${ticker.address} не найден в ${networkId}`);
        }
      }
      
    } catch (error) {
      console.error(`Ошибка поиска тикера ${ticker.symbol} в ${networkId}:`, error);
    }
    
    return foundPairs;
  };

  const checkLiquidity = useCallback(async (uploadedTickers, selectedNetworks) => {
    setIsLoading(true);
    setLiquidityResults([]); // Очищаем предыдущие результаты
    const results = [];
    
    // Сохраняем тикеры и сети в localStorage
    saveTickersToStorage(uploadedTickers);
    saveNetworksToStorage(selectedNetworks);
    
    try {
      // Перебираем каждый тикер из загруженного файла
      for (const ticker of uploadedTickers) {
        let allPairsForTicker = [];
        
        // Ищем тикер во всех выбранных сетях
        for (const networkId of selectedNetworks) {
          try {
            const pairsInNetwork = await searchTickerInNetwork(ticker, networkId);
            allPairsForTicker = allPairsForTicker.concat(pairsInNetwork);
            
            // Пауза между запросами к разным сетям
            await new Promise(resolve => setTimeout(resolve, 200));
            
          } catch (error) {
            console.error(`Ошибка поиска ${ticker.symbol} в ${networkId}:`, error);
          }
        }
        
        // Обрабатываем результаты для тикера
        const result = createLiquidityResult(ticker, allPairsForTicker);
        results.push(result);
        
        // Обновляем результаты в реальном времени
        setLiquidityResults([...results]);
        
        // Сохраняем промежуточные результаты в localStorage
        saveResultsToStorage([...results]);
        
        // Пауза между тикерами
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Финальное сохранение результатов
      saveResultsToStorage(results);
      setHasStoredData(true);
      
      return results;
      
    } catch (error) {
      console.error('Ошибка проверки ликвидности:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [saveTickersToStorage, saveNetworksToStorage, saveResultsToStorage]);

  const sortResults = useCallback((sortType) => {
    if (liquidityResults.length === 0 || sortType === 'none') {
      return;
    }
    
    let sortedResults = [...liquidityResults];
    
    switch (sortType) {
      case 'liquidity-desc':
        sortedResults.sort((a, b) => {
          const liquidityA = a.maxLiquidity || 0;
          const liquidityB = b.maxLiquidity || 0;
          return liquidityB - liquidityA;
        });
        break;
        
      case 'liquidity-asc':
        sortedResults.sort((a, b) => {
          const liquidityA = a.maxLiquidity || 0;
          const liquidityB = b.maxLiquidity || 0;
          return liquidityA - liquidityB;
        });
        break;
        
      case 'symbol-asc':
        sortedResults.sort((a, b) => a.symbol.localeCompare(b.symbol));
        break;
        
      case 'symbol-desc':
        sortedResults.sort((a, b) => b.symbol.localeCompare(a.symbol));
        break;
        
      default:
        return;
    }
    
    setLiquidityResults(sortedResults);
    // Сохраняем отсортированные результаты в localStorage
    saveResultsToStorage(sortedResults);
  }, [liquidityResults, saveResultsToStorage]);

  const downloadResults = useCallback(() => {
    if (liquidityResults.length === 0) return;
    
    const data = {
      timestamp: new Date().toISOString(),
      totalTickers: liquidityResults.length,
      found: liquidityResults.filter(r => r.found).length,
      totalPairs: liquidityResults.reduce((sum, r) => sum + (r.totalPairs || 0), 0),
      highLiquidity: liquidityResults.filter(r => r.maxLiquidity && r.maxLiquidity > 100000).length,
      mediumLiquidity: liquidityResults.filter(r => r.maxLiquidity && r.maxLiquidity > 10000 && r.maxLiquidity <= 100000).length,
      lowLiquidity: liquidityResults.filter(r => r.maxLiquidity && r.maxLiquidity <= 10000).length,
      results: liquidityResults
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `liquidity_check_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [liquidityResults]);

  return {
    liquidityResults,
    checkLiquidity,
    sortResults,
    downloadResults,
    isLoading,
    hasStoredData,
    clearStoredData,
    getStoredTickers,
    getStoredNetworks
  };
};
