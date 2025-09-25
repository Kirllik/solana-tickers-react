import React, { useState } from 'react';
import { LiquidityItem } from '../../liquidity-item';
import styles from './liquidity-results.module.scss';

export const LiquidityResults = ({ results, onSort, isLoading, totalTickers, hasStoredData }) => {
  const [sortType, setSortType] = useState('none');

  const handleSort = (newSortType) => {
    setSortType(newSortType);
    onSort(newSortType);
  };

  if (results.length === 0 && !isLoading) {
    return null;
  }

  const foundCount = results.filter(r => r.found).length;
  const progressPercent = totalTickers ? (results.length / totalTickers) * 100 : 0;

  return (
    <div className={styles.liquidityResults}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <div>
          <h3>
            💧 Результаты проверки ликвидности
            {hasStoredData && !isLoading && (
              <span style={{ 
                fontSize: '0.8rem', 
                color: '#28a745', 
                marginLeft: '10px',
                fontWeight: 'normal'
              }}>
                📦 Загружено из сохраненных данных
              </span>
            )}
          </h3>
          {isLoading && totalTickers && (
            <div className={styles.progressInfo}>
              Прогресс: {results.length} из {totalTickers} тикеров ({Math.round(progressPercent)}%)
              {foundCount > 0 && ` • Найдено: ${foundCount}`}
            </div>
          )}
          {!isLoading && results.length > 0 && (
            <div className={styles.progressInfo}>
              Всего тикеров: {results.length} • Найдено: {foundCount} • Не найдено: {results.length - foundCount}
            </div>
          )}
        </div>
        {!isLoading && (
          <div className={styles.sortControls}>
            <label style={{ fontSize: '0.9rem', marginRight: '10px' }}>Сортировка:</label>
            <select 
              value={sortType}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="none">Без сортировки</option>
              <option value="liquidity-desc">По ликвидности ↓</option>
              <option value="liquidity-asc">По ликвидности ↑</option>
              <option value="symbol-asc">По символу ↑</option>
              <option value="symbol-desc">По символу ↓</option>
            </select>
          </div>
        )}
      </div>
      
      {isLoading && totalTickers && (
        <div className={styles.progressBar}>
          <div className={styles.progressTrack}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
      
      <div>
        {results.map(result => (
          <LiquidityItem 
            key={`${result.symbol}-${result.address}`}
            result={result} 
          />
        ))}
      </div>
    </div>
  );
};
