// src/App.js
import React, { useState, useEffect } from 'react';
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
    setLoading(true);
    setTimeout(() => {
      setMinistries([
        {
          id: '1',
          name: 'Grace Community Church',
          description: 'Welcoming community focused on worship and service',
          tags: ['worship', 'community', 'family'],
          phone: '555-0123',
          email: 'contact@grace.org',
          website: 'https://grace.org',
        },
        // Add more ministries here
      ]);
      setLoading(false);
    }, 1000);
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
        <h1>Christian Ministry Directory</h1>
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
