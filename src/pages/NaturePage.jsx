import { useState, useCallback } from 'react';
import { getPromptForToday, getRandomPrompt } from '../data/naturePrompts';
import { getCurrentSeason } from '../data/practices';

export default function NaturePage({ onNavigate, onReflect }) {
  const [prompt, setPrompt] = useState(() => getPromptForToday());
  const season = getCurrentSeason();

  const refresh = useCallback(() => {
    setPrompt(getRandomPrompt());
  }, []);

  const handleSitWith = () => {
    onNavigate?.('sit');
  };

  const handleReflect = () => {
    onReflect?.(prompt.text);
  };

  return (
    <div className="px-5 pt-7 pb-24">
      <div className="mb-5">
        <h1 className="font-display text-[28px] font-light tracking-wide text-text mb-1">
          Nature
        </h1>
        <p className="font-display text-sm italic text-text-faint font-light">
          what is alive near you?
        </p>
      </div>

      {/* Season indicator */}
      <div className="flex items-center gap-2 mb-5">
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: '#6B8F71' }}
        />
        <span className="font-body text-xs text-text-faint tracking-wide">
          {season.name} — {season.theme}
        </span>
      </div>

      {/* Main prompt card */}
      <div
        className="rounded-[14px] p-6 mb-4"
        style={{
          background: 'rgba(255,255,255,0.8)',
          border: '1px solid rgba(107,143,113,0.15)',
          boxShadow: '0 2px 20px rgba(107,143,113,0.06)',
        }}
      >
        <p className="font-display text-[17px] text-text leading-relaxed font-light mb-4">
          {prompt.text}
        </p>
        {prompt.attribution && (
          <span className="font-body text-[11px] text-text-hint tracking-wide">
            — {prompt.attribution}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={handleSitWith}
          className="w-full px-6 py-4 rounded-full font-body text-sm font-medium text-bg tracking-wide"
          style={{
            background: 'linear-gradient(135deg, #6B8F71, #5A7D60)',
          }}
        >
          Sit with this for 5 minutes
        </button>

        <button
          onClick={handleReflect}
          className="w-full px-6 py-3.5 rounded-full font-body text-sm text-sage-dark tracking-wide"
          style={{
            border: '1px solid rgba(107,143,113,0.25)',
            background: 'rgba(107,143,113,0.06)',
          }}
        >
          Reflect on this with the coach
        </button>

        <button
          onClick={refresh}
          className="w-full px-6 py-3 rounded-full font-body text-xs text-text-hint tracking-wide"
          style={{
            border: '1px solid rgba(139,125,107,0.15)',
            background: 'transparent',
          }}
        >
          Another prompt
        </button>
      </div>

      {/* Just read */}
      <div className="text-center mt-8">
        <p className="font-body text-xs italic text-text-hint">
          Or just read. No action required. Attention is enough.
        </p>
      </div>

      {/* Sophie Strand quote */}
      <div className="mt-10 text-center px-4">
        <hr className="border-none h-px bg-border mb-6" />
        <p className="font-display text-sm italic text-text-faint leading-relaxed font-light">
          "You are already in the web. You just need to slow down enough to
          feel the threads."
        </p>
        <span className="block mt-2 font-body text-[10px] text-text-hint tracking-wide">
          — after Sophie Strand
        </span>
      </div>
    </div>
  );
}
