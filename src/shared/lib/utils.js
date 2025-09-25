// Утилиты для работы с файлами
export const parseFileContent = (content, fileName) => {
  let tickers = [];
  
  try {
    if (fileName.endsWith('.json')) {
      // JSON файл
      const data = JSON.parse(content);
      
      if (Array.isArray(data)) {
        tickers = data;
      } else if (data.tickers && Array.isArray(data.tickers)) {
        tickers = data.tickers;
      } else if (typeof data === 'object') {
        // Попробуем извлечь тикеры из объекта
        tickers = Object.values(data).filter(item => 
          item && (item.symbol || item.address || item.ticker)
        );
      }
    } else if (fileName.endsWith('.csv')) {
      // CSV файл
      const lines = content.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const ticker = {};
        
        headers.forEach((header, index) => {
          if (values[index]) {
            if (header.includes('symbol') || header.includes('ticker')) {
              ticker.symbol = values[index];
            } else if (header.includes('address')) {
              ticker.address = values[index];
            } else if (header.includes('name')) {
              ticker.name = values[index];
            }
          }
        });
        
        if (ticker.symbol || ticker.address) {
          tickers.push(ticker);
        }
      }
    } else {
      // TXT файл - предполагаем, что каждая строка это символ или адрес
      const lines = content.split('\n').filter(line => line.trim());
      
      tickers = lines.map(line => {
        const trimmed = line.trim();
        // Если строка похожа на адрес (длинная и содержит буквы/цифры)
        if (trimmed.length > 20 && /^[a-zA-Z0-9]+$/.test(trimmed)) {
          return { address: trimmed, symbol: 'Unknown' };
        } else {
          return { symbol: trimmed };
        }
      });
    }
    
    // Нормализуем данные
    tickers = tickers.map(ticker => ({
      symbol: ticker.symbol || ticker.ticker || 'Unknown',
      address: ticker.address || '',
      name: ticker.name || ticker.symbol || ticker.ticker || 'Unknown'
    }));
    
    return tickers;
    
  } catch (error) {
    throw new Error(`Ошибка парсинга файла: ${error.message}`);
  }
};

// Утилиты для форматирования ликвидности
export const formatLiquidity = (liquidity) => {
  if (liquidity === null || liquidity === undefined || liquidity <= 0) {
    return { text: 'Не найдена', class: 'liquidity-none' };
  }
  
  if (liquidity > 100000) {
    return { 
      text: `$${(liquidity / 1000000).toFixed(2)}M`, 
      class: 'liquidity-high' 
    };
  } else if (liquidity > 10000) {
    return { 
      text: `$${(liquidity / 1000).toFixed(1)}K`, 
      class: 'liquidity-medium' 
    };
  } else {
    return { 
      text: `$${liquidity.toFixed(0)}`, 
      class: 'liquidity-low' 
    };
  }
};

// Утилиты для работы с сетями
export const getNetworkName = (networkId, networks) => {
  const network = networks.find(n => n.id === networkId);
  if (!network) return networkId;
  
  // Убираем эмодзи из названия
  return network.name.replace(/[🔷⟠🟡🟦🟣🔺🔵🔴👻💓💎🎨🌊🌍🌿⚡📏💧🦔📖🧪🔭🐻🖋️🅰️♾️🦄🧥✖️♠️📱🧙🐵🌈💥🐕🌀🔥🏃📡🎵🌸⚔️💉📱🌙🌟📜🐍🏀🔗🦉☕🌅⚙️❄️💎⭐💚👣⚖️⚫📏]/g, '').trim();
};
