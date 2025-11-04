import React from 'react';

export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        placeholder="Search ministries..."
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        className="search-input"
      />
      <button className="search-btn" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}
