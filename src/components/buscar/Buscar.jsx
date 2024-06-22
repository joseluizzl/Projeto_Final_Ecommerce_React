import React, { useState } from 'react';

const Buscar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div style={{ marginTop: '40px', textAlign: 'center' }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar produtos..."
        style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default Buscar;