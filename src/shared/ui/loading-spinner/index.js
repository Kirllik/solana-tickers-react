import React from 'react';
import styles from './loading-spinner.module.scss';

export const LoadingSpinner = ({ size = 'small' }) => {
  const sizeClass = size === 'large' ? styles.large : '';
  
  return <span className={`${styles.loadingSpinner} ${sizeClass}`}></span>;
};
