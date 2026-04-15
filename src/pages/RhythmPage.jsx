import { useState } from 'react';
import { DAYS, DAY_DATA, PRACTICE_DETAIL } from '../data/practices';

export default function RhythmPage() {
  const now = new Date();
  const todayIndex = now.getDay();
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="px-5 pt-7 pb-24">
      <div className="mb-5">
        <h1 className="font-display text-[28px] font-light tracking-wide text-text mb-1">
          The Rhythm
        </h1>
        <p className="font-display text-sm italic text-text-faint font-light">
          your weekly devotional map
        </p>
      </div>

      {/* Weekly schedule */}
      {DAYS.map((day, i) => {
        const d = DAY_DATA[day];
        const isToday = i === todayIndex;

        return (
          <div
            key={day}
            className="rounded-[14px] p-5 mb-3 backdrop-blur-sm"
            style={{
              background: isToday
                ? 'rgba(255,255,255,0.8)'
                : 'rgba(255,255,255,0.6)',
              border: isToday
                ? '1px solid rgba(107,143,113,0.2)'
                : '1px solid rgba(139,125,107,0.1)',
              boxShadow: isToday
                ? '0 2px 20px rgba(107,143,113,0.08)'
                : 'none',
            }}
          >
            <div className="flex justify-between items-baseline mb-1.5 flex-wrap gap-1">
              <span
                className="font-display text-[17px]"
                style={{
                  fontWeight: isToday ? 500 : 400,
                  color: isToday ? '#3D3830' : '#6B6050',
                }}
              >
                {day}{' '}
                {isToday && (
                  <span className="font-body text-[11px] text-sage font-medium">
                    TODAY
                  </span>
                )}
              </span>
              <span className="font-display text-[13px] italic text-text-faint">
                {d.theme}
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mb-2">
              {d.practices.map((p) => {
                const pd = PRACTICE_DETAIL[p];
                return (
                  <span
                    key={p}
                    className="inline-block font-body text-[11px] px-3 py-1 rounded-full"
                    style={{
                      background: `${pd.color}15`,
                      color: pd.color,
                      border: `1px solid ${pd.color}25`,
                    }}
                  >
                    {pd.icon} {pd.label}
                  </span>
                );
              })}
            </div>

            <p className="font-body text-xs italic text-text-hint leading-relaxed">
              {d.note}
            </p>
          </div>
        );
      })}

      {/* When you miss a day */}
      <div className="text-center py-7 mt-3">
        <div className="font-display text-base text-sage font-normal mb-3">
          When You Miss a Day
        </div>
        <p className="font-body text-[13px] text-text-muted leading-relaxed max-w-[360px] mx-auto italic">
          You will miss days. Do not add the missed practice to the next day.
          Do not make it mean anything about you. Simply{' '}
          <span className="text-sage-dark font-normal not-italic">
            begin again
          </span>
          .
        </p>
      </div>

      {/* Practice reference */}
      <div className="mt-2">
        <h3 className="font-body text-[11px] font-normal text-sage tracking-widest uppercase mb-3">
          practice reference
        </h3>

        {Object.entries(PRACTICE_DETAIL).map(([key, p]) => (
          <div
            key={key}
            className="bg-surface border border-border rounded-[14px] p-4 mb-3 backdrop-blur-sm"
            style={{ borderLeft: `3px solid ${p.color}30` }}
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-xl" style={{ color: p.color }}>
                {p.icon}
              </span>
              <div>
                <div className="font-display text-[17px] font-normal text-text">
                  {p.label}
                </div>
                <div className="font-body text-[11px] text-text-faint">
                  {p.duration} · {p.time}
                </div>
              </div>
            </div>
            <p className="font-body text-[13px] text-text-muted leading-relaxed">
              {p.description}
            </p>
          </div>
        ))}
      </div>

      {/* Permission slip */}
      <div
        className="mt-5 p-5 rounded-xl text-center"
        style={{
          background: 'rgba(107,143,160,0.06)',
          border: '1px solid rgba(107,143,160,0.1)',
        }}
      >
        <div className="font-display text-[15px] text-water mb-2.5">
          A Permission Slip
        </div>
        <div className="font-body text-[13px] text-text-muted leading-loose">
          You have permission to start with less than you think you should.
          <br />
          You have permission to modify every practice on migraine days.
          <br />
          You have permission to let rest be the most radical thing you do.
          <br />
          You have permission to let this be enough.
        </div>
      </div>
    </div>
  );
}
