import React from 'react';
import { LiquidityCheckPage } from '../../pages';
import styles from './app.module.scss'; //сс

export const App = () => {
  return (
    <div className={styles.container}>
      <LiquidityCheckPage />
    </div>
  );
};
