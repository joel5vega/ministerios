import React, { useState, useEffect, useRef } from 'react';
import { fetchMinistries } from './services/ministryService';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import TagFilter from './components/TagFilter';
import MinistriesGrid from './components/MinistriesGrid';
import MinistryForm from './components/MinistryForm';
import './App.css';
import { onAuthStateChanged, loginWithGoogle, logout } from './services/authService';
import Profile from './components/Profile';

const COMMON_TAGS = ['servicio', 'jovenes', 'misiones', 'familia', 'comunidad', 'evangelismo','discipulado'];

function App() {
  const [searchTerms, setSearchTerms] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [ministries, setMinistries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Refs for sections
  const homeRef = useRef(null);
  const ministriesRef = useRef(null);
  const addRef = useRef(null);
  const profileRef = useRef(null);

const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(setUser);
  return unsubscribe;
}, []);
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
  }, [refresh]);

  // Filtering logic
  const filteredMinistries = ministries.filter((ministry) => {
    const searchLower = searchTerms.toLowerCase();
    const matchesSearch =
      ministry.name.toLowerCase().includes(searchLower) ||
      ministry.description.toLowerCase().includes(searchLower) ||
      (ministry.tags && ministry.tags.some((tag) => tag.toLowerCase().includes(searchLower)));
    const matchesTag =
      selectedTags.length === 0 ||
      (ministry.tags && selectedTags.some((tag) => ministry.tags.includes(tag)));
    return matchesSearch && matchesTag;
  });

  // Scroll to section
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="app">
      <Navbar
        user={user}
  onLogin={loginWithGoogle}
  onLogout={logout}
        onNavigate={(section) => {
          if (section === 'home') scrollToSection(homeRef);
          if (section === 'ministries') scrollToSection(ministriesRef);
          if (section === 'add') scrollToSection(addRef);
            if (section === 'profile') scrollToSection(profileRef);
        }}
      />

      {/* Home Section */}
      <section ref={homeRef} className="section home-section">
        <header className="header">
          <h1>Directorio de Ministerios</h1>
          <p>Encuentra oportunidades de servicio para ejercer tus dones espirituales</p>
        </header>
      </section>

      {/* Ministries Section */}
      <section ref={ministriesRef} className="section ministries-section">
        <h2 className="section-title">Explorar Ministerios</h2>
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
          <div className="loading">Cargando...</div>
        ) : (
          <MinistriesGrid ministries={filteredMinistries} />
        )}
      </section>

      {/* Add Ministry Section */}
      <section ref={addRef} className="section add-section">
        <h2 className="section-title">Agregar Ministerio</h2>
        {user ? (
  <MinistryForm onAdded={() => setRefresh(r => !r)} user={user} />
) : (
  <div className="section-block">Ingrese para añadir ministerio</div>
)}
      </section>
      <section ref={profileRef} className="section profile-section">
  <Profile user={user} />
</section>
    </div>
  );
}

export default App;