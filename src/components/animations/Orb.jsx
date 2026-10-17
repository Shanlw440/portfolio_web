import React, { useEffect, useState } from 'react';
import './Orb.css';

/** Lightweight SVG/CSS orb. No WebGL, external images or extra dependencies. */
export default function Orb({
  colors = ['#9c43fe', '#4cc2e9', '#101499'],
  followCursor = true,
  rotateOnHover = true,
  hoverIntensity = 0.8,
  speed = 0.65,
  glow = 1.2,
  className = '',
  style = {},
}) {
  const [pointer, setPointer] = useState({ x: 0, y: 0, active: false });
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  const [purple, cyan, deep] = colors;
  const dx = !reducedMotion && followCursor ? pointer.x * hoverIntensity * 9 : 0;
  const dy = !reducedMotion && followCursor ? pointer.y * hoverIntensity * 9 : 0;
  return (
    <div
      className={`sw-orb ${pointer.active ? 'sw-orb--hover' : ''} ${className}`}
      style={{ '--orb-purple': purple, '--orb-cyan': cyan, '--orb-deep': deep, '--orb-speed': `${Math.max(5, 18 / Math.max(0.2, speed))}s`, '--orb-glow': glow, ...style }}
      onPointerMove={(event) => {
        const r = event.currentTarget.getBoundingClientRect();
        setPointer({ x: Math.max(-1, Math.min(1, ((event.clientX - r.left) / r.width - 0.5) * 2)), y: Math.max(-1, Math.min(1, ((event.clientY - r.top) / r.height - 0.5) * 2)), active: true });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0, active: false })}
      role="img" aria-label="Animated purple and cyan energy orb"
    >
      <div className="sw-orb__halo" />
      <div className="sw-orb__movable" style={{ transform: `translate3d(${dx}px, ${dy}px, 0) ${rotateOnHover && pointer.active && !reducedMotion ? 'rotate(8deg)' : ''}` }}>
        <div className="sw-orb__outer" />
        <div className="sw-orb__ring sw-orb__ring--one" />
        <div className="sw-orb__ring sw-orb__ring--two" />
        <div className="sw-orb__ring sw-orb__ring--three" />
        <div className="sw-orb__core" />
        <div className="sw-orb__shine" />
      </div>
    </div>
  );
}
