import { useRef, useCallback } from 'react';

export default function useBell() {
  const ctxRef = useRef(null);

  return useCallback((type = 'start') => {
    try {
      if (!ctxRef.current) {
        ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = ctxRef.current;

      if (type === 'start') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 432;
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 2.5);
      } else {
        // End bell: two-tone staggered
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.frequency.value = 528;
        gain1.gain.setValueAtTime(0.12, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);
        osc1.start(ctx.currentTime);
        osc1.stop(ctx.currentTime + 3.5);

        // Second tone after 800ms
        const startTime = ctx.currentTime + 0.8;
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.frequency.value = 396;
        gain2.gain.setValueAtTime(0.001, ctx.currentTime);
        gain2.gain.setValueAtTime(0.1, startTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, startTime + 3);
        osc2.start(startTime);
        osc2.stop(startTime + 3);
      }
    } catch (e) {
      // Audio context may not be available
    }
  }, []);
}
