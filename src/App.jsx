import { useState, useEffect } from 'react';
import TodayPage from './pages/TodayPage';
import SitPage from './pages/SitPage';
import NaturePage from './pages/NaturePage';
import CoachPage from './pages/CoachPage';
import RhythmPage from './pages/RhythmPage';

const TABS = [
  { id: 'today', label: 'Today' },
  { id: 'sit', label: 'Sit' },
  { id: 'nature', label: 'Nature' },
  { id: 'coach', label: 'Coach' },
  { id: 'rhythm', label: 'Rhythm' },
];

export default function App() {
  const [tab, setTab] = useState('today');
  const [coachPrompt, setCoachPrompt] = useState(null);

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(import.meta.env.BASE_URL + 'sw.js').catch(() => {});
    }
  }, []);

  const handleNavigate = (tabId) => {
    setTab(tabId);
    window.scrollTo(0, 0);
  };

  const handleReflect = (promptText) => {
    setCoachPrompt(promptText);
    setTab('coach');
    window.scrollTo(0, 0);
  };

  // Clear coach prompt when leaving coach tab
  const handleTabChange = (tabId) => {
    if (tab === 'coach') setCoachPrompt(null);
    handleNavigate(tabId);
  };

  return (
    <div
      className="font-display min-h-screen max-w-[480px] mx-auto relative overflow-hidden"
      style={{
        background:
          'linear-gradient(170deg, #F7F5F0 0%, #EDE8E0 40%, #E8E4DC 100%)',
        color: '#3D3830',
      }}
    >
      {/* Navigation */}
      <nav
        className="flex justify-center sticky top-0 z-10"
        style={{
          borderBottom: '1px solid rgba(139,125,107,0.15)',
          background: 'rgba(247,245,240,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTabChange(t.id)}
            className="font-body text-xs tracking-widest uppercase py-4 px-3.5 transition-all"
            style={{
              fontWeight: tab === t.id ? 500 : 300,
              color: tab === t.id ? '#5A6B52' : '#A09080',
              borderBottom:
                tab === t.id
                  ? '2px solid #5A6B52'
                  : '2px solid transparent',
              background: 'none',
            }}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* Pages */}
      {tab === 'today' && <TodayPage onNavigate={handleNavigate} />}
      {tab === 'sit' && <SitPage />}
      {tab === 'nature' && (
        <NaturePage onNavigate={handleNavigate} onReflect={handleReflect} />
      )}
      {tab === 'coach' && <CoachPage initialPrompt={coachPrompt} />}
      {tab === 'rhythm' && <RhythmPage />}
    </div>
  );
}
