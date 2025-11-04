// src/App.js
import React, { useState, useEffect } from 'react';
import { fetchMinistries } from './services/ministryService';
import SearchBar from './components/SearchBar';
import TagFilter from './components/TagFilter';
import MinistriesGrid from './components/MinistriesGrid';

const COMMON_TAGS = ['worship', 'youth', 'mission', 'family', 'community', 'outreach'];

function App() {
  const [searchTerms, setSearchTerms] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [ministries, setMinistries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulated initial data (replace with Firebase fetch in real app)
 useEffect(() => {
    async function loadMinistries() {
      setLoading(true);
      try {
        const data = await fetchMinistries();
        console.log('[App] Ministries received:', data);
        setMinistries(data);
      } catch (e) {
        console.error('[App] Error in loadMinistries:', e);
      }
      setLoading(false);
    }
    loadMinistries();
  }, []);
  // Filtering logic
  const filteredMinistries = ministries.filter((ministry) => {
    const searchLower = searchTerms.toLowerCase();
    const matchesSearch =
      ministry.name.toLowerCase().includes(searchLower) ||
      ministry.description.toLowerCase().includes(searchLower) ||
      ministry.tags.some((tag) => tag.toLowerCase().includes(searchLower));
    const matchesTag =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => ministry.tags.includes(tag));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="app">
      <header className="header">
        <h1>Directorio de ministerios </h1>
        <p>Find ministries and Christian groups in your area</p>
      </header>
      <SearchBar
        value={searchTerms}
        onChange={setSearchTerms}
        onSearch={() => {}}
      />
      <TagFilter
        tags={COMMON_TAGS}
        selectedTags={selectedTags}
        onToggleTag={(tag) =>
          setSelectedTags((prev) =>
            prev.includes(tag)
              ? prev.filter((t) => t !== tag)
              : [...prev, tag]
          )
        }
      />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <MinistriesGrid ministries={filteredMinistries} />
      )}
    </div>
  );
}

export default App;
