import React from 'react';
import styles from './status-message.module.scss';

export const StatusMessage = ({ message, type }) => {
  if (!message) return null;

  return (
    <div className={`${styles.statusMessage} ${type ? styles[type] : ''}`} style={{ display: 'block' }}>
      <div>{message}</div>
    </div>
  );
};
