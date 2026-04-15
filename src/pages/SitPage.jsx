import Timer from '../components/Timer';
import { saveSitSession } from '../data/storage';

export default function SitPage() {
  const handleComplete = (duration) => {
    saveSitSession(duration, 'zazen');
  };

  return (
    <div className="px-5 pt-7 pb-24">
      <div className="mb-5">
        <h1 className="font-display text-[28px] font-light tracking-wide text-text mb-1">
          Sit
        </h1>
        <p className="font-display text-sm italic text-text-faint font-light">
          just this
        </p>
      </div>

      <div className="bg-surface border border-border rounded-[14px] p-5 backdrop-blur-sm">
        <div className="font-body text-[13px] text-text-muted leading-relaxed mb-5">
          <p className="mb-2">
            Spine long. Hands in cosmic mudra. Eyes soft, gaze down.
          </p>
          <p className="mb-2">
            When thoughts come — and they will — label them gently:{' '}
            <em className="text-sage">thinking</em>. Return to the breath.
            Return to the body.
          </p>
          <p>You are not trying to get anywhere.</p>
        </div>
        <hr className="border-none h-px bg-border my-5" />
        <Timer onComplete={handleComplete} />
      </div>

      <div className="bg-surface border border-border rounded-[14px] p-5 mt-4 text-center backdrop-blur-sm">
        <h3 className="font-body text-[11px] font-normal text-sage tracking-widest uppercase mb-2">
          other timings
        </h3>
        <div className="font-body text-[13px] text-text-faint leading-relaxed">
          <p>
            <span className="font-normal text-sage-dark">
              Threshold Ritual
            </span>{' '}
            — 5 min
          </p>
          <p>
            <span className="font-normal text-sage-dark">
              Sitting with a Tree
            </span>{' '}
            — 10+ min
          </p>
          <p className="mt-2 italic text-xs">
            Use the timer for any practice. The bell doesn't judge.
          </p>
        </div>
      </div>
    </div>
  );
}
