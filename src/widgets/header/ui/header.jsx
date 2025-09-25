import React from 'react';
import styles from './header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <h1>🚀 Crypto Tickers</h1>
      <p>Получение всех торгуемых токенов через DEX Screener API</p>
    </div>
  );
};
