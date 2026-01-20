import { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapComponent from './components/Map';
import Sidebar from './components/Sidebar';
import LodgeTrackModal from './components/LodgeTrackModal';
import LoginModal from './components/LoginModal';
import AboutModal from './components/AboutModal';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import AdminDashboard from './components/AdminDashboard';
import { supabase } from './lib/supabaseClient';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { trails as starterTrails } from './data/trails';
import './index.css';

function Dashboard() {
  const { user } = useAuth();
  // Initialize with starter trails so they are ALWAYS visible
  const [trails, setTrails] = useState(starterTrails);
  const [errorEnv, setErrorEnv] = useState(null);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState('');
  const [isLodgeModalOpen, setIsLodgeModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Fetch trails from Supabase
  useEffect(() => {
    fetchTrails();
  }, []);

  async function fetchTrails() {
    try {
      setErrorEnv(null);
      const { data, error } = await supabase
        .from('trails')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        // combine remote data with starter trails
        // Prevent duplicates if you ran the seed script
        const existingNames = new Set(starterTrails.map(t => t.name));
        const newRemoteTrails = data.filter(t => !existingNames.has(t.name));

        setTrails([...newRemoteTrails, ...starterTrails]);
      } else {
        // If DB empty, just keep starter trails
        setTrails(starterTrails);
      }
    } catch (error) {
      console.error('Error fetching trails:', error);
      setErrorEnv(error.message || "Failed to connect to Supabase");
      // On error, we still have starterTrails in state, so we do nothing
    }
  }

  // Filter Logic
  const filteredTrails = useMemo(() => {
    return trails.filter(trail => {
      const matchesSearch = trail.name.toLowerCase().includes(search.toLowerCase()) ||
        trail.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filters.length === 0 || filters.includes(trail.level);
      return matchesSearch && matchesFilter;
    });
  }, [trails, filters, search]);

  const handleLodgeClick = () => {
    if (user) {
      setIsLodgeModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLodgeTrack = (newTrack) => {
    setTrails(prev => [newTrack, ...prev]);
  };

  const toggleFilter = (level) => {
    setFilters(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleTrailSelect = (trail) => {
    console.log("Selected:", trail.name);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-slate-50 text-slate-900">
      {/* Sidebar - Order 2 on mobile (bottom), Order 1 on desktop (left) */}
      <div className="order-2 w-full flex-1 min-h-0 md:w-[400px] md:h-full md:flex-shrink-0 md:order-1 z-20 shadow-xl md:shadow-none relative">
        <Sidebar
          trails={filteredTrails}
          onSearch={setSearch}
          onFilter={toggleFilter}
          selectedFilters={filters}
          onLodgeClick={handleLodgeClick}
          onTrailSelect={handleTrailSelect}
          onAboutClick={() => setIsAboutModalOpen(true)}
          error={errorEnv}
        />
      </div>

      {/* Map - Order 1 on mobile (top), Order 2 on desktop (right) */}
      <div className="order-1 w-full h-[40vh] md:h-full md:flex-1 md:order-2 relative z-10">
        <MapComponent
          trails={filteredTrails}
          onTrailSelect={handleTrailSelect}
        />
      </div>

      {/* Modals */}
      <LodgeTrackModal
        isOpen={isLodgeModalOpen}
        onClose={() => setIsLodgeModalOpen(false)}
        onSubmit={handleLodgeTrack}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
