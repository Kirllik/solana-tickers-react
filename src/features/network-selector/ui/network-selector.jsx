import React from 'react';
import { availableNetworks } from '../../../entities';
import styles from './network-selector.module.scss';

export const NetworkSelector = ({ selectedNetworks, onNetworksChange }) => {
  const toggleNetwork = (networkId) => {
    const isSelected = selectedNetworks.includes(networkId);
    let newSelectedNetworks;
    
    if (isSelected) {
      newSelectedNetworks = selectedNetworks.filter(id => id !== networkId);
    } else {
      newSelectedNetworks = [...selectedNetworks, networkId];
    }
    
    // Убеждаемся, что выбрана хотя бы одна сеть
    if (newSelectedNetworks.length === 0) {
      newSelectedNetworks = ['solana'];
    }
    
    onNetworksChange(newSelectedNetworks);
  };

  const selectPopularNetworks = () => {
    const popularNetworks = availableNetworks
      .filter(network => network.category === 'popular')
      .map(network => network.id);
    onNetworksChange(popularNetworks);
  };

  const selectAllNetworks = () => {
    const allNetworkIds = availableNetworks.map(network => network.id);
    onNetworksChange(allNetworkIds);
  };

  const clearAllNetworks = () => {
    onNetworksChange(['solana']);
  };

  const selectEVMNetworks = () => {
    const evmNetworks = availableNetworks
      .filter(network => network.evm)
      .map(network => network.id);
    onNetworksChange(evmNetworks);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#495057' }}>
          🌐 Выберите блокчейн сети (можно несколько):
        </label>
        
        <div className={styles.selectedCount}>
          Выбрано сетей: <span>{selectedNetworks.length}</span>
        </div>
        
        <div className={styles.networkControls}>
          <button className={styles.networkBtn} onClick={selectPopularNetworks}>
            📈 Популярные
          </button>
          <button className={styles.networkBtn} onClick={selectAllNetworks}>
            ✅ Все
          </button>
          <button className={styles.networkBtn} onClick={clearAllNetworks}>
            ❌ Очистить
          </button>
          <button className={styles.networkBtn} onClick={selectEVMNetworks}>
            ⟠ EVM сети
          </button>
        </div>
      </div>
      
      <div className={styles.networkGrid}>
        {availableNetworks.map(network => (
          <div 
            key={network.id}
            className={`${styles.networkItem} ${selectedNetworks.includes(network.id) ? styles.selected : ''}`}
            onClick={() => toggleNetwork(network.id)}
          >
            <input 
              type="checkbox" 
              className={styles.networkCheckbox}
              checked={selectedNetworks.includes(network.id)}
              onChange={() => toggleNetwork(network.id)}
            />
            <label className={styles.networkLabel}>
              {network.name}
            </label>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.9rem', color: '#6c757d' }}>
        Выберите сети для получения тикеров из нескольких блокчейнов одновременно
      </div>
    </div>
  );
};
