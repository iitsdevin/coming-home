import { useState, useEffect } from 'react';

export default function BreathCircle({ running }) {
  const [phase, setPhase] = useState(0); // 0 = inhale, 1 = exhale

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setPhase((p) => (p + 1) % 2), 4000);
    return () => clearInterval(id);
  }, [running]);

  const scale = running ? (phase === 0 ? 1.15 : 0.95) : 1;
  const label = running ? (phase === 0 ? 'breathe in' : 'breathe out') : '';

  return (
    <div className="flex flex-col items-center my-4">
      <div
        className="w-16 h-16 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(107,143,113,${running ? 0.12 : 0.06}) 0%, transparent 70%)`,
          border: `1px solid rgba(107,143,113,${running ? 0.2 : 0.1})`,
          transform: `scale(${scale})`,
          transition: 'transform 4s ease-in-out',
        }}
      />
      <span className="font-body text-[11px] text-sage-light italic mt-2 h-4">
        {label}
      </span>
    </div>
  );
}
