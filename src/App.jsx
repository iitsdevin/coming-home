import { useState, useEffect } from 'react';
import TodayPage from './pages/TodayPage';
import SitPage from './pages/SitPage';
import NaturePage from './pages/NaturePage';
import CoachPage from './pages/CoachPage';
import RhythmPage from './pages/RhythmPage';
import { getCurrentSeason } from './data/practices';

const TABS = [
  { id: 'today',  label: 'Today',  glyph: '○' },
  { id: 'sit',    label: 'Sit',    glyph: '◯' },
  { id: 'nature', label: 'Nature', glyph: '∿' },
  { id: 'coach',  label: 'Coach',  glyph: '◈' },
  { id: 'rhythm', label: 'Rhythm', glyph: '☾' },
];

export default function App() {
  const [tab, setTab] = useState('today');
  const [coachPrompt, setCoachPrompt] = useState(null);

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(import.meta.env.BASE_URL + 'sw.js')
        .catch(() => {});
    }
  }, []);

  // Set seasonal data attribute so the CSS accent shifts with the Noongar year
  useEffect(() => {
    const season = getCurrentSeason();
    if (season?.name) {
      document.documentElement.setAttribute('data-season', season.name);
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

  const handleTabChange = (tabId) => {
    if (tab === 'coach' && tabId !== 'coach') setCoachPrompt(null);
    handleNavigate(tabId);
  };

  return (
    <div
      className="font-display min-h-screen max-w-[480px] mx-auto relative"
      style={{
        background:
          'linear-gradient(170deg, #F7F5F0 0%, #EDE8E0 40%, #E8E4DC 100%)',
        color: '#3D3830',
      }}
    >
      {/* Page content — keyed by tab so the fade-in re-runs on change */}
      <main key={tab} className="page-in pb-28 safe-top">
        {tab === 'today' && <TodayPage onNavigate={handleNavigate} />}
        {tab === 'sit' && <SitPage />}
        {tab === 'nature' && (
          <NaturePage onNavigate={handleNavigate} onReflect={handleReflect} />
        )}
        {tab === 'coach' && <CoachPage initialPrompt={coachPrompt} />}
        {tab === 'rhythm' && <RhythmPage />}
      </main>

      {/* Bottom navigation — thumb-friendly, out of the way of the content */}
      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-20 safe-bottom"
        style={{
          borderTop: '1px solid rgba(139,125,107,0.15)',
          background: 'rgba(247,245,240,0.92)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
        <div className="flex justify-around items-stretch">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id)}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-3"
                style={{ background: 'none' }}
                aria-label={t.label}
                aria-current={active ? 'page' : undefined}
              >
                <span
                  className="text-base leading-none"
                  style={{
                    color: active ? 'var(--season-accent)' : '#A09080',
                    transform: active ? 'scale(1.05)' : 'scale(1)',
                    transition: 'color 240ms ease, transform 240ms ease',
                  }}
                >
                  {t.glyph}
                </span>
                <span
                  className="font-body uppercase"
                  style={{
                    fontSize: '9.5px',
                    letterSpacing: '0.12em',
                    fontWeight: active ? 500 : 300,
                    color: active ? 'var(--season-accent)' : '#A09080',
                    transition: 'color 240ms ease',
                  }}
                >
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
