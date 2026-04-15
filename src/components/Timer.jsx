import { useState, useEffect, useRef } from 'react';
import useBell from '../hooks/useBell';
import BreathCircle from './BreathCircle';

const PRESETS = [
  { label: '5 min', seconds: 300 },
  { label: '10 min', seconds: 600 },
  { label: '15 min', seconds: 900 },
  { label: '20 min', seconds: 1200 },
];

export default function Timer({ initialDuration = 600, onComplete }) {
  const [duration, setDuration] = useState(initialDuration);
  const [remaining, setRemaining] = useState(initialDuration);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);
  const bell = useBell();

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            setDone(true);
            bell('end');
            onComplete?.(duration);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const pick = (s) => {
    clearInterval(intervalRef.current);
    setDuration(s);
    setRemaining(s);
    setRunning(false);
    setDone(false);
  };

  const toggle = () => {
    if (done) {
      pick(duration);
      return;
    }
    if (!running) bell('start');
    setRunning(!running);
  };

  const reset = () => pick(duration);

  const min = Math.floor(remaining / 60);
  const sec = remaining % 60;
  const progress = duration > 0 ? 1 - remaining / duration : 0;
  const R = 90;
  const C = 2 * Math.PI * R;

  return (
    <div className="text-center">
      {/* Duration presets */}
      <div className="flex justify-center gap-1.5 mb-5 flex-wrap">
        {PRESETS.map((p) => (
          <button
            key={p.seconds}
            onClick={() => pick(p.seconds)}
            className="px-4 py-2 rounded-full font-body text-xs transition-all"
            style={{
              border:
                duration === p.seconds
                  ? '1px solid #6B8F71'
                  : '1px solid rgba(139,125,107,0.15)',
              background:
                duration === p.seconds
                  ? 'rgba(107,143,113,0.1)'
                  : 'transparent',
              color: duration === p.seconds ? '#5A6B52' : '#8B7D6B',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <BreathCircle running={running} />

      {/* Progress ring */}
      <div className="relative w-[200px] h-[200px] mx-auto mb-5">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke="rgba(107,143,113,0.08)"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke={
              done
                ? '#8B9F85'
                : running
                  ? '#6B8F71'
                  : 'rgba(107,143,113,0.2)'
            }
            strokeWidth="2"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
            strokeLinecap="round"
            style={{
              transition: running ? 'stroke-dashoffset 1s linear' : 'none',
            }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          {done ? (
            <div>
              <div className="text-lg text-sage mb-1">done</div>
              <div className="font-body text-xs text-text-faint italic">
                begin again
              </div>
            </div>
          ) : (
            <div className="text-4xl font-light text-text tracking-wider font-display">
              {min}:{sec.toString().padStart(2, '0')}
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button
          onClick={toggle}
          className="px-7 py-3.5 rounded-full font-body text-sm font-medium tracking-wide text-bg"
          style={{
            background: 'linear-gradient(135deg, #6B8F71, #5A7D60)',
          }}
        >
          {done ? 'Again' : running ? 'Pause' : 'Begin'}
        </button>
        {(running || remaining !== duration) && !done && (
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-full font-body text-xs text-sage-dark"
            style={{
              border: '1px solid rgba(139,125,107,0.2)',
              background: 'rgba(255,255,255,0.5)',
            }}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
