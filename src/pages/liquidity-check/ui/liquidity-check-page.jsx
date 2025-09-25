import React, { useState, useEffect } from 'react';
import { Header, LiquidityResults } from '../../../widgets';
import { NetworkSelector, FileUpload, useLiquidityCheck } from '../../../features';
import { StatusMessage, Button, LoadingSpinner } from '../../../shared';
import styles from './liquidity-check-page.module.scss';

export const LiquidityCheckPage = () => {
  const [currentMode, setCurrentMode] = useState('check');
  const [selectedNetworks, setSelectedNetworks] = useState(['solana']);
  const [uploadedTickers, setUploadedTickers] = useState([]);
  const [status, setStatus] = useState({ message: '📂 Режим подгрузки тикеров: загрузите файл с тикерами', type: '' });

  const {
    liquidityResults,
    checkLiquidity,
    sortResults,
    downloadResults,
    isLoading: isLoadingLiquidity,
    hasStoredData,
    clearStoredData,
    getStoredTickers,
    getStoredNetworks
  } = useLiquidityCheck();

  // Загружаем сохраненные данные при инициализации
  useEffect(() => {
    const loadStoredData = () => {
      const storedTickers = getStoredTickers();
      const storedNetworks = getStoredNetworks();
      
      if (storedTickers.length > 0) {
        setUploadedTickers(storedTickers);
        setStatus({ 
          message: `📦 Загружено ${storedTickers.length} тикеров из сохраненных данных`, 
          type: 'success' 
        });
      }
      
      if (storedNetworks.length > 0) {
        setSelectedNetworks(storedNetworks);
      }
      
      // Если есть сохраненные результаты, переключаемся в режим проверки
      if (hasStoredData && liquidityResults.length > 0) {
        setCurrentMode('discover');
        setStatus({ 
          message: `📦 Загружены сохраненные результаты: ${liquidityResults.length} тикеров`, 
          type: 'success' 
        });
      }
    };
    
    loadStoredData();
  }, [hasStoredData, liquidityResults.length, getStoredTickers, getStoredNetworks]);

  const switchMode = (mode) => {
    setCurrentMode(mode);
    if (mode === 'discover') {
      setStatus({ message: '💧 Режим проверки ликвидности: выберите сети и нажмите "Проверка ликвидности"', type: '' });
    } else {
      setStatus({ message: '📂 Режим подгрузки тикеров: загрузите файл с тикерами', type: '' });
    }
  };

  const handleFileUpload = (tickers) => {
    setUploadedTickers(tickers);
    setStatus({ message: `✅ Загружено ${tickers.length} тикеров из файла`, type: 'success' });
  };

  const handleLiquidityCheck = async () => {
    if (uploadedTickers.length === 0) {
      setStatus({ message: '❌ Сначала загрузите файл с тикерами!', type: 'error' });
      return;
    }

    if (selectedNetworks.length === 0) {
      setStatus({ message: '❌ Выберите хотя бы одну сеть для проверки ликвидности!', type: 'error' });
      return;
    }

    setStatus({ message: '💧 Проверка ликвидности...', type: 'loading' });
    
    try {
      await checkLiquidity(uploadedTickers, selectedNetworks);
      setStatus({ 
        message: `✅ Проверка завершена: найдено ${liquidityResults.filter(r => r.found).length} из ${liquidityResults.length} токенов`, 
        type: 'success' 
      });
    } catch (error) {
      setStatus({ message: `❌ Ошибка проверки ликвидности: ${error.message}`, type: 'error' });
    }
  };

  const handleClearData = () => {
    clearStoredData();
    setUploadedTickers([]);
    setSelectedNetworks(['solana']);
    setCurrentMode('check');
    setStatus({ message: '🗑️ Все данные очищены. Начните заново.', type: 'success' });
  };

  return (
    <div>
      <Header />
      
      <div className={styles.content}>
        <div className={styles.modeToggle}>
          <Button 
            className={`${styles.modeBtn} ${currentMode === 'check' ? styles.active : ''}`}
            onClick={() => switchMode('check')}
          >
            📂 Подгрузка тикеров
          </Button>
          
          {(hasStoredData || uploadedTickers.length > 0 || liquidityResults.length > 0) && (
            <Button 
              onClick={handleClearData}
              style={{ 
                backgroundColor: '#dc3545', 
                color: 'white',
                marginLeft: '10px'
              }}
            >
              🗑️ Очистить данные
            </Button>
          )}
        </div>

        {currentMode === 'discover' && (
          <div>
            <NetworkSelector 
              selectedNetworks={selectedNetworks}
              onNetworksChange={setSelectedNetworks}
            />
            
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <Button 
                onClick={handleLiquidityCheck}
                disabled={isLoadingLiquidity}
              >
                {isLoadingLiquidity ? (
                  <>
                    <LoadingSpinner /> Проверка...
                  </>
                ) : (
                  '💧 Проверка ликвидности'
                )}
              </Button>
              
              {liquidityResults.length > 0 && (
                <Button 
                  onClick={downloadResults}
                  style={{ marginLeft: '10px' }}
                >
                  💾 Скачать результаты
                </Button>
              )}
            </div>
          </div>
        )}

        {currentMode === 'check' && (
          <div>
            <FileUpload onFileUpload={handleFileUpload} />
            
            {uploadedTickers.length > 0 && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button 
                  onClick={() => switchMode('discover')}
                  style={{ backgroundColor: '#28a745', color: 'white' }}
                >
                  ✅ Готово - Перейти к проверке ликвидности
                </Button>
              </div>
            )}
          </div>
        )}

        <StatusMessage message={status.message} type={status.type} />

        {(liquidityResults.length > 0 || isLoadingLiquidity) && (
          <LiquidityResults 
            results={liquidityResults}
            onSort={sortResults}
            isLoading={isLoadingLiquidity}
            totalTickers={uploadedTickers.length}
            hasStoredData={hasStoredData}
          />
        )}
      </div>
    </div>
  );
};
