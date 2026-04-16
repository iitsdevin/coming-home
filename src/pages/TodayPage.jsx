import { useState } from 'react';
import { DAYS, DAY_DATA, PRACTICE_DETAIL, STATES, QUOTES, getCurrentSeason } from '../data/practices';
import { saveStateCheckIn, getTodayState } from '../data/storage';
import Timer from '../components/Timer';

// Map the user's state to a practice that actually meets them there.
// Overrides the default time-of-day suggestion when a state is set.
const STATE_TO_PRACTICE = {
  activated: 'threshold',
  flat:      'walk',
  pain:      'rest',
  foggy:     'threshold',
  grounded:  null, // follow the day's rhythm
  tender:    'zazen',
};

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

  // Pick a practice — state-aware if the user has checked in, time-aware otherwise.
  const suggestedPractice = (() => {
    if (selectedState) {
      const override = STATE_TO_PRACTICE[selectedState.id];
      if (override) return PRACTICE_DETAIL[override];
    }
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

  const isZazen = suggestedPractice.label === 'Zazen';

  return (
    <div className="px-6 pt-10">
      {/* Header — softer, more breath */}
      <div className="mb-8">
        <h1
          className="font-display font-light tracking-wide mb-1"
          style={{ fontSize: '30px', color: '#3D3830', lineHeight: 1.15 }}
        >
          {greeting}
        </h1>
        <p className="font-display italic font-light" style={{ fontSize: '15px', color: '#8B7D6B' }}>
          {dayName} — {today.theme}
        </p>
        <p
          className="font-body mt-1.5"
          style={{ fontSize: '11px', color: '#A09080', letterSpacing: '0.08em' }}
        >
          {season.name} · {season.description}
        </p>
      </div>

      {/* Quote — no frame, just breath */}
      <div className="mb-10 px-2">
        <p
          className="font-display italic font-light leading-relaxed"
          style={{ fontSize: '17px', color: '#6B6050', lineHeight: 1.55 }}
        >
          "{quote.text}"
        </p>
        <span
          className="block mt-2 font-body not-italic"
          style={{ fontSize: '11px', color: '#A09080', letterSpacing: '0.06em' }}
        >
          — {quote.author}
        </span>
      </div>

      {/* State check-in — anchored first, sets the tone */}
      <div className="mb-8">
        <h3
          className="font-body mb-3"
          style={{
            fontSize: '11px',
            color: 'var(--season-accent)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 400,
          }}
        >
          how are you arriving?
        </h3>
        <div
          className="rounded-[14px] p-5 backdrop-blur-sm"
          style={{
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(139,125,107,0.12)',
          }}
        >
          <div className="flex flex-wrap gap-1.5">
            {STATES.map((s) => {
              const active = selectedState?.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handleStateSelect(s)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full font-body transition-all"
                  style={{
                    fontSize: '12px',
                    border: active
                      ? `1px solid ${s.color}`
                      : '1px solid rgba(139,125,107,0.15)',
                    background: active ? `${s.color}15` : 'transparent',
                    color: active ? s.color : '#8B7D6B',
                  }}
                >
                  <span>{s.emoji}</span> {s.label}
                </button>
              );
            })}
          </div>
          {selectedState && (
            <div
              className="mt-4 p-3.5 rounded-[10px]"
              style={{
                background: `${selectedState.color}08`,
                border: `1px solid ${selectedState.color}15`,
              }}
            >
              <p
                className="font-body italic leading-relaxed"
                style={{ fontSize: '13px', color: selectedState.color }}
              >
                {selectedState.suggestion}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Suggested practice — now adapts to the state above */}
      <div className="mb-8">
        <h3
          className="font-body mb-3"
          style={{
            fontSize: '11px',
            color: 'var(--season-accent)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 400,
          }}
        >
          {selectedState ? 'for this moment' : 'suggested now'}
        </h3>
        <div
          className="rounded-[14px] p-5"
          style={{
            background: 'rgba(255,255,255,0.8)',
            border: `1px solid ${suggestedPractice.color}25`,
            boxShadow: `0 2px 20px ${suggestedPractice.color}10`,
          }}
        >
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-2xl leading-none" style={{ color: suggestedPractice.color }}>
              {suggestedPractice.icon}
            </span>
            <div>
              <div className="font-display font-normal" style={{ fontSize: '18px', color: '#3D3830' }}>
                {suggestedPractice.label}
              </div>
              <div className="font-body" style={{ fontSize: '12px', color: '#8B7D6B' }}>
                {suggestedPractice.duration}
              </div>
            </div>
          </div>
          <p
            className="font-body leading-relaxed mb-4"
            style={{ fontSize: '13.5px', color: '#6B6050', lineHeight: 1.6 }}
          >
            {suggestedPractice.description}
          </p>
          <div className="flex gap-2 flex-wrap">
            {isZazen && (
              <>
                <button
                  onClick={() => setShowTimer(!showTimer)}
                  className="px-5 py-3 rounded-full font-body tracking-wide"
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#F7F5F0',
                    background: `linear-gradient(135deg, ${suggestedPractice.color}, ${suggestedPractice.color}dd)`,
                  }}
                >
                  {showTimer ? 'Close timer' : 'Begin timer'}
                </button>
                <button
                  onClick={() => onNavigate?.('sit')}
                  className="px-4 py-2.5 rounded-full font-body"
                  style={{
                    fontSize: '12px',
                    color: '#5A7D60',
                    border: '1px solid rgba(139,125,107,0.2)',
                    background: 'rgba(255,255,255,0.5)',
                  }}
                >
                  Full sit page
                </button>
              </>
            )}
            {!isZazen && suggestedPractice.label !== 'Rest' && (
              <button
                onClick={() => onNavigate?.('nature')}
                className="px-4 py-2.5 rounded-full font-body"
                style={{
                  fontSize: '12px',
                  color: '#5A7D60',
                  border: '1px solid rgba(139,125,107,0.2)',
                  background: 'rgba(255,255,255,0.5)',
                }}
              >
                A prompt for going outside
              </button>
            )}
          </div>
        </div>
        {showTimer && isZazen && (
          <div
            className="rounded-[14px] p-5 mt-3 backdrop-blur-sm"
            style={{
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(139,125,107,0.12)',
            }}
          >
            <Timer />
          </div>
        )}
      </div>

      {/* Today's rhythm — the shape of the whole day */}
      <div className="mb-4">
        <h3
          className="font-body mb-3"
          style={{
            fontSize: '11px',
            color: 'var(--season-accent)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 400,
          }}
        >
          today's rhythm
        </h3>
        <div
          className="rounded-[14px] p-5 backdrop-blur-sm"
          style={{
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(139,125,107,0.12)',
          }}
        >
          <div className="flex flex-wrap gap-1.5 mb-3">
            {today.practices.map((p) => {
              const d = PRACTICE_DETAIL[p];
              return (
                <span
                  key={p}
                  className="inline-block font-body px-3 py-1 rounded-full"
                  style={{
                    fontSize: '11px',
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
          <p
            className="font-body italic leading-relaxed"
            style={{ fontSize: '13px', color: '#8B7D6B', lineHeight: 1.6 }}
          >
            {today.note}
          </p>
        </div>
      </div>
    </div>
  );
}
