import React, { useState } from 'react';
import { removeBackground } from '@imgly/background-removal';

const App = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginalImage(URL.createObjectURL(file));
      setResultImage(null);
    }
  };

  const handleRemove = async () => {
    if (!originalImage) return;
    setLoading(true);
    try {
      const res = await fetch(originalImage);
      const blob = await res.blob();
      const result = await removeBackground(blob);
      setResultImage(URL.createObjectURL(result));
    } catch (e) {
      alert('Ошибка при удалении фона');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h1>Удаление фона</h1>
      <input type="file" accept="image/*" onChange={handleUpload} />
      <br />
      <button onClick={handleRemove} disabled={loading || !originalImage} style={{ marginTop: '20px' }}>
        {loading ? 'Обработка...' : 'Удалить фон'}
      </button>
      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '30px' }}>
        {originalImage && (
          <div>
            <p>Оригинал</p>
            <img src={originalImage} alt="Оригинал" width="200" />
          </div>
        )}
        {resultImage && (
          <div>
            <p>Результат</p>
            <img src={resultImage} alt="Результат" width="200" />
            <br />
            <a href={resultImage} download="result.png">Скачать</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;