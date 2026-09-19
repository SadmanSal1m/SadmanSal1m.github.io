// @ts-nocheck
"use client";
/* Vendored from React Bits (reactbits.dev) — https://github.com/DavidHDev/react-bits
 * License: MIT + Commons Clause. Adapted: TypeScript nocheck, CSS in globals.css, icon packages replaced with inline SVG. */

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const HOLD_AT = 0.9;
const SHAKE = [0, -1, 1, -0.66, 0.66, -0.33, 0];
const WORDS = { running: 'running', done: 'done', error: 'failed', idle: 'queued' };
const fmt = ms => (ms < 10000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(1)} s`);
const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const glyphOf = s => (s === 'done' ? 'check' : s === 'error' ? 'retry' : 'tool');
const Svg = ({ d, size, sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);
const ICONS = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  terminal: <><path d="m4 17 6-5-6-5" /><path d="M12 19h8" /></>,
  file: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6" /></>,
  edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>,
  scan: <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /><circle cx="12" cy="12" r="3.5" /></>
};
const TICK = <path d="m5 12 4.5 4.5L19 7" />;
const RETRY = <><path d="M21 12a9 9 0 1 1-2.6-6.4" /><path d="M21 3v6h-6" /></>;

export default function CallChip({
  icon = 'terminal', name = 'bash', argument = 'npm test', status = 'running', expectedMs = 2500, size = 34, radius = 10,
  color = 'currentColor', surfaceColor = '#27272a', progressColor = 'currentColor', progressOpacity = 0.08, doneColor = '#22c55e',
  errorColor = '#ef4444', washOpacity = 0.14, shake = 6, showTimer = true, onRetry, className = '', style
}) {
  const rootRef = useRef(null); const fillRef = useRef(null); const timerRef = useRef(null); const mountedRef = useRef(false);
  const fraction = useRef(0); const clock = useRef({ ms: 0 }); const shakeAnim = useRef(null); const statusRef = useRef(status); statusRef.current = status;
  const [mounted, setMounted] = useState(false); const [pressed, setPressed] = useState(false); const [announce, setAnnounce] = useState('');
  const roll = useRef({ cur: glyphOf(status), prev: null });
  if (glyphOf(status) !== roll.current.cur) roll.current = { cur: glyphOf(status), prev: roll.current.cur };
  const setFraction = (f, instant) => { const fill = fillRef.current; if (!fill) return; fraction.current = f; if (instant) fill.style.transition = 'none'; fill.style.transform = `scaleX(${f})`; if (instant) { void fill.getBoundingClientRect(); fill.style.transition = ''; } };
  const apply = (s, animate) => {
    if (s === 'running') { shakeAnim.current?.cancel(); setFraction(0, true); if (animate) setFraction(HOLD_AT, false); }
    else if (s === 'done') { setFraction(1, !animate); }
    else if (s === 'error') { const fill = fillRef.current; const live = fill ? new DOMMatrix(getComputedStyle(fill).transform).a : fraction.current; setFraction(Math.min(1, Math.max(0, live)), true);
      if (animate && shake > 0 && !reduceMotion() && rootRef.current) shakeAnim.current = rootRef.current.animate(SHAKE.map(k => ({ transform: `translateX(${k * shake}px)`, easing: 'cubic-bezier(0.77, 0, 0.175, 1)' })), { duration: 450, composite: 'add' }); }
    else setFraction(0, true);
  };
  useEffect(() => { mountedRef.current = true; setMounted(true); apply(statusRef.current, statusRef.current === 'running'); return () => { mountedRef.current = false; shakeAnim.current?.cancel(); }; }, []);
  useLayoutEffect(() => { if (mountedRef.current) apply(status, true); }, [status]);
  useEffect(() => {
    const write = ms => { clock.current.ms = ms; if (timerRef.current) timerRef.current.textContent = fmt(ms); };
    if (status !== 'running') { if ((status === 'idle' || !clock.current.ms) && timerRef.current) timerRef.current.textContent = '—'; return undefined; }
    const startedAt = performance.now(); write(0);
    if (reduceMotion()) { const id = setInterval(() => write(performance.now() - startedAt), 100); return () => { clearInterval(id); write(performance.now() - startedAt); }; }
    let raf = 0; const tick = () => { write(performance.now() - startedAt); raf = requestAnimationFrame(tick); }; tick();
    return () => { cancelAnimationFrame(raf); write(performance.now() - startedAt); };
  }, [status]);
  useEffect(() => { const ms = showTimer && clock.current.ms ? Math.round(clock.current.ms) : 0; const when = status === 'done' && ms ? ` in ${ms} ms` : status === 'error' && ms ? ` after ${ms} ms` : ''; setAnnounce(`${name} ${argument}, ${WORDS[status] ?? status}${when}`); }, [status]);
  const font = Math.max(11, Math.round(size * 0.38)); const iconSize = font + 2;
  const glyphState = g => (g === roll.current.cur ? 'in' : g === roll.current.prev ? 'out' : undefined);
  const toolIcon = typeof icon === 'string' ? (ICONS[icon] ?? ICONS.terminal) : null;
  return (
    <span ref={rootRef} role="status" aria-busy={status === 'running' || undefined} data-status={status} data-mounted={mounted ? '' : undefined} data-pressed={pressed ? '' : undefined} className={`call-chip${className ? ` ${className}` : ''}`}
      style={{ '--cc-size': `${size}px`, '--cc-font': `${font}px`, '--cc-pad': `${Math.round(size * 0.35)}px`, '--cc-gap': `${Math.round(font * 0.55)}px`, '--cc-radius': `${radius}px`, '--cc-color': color, '--cc-surface': surfaceColor, '--cc-progress': progressColor, '--cc-progress-pct': `${progressOpacity * 100}%`, '--cc-done': doneColor, '--cc-error': errorColor, '--cc-wash-pct': `${washOpacity * 100}%`, '--cc-expected': `${expectedMs}ms`, ...style }}>
      <span ref={fillRef} className="call-chip__fill" aria-hidden="true" />
      <span className="call-chip__slot" aria-hidden="true">
        <span className="call-chip__glyph" data-state={glyphState('tool')}>{toolIcon ? <Svg d={toolIcon} size={iconSize} /> : icon}</span>
        <span className="call-chip__glyph" data-state={glyphState('check')}><Svg d={TICK} size={iconSize} sw={2.2} /></span>
        <span className="call-chip__glyph" data-state={glyphState('retry')}><Svg d={RETRY} size={iconSize} sw={2} /></span>
      </span>
      <span className="call-chip__name" aria-hidden="true">{name}</span>
      <span className="call-chip__arg" aria-hidden="true">{argument}</span>
      {showTimer ? <span ref={timerRef} className="call-chip__timer" aria-hidden="true">0 ms</span> : null}
      {status === 'error' && onRetry ? <button type="button" className="call-chip__retry" aria-label={`Retry ${name} ${argument}`} onClick={() => onRetry()} onPointerDown={() => setPressed(true)} onPointerUp={() => setPressed(false)} onPointerCancel={() => setPressed(false)} /> : null}
      <span className="call-chip__sr">{announce}</span>
    </span>
  );
}
