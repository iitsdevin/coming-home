import { useState } from 'react';
import { DAYS, DAY_DATA, PRACTICE_DETAIL, STATES, QUOTES, getCurrentSeason } from '../data/practices';
import { saveStateCheckIn, getTodayState } from '../data/storage';
import Timer from '../components/Timer';

export default function TodayPage({ onNavigate }) {
  const now = new Date();
  const dayName = DAYS[now.getDay()];
  const today = DAY_DATA[dayName];
  const hour = now.getHours();
  const season = getCurrentSeason();
  const savedState = getTodayState();
  const [selectedState, setSelectedState] = useState(
    savedState ? STATES.find((s) => s.id === savedState) : null
  );
  const [showTimer, setShowTimer] = useState(false);
  const quote = QUOTES[now.getDate() % QUOTES.length];

  const timeOfDay =
    hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  const greeting =
    timeOfDay === 'morning'
      ? 'Good morning'
      : timeOfDay === 'afternoon'
        ? 'Good afternoon'
        : 'Good evening';

  const suggestedPractice = (() => {
    if (timeOfDay === 'morning') return PRACTICE_DETAIL.zazen;
    const eveningPractice = today.practices.find(
      (p) => p !== 'zazen' && p !== 'rest'
    );
    return eveningPractice
      ? PRACTICE_DETAIL[eveningPractice]
      : PRACTICE_DETAIL.threshold;
  })();

  const handleStateSelect = (state) => {
    if (selectedState?.id === state.id) {
      setSelectedState(null);
    } else {
      setSelectedState(state);
      saveStateCheckIn(state.id);
    }
  };

  return (
    <div className="px-5 pt-7 pb-24">
      {/* Header */}
      <div className="mb-7">
        <h1 className="font-display text-[28px] font-light tracking-wide text-text mb-1">
          {greeting}
        </h1>
        <p className="font-display text-sm italic text-text-faint font-light">
          {dayName} — {today.theme}
        </p>
        <p className="font-body text-[11px] text-text-hint tracking-wide mt-1">
          {season.name} · {season.description}
        </p>
      </div>

      {/* Quote */}
      <div className="bg-surface border border-border rounded-[14px] p-5 mb-4 backdrop-blur-sm text-center">
        <p className="font-display text-base italic text-text-muted font-light leading-relaxed">
          "{quote.text}"
        </p>
        <span className="block mt-2 font-body text-[11px] text-text-hint tracking-wide not-italic">
          — {quote.author}
        </span>
      </div>

      {/* Suggested practice */}
      <div className="mt-6">
        <h3 className="font-body text-[11px] font-normal text-sage tracking-widest uppercase mb-2">
          suggested now
        </h3>
        <div
          className="rounded-[14px] p-5 mb-4"
          style={{
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(107,143,113,0.2)',
            boxShadow: '0 2px 20px rgba(107,143,113,0.08)',
          }}
        >
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-xl" style={{ color: suggestedPractice.color }}>
              {suggestedPractice.icon}
            </span>
            <div>
              <div className="text-base font-normal text-text font-display">
                {suggestedPractice.label}
              </div>
              <div className="font-body text-xs text-text-faint">
                {suggestedPractice.duration}
              </div>
            </div>
          </div>
          <p className="font-body text-[13px] text-text-muted leading-relaxed mb-3">
            {suggestedPractice.description}
          </p>
          <div className="flex gap-2">
            {suggestedPractice.label === 'Zazen' && (
              <button
                onClick={() => setShowTimer(!showTimer)}
                className="px-5 py-3 rounded-full font-body text-sm font-medium text-bg tracking-wide"
                style={{
                  background: 'linear-gradient(135deg, #6B8F71, #5A7D60)',
                }}
              >
                {showTimer ? 'Close Timer' : 'Open Timer'}
              </button>
            )}
            {suggestedPractice.label === 'Zazen' && (
              <button
                onClick={() => onNavigate?.('sit')}
                className="px-4 py-2.5 rounded-full font-body text-xs text-sage-dark"
                style={{
                  border: '1px solid rgba(139,125,107,0.2)',
                  background: 'rgba(255,255,255,0.5)',
                }}
              >
                Full Timer
              </button>
            )}
          </div>
        </div>
        {showTimer && (
          <div className="bg-surface border border-border rounded-[14px] p-5 -mt-2 mb-4 backdrop-blur-sm">
            <Timer />
          </div>
        )}
      </div>

      {/* Today's rhythm */}
      <div className="mt-7">
        <h3 className="font-body text-[11px] font-normal text-sage tracking-widest uppercase mb-2">
          today's rhythm
        </h3>
        <div className="bg-surface border border-border rounded-[14px] p-5 backdrop-blur-sm">
          <div className="flex flex-wrap gap-1 mb-3">
            {today.practices.map((p) => {
              const d = PRACTICE_DETAIL[p];
              return (
                <span
                  key={p}
                  className="inline-block font-body text-[11px] px-3 py-1 rounded-full mr-1 mb-1"
                  style={{
                    background: `${d.color}15`,
                    color: d.color,
                    border: `1px solid ${d.color}25`,
                  }}
                >
                  {d.icon} {d.label}
                </span>
              );
            })}
          </div>
          <p className="font-body text-[13px] italic text-text-faint leading-relaxed">
            {today.note}
          </p>
        </div>
      </div>

      {/* State check-in */}
      <div className="mt-7">
        <h3 className="font-body text-[11px] font-normal text-sage tracking-widest uppercase mb-2">
          how are you arriving?
        </h3>
        <div className="bg-surface border border-border rounded-[14px] p-5 backdrop-blur-sm">
          <div className="flex flex-wrap gap-1.5 mb-0">
            {STATES.map((s) => (
              <button
                key={s.id}
                onClick={() => handleStateSelect(s)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full font-body text-xs transition-all"
                style={{
                  border:
                    selectedState?.id === s.id
                      ? `1px solid ${s.color}`
                      : '1px solid rgba(139,125,107,0.15)',
                  background:
                    selectedState?.id === s.id
                      ? `${s.color}15`
                      : 'transparent',
                  color:
                    selectedState?.id === s.id ? s.color : '#8B7D6B',
                }}
              >
                <span>{s.emoji}</span> {s.label}
              </button>
            ))}
          </div>
          {selectedState && (
            <div
              className="mt-4 p-3.5 rounded-[10px]"
              style={{
                background: `${selectedState.color}08`,
                border: `1px solid ${selectedState.color}15`,
              }}
            >
              <p className="font-body text-[13px] italic leading-relaxed" style={{ color: selectedState.color }}>
                {selectedState.suggestion}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
