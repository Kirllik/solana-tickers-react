import React, { useEffect, useState } from 'react';
import { availableNetworks, formatLiquidity, getNetworkName } from '../../../entities';
import { Button } from '../../../shared';
import styles from './liquidity-item.module.scss';

export const LiquidityItem = ({ result }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Анимация появления с небольшой задержкой
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  const liquidityInfo = formatLiquidity(result.maxLiquidity);
  let pairInfo = '';
  
  // Информация о лучшей паре с биржей
  if (result.bestPair) {
    const networkName = getNetworkName(result.bestPair.chainId, availableNetworks);
    const pairSymbol = `${result.bestPair.baseToken.symbol}/${result.bestPair.quoteToken.symbol}`;
    const dexName = result.bestPair.dexId ? result.bestPair.dexId.toUpperCase() : 'DEX';
    
    pairInfo = (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{pairSymbol}</div>
        {result.bestPair.priceUsd && (
          <div style={{ fontSize: '0.85rem' }}>${parseFloat(result.bestPair.priceUsd).toFixed(6)}</div>
        )}
        <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>{networkName}</div>
        <div style={{ fontSize: '0.75rem', color: '#007bff', fontWeight: 'bold' }}>📈 {dexName}</div>
        {result.totalPairs > 1 && (
          <div style={{ fontSize: '0.75rem', color: '#007bff' }}>+{result.totalPairs - 1} пар</div>
        )}
      </div>
    );
  }
  
  return (
    <div 
      className={styles.liquidityItem} 
      style={{
        ...(result.bestPair && result.bestPair.url ? { cursor: 'pointer' } : {}),
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease'
      }}
      onClick={() => {
        if (result.bestPair && result.bestPair.url) {
          window.open(result.bestPair.url, '_blank');
        }
      }}
    >
      <div className={styles.liquiditySymbol}>{result.symbol}</div>
      <div className={`${styles.liquidityValue} ${styles[liquidityInfo.class]}`}>{liquidityInfo.text}</div>
      {pairInfo}
    </div>
  );
};
