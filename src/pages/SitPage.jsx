import { useState } from 'react';
import Timer from '../components/Timer';
import { saveSitSession, getSitSessions } from '../data/storage';

export default function SitPage() {
  const [justCompleted, setJustCompleted] = useState(null);

  const handleComplete = (duration) => {
    saveSitSession(duration, 'zazen');
    setJustCompleted({ duration, at: Date.now() });
  };

  const sessions = getSitSessions();
  const totalThisWeek = sessions
    .filter((s) => Date.now() - new Date(s.date).getTime() < 7 * 86400000)
    .reduce((acc, s) => acc + (s.duration || 0), 0);
  const weekMin = Math.round(totalThisWeek / 60);

  return (
    <div className="px-6 pt-10">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="font-display font-light tracking-wide mb-1"
          style={{ fontSize: '30px', color: '#3D3830', lineHeight: 1.15 }}
        >
          Sit
        </h1>
        <p className="font-display italic font-light" style={{ fontSize: '15px', color: '#8B7D6B' }}>
          just this
        </p>
      </div>

      {/* Instructions — quieter, no frame */}
      <div className="mb-8 px-1">
        <p
          className="font-body leading-relaxed mb-3"
          style={{ fontSize: '14px', color: '#6B6050', lineHeight: 1.7 }}
        >
          Spine long. Hands in cosmic mudra. Eyes soft, gaze down.
        </p>
        <p
          className="font-body leading-relaxed mb-3"
          style={{ fontSize: '14px', color: '#6B6050', lineHeight: 1.7 }}
        >
          When thoughts come — and they will — label them gently:{' '}
          <em style={{ color: 'var(--season-accent)', fontStyle: 'italic' }}>thinking</em>.
          Return to the breath. Return to the body.
        </p>
        <p
          className="font-display italic font-light"
          style={{ fontSize: '15px', color: '#8B7D6B', lineHeight: 1.6 }}
        >
          You are not trying to get anywhere.
        </p>
      </div>

      {/* Timer — framed */}
      <div
        className="rounded-[14px] p-6 mb-6 backdrop-blur-sm"
        style={{
          background: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(139,125,107,0.12)',
        }}
      >
        <Timer onComplete={handleComplete} />
      </div>

      {/* Post-session acknowledgment — a soft noting, not a celebration */}
      {justCompleted && (
        <div
          className="rounded-[14px] p-5 mb-6 text-center"
          style={{
            background: 'rgba(107,143,113,0.06)',
            border: '1px solid rgba(107,143,113,0.15)',
          }}
        >
          <p
            className="font-display italic font-light"
            style={{ fontSize: '15px', color: '#5A7D60', lineHeight: 1.6 }}
          >
            {Math.round(justCompleted.duration / 60)} minutes of sitting.
            <br />
            Noted. Nothing to add.
          </p>
        </div>
      )}

      {/* Week total — quiet continuity */}
      {weekMin > 0 && (
        <div className="text-center mb-6">
          <p
            className="font-body"
            style={{ fontSize: '11px', color: '#A09080', letterSpacing: '0.14em', textTransform: 'uppercase' }}
          >
            this week · {weekMin} min of sitting
          </p>
        </div>
      )}

      {/* Other timings — softer */}
      <div className="text-center pb-4">
        <div
          className="mx-auto mb-5"
          style={{ width: '24px', height: '1px', background: 'rgba(139,125,107,0.25)' }}
        />
        <p
          className="font-body italic"
          style={{ fontSize: '12px', color: '#A09080', lineHeight: 1.7 }}
        >
          The timer holds any practice.<br />
          Threshold (5), sitting with a tree (10+), a long pause (as needed).<br />
          The bell doesn't judge.
        </p>
      </div>
    </div>
  );
}
