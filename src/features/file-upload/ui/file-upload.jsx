import React, { useState, useRef } from 'react';
import { parseFileContent } from '../../../shared';
import styles from './file-upload.module.scss';

export const FileUpload = ({ onFileUpload }) => {
  const [fileInfo, setFileInfo] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Показываем информацию о файле
    setFileInfo({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      type: file.type || 'Неизвестный',
      lastModified: new Date(file.lastModified).toLocaleString()
    });

    // Читаем файл
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const tickers = parseFileContent(e.target.result, file.name);
        onFileUpload(tickers);
      } catch (error) {
        console.error('Ошибка чтения файла:', error);
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div>
      <div 
        className={`${styles.fileUploadSection} ${isDragOver ? styles.dragover : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <h3>📁 Загрузите файл с тикерами для проверки ликвидности</h3>
        <p>Поддерживаемые форматы: JSON, CSV, TXT</p>
        
        <input 
          ref={fileInputRef}
          type="file" 
          className={styles.fileInput}
          accept=".json,.csv,.txt"
          onChange={handleFileInputChange}
        />
        
        <button 
          className={styles.fileUploadBtn}
          onClick={() => fileInputRef.current?.click()}
        >
          📂 Выбрать файл
        </button>
        
        <div>или перетащите файл сюда</div>
      </div>

      {fileInfo && (
        <div className={`${styles.fileInfo} ${styles.show}`}>
          <h4>📄 Информация о файле:</h4>
          <div>
            <strong>Имя:</strong> {fileInfo.name}<br/>
            <strong>Размер:</strong> {fileInfo.size}<br/>
            <strong>Тип:</strong> {fileInfo.type}<br/>
            <strong>Последнее изменение:</strong> {fileInfo.lastModified}
          </div>
        </div>
      )}
    </div>
  );
};
