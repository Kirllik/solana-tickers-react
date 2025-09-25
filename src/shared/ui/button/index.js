import React from 'react';
import styles from './button.module.scss';

export const Button = ({ 
  children, 
  className = '', 
  onClick, 
  disabled = false, 
  style = {},
  ...props 
}) => {
  return (
    <button 
      className={`${styles.btn} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};
