import { useEffect, useRef } from 'react';
import './LetterGlitch.css';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]<>/*+=_';

export default function LetterGlitch({
  glitchColors = ['#A855F7', '#C084FC', '#7C3AED'],
  baseColor = '#7B669B',
  backgroundColor = '#0B0717',
  characters = DEFAULT_CHARS,
  fontSize = 13,
  density = 0.75,
  baseOpacity = 0.12,
  glitchAmount = 0.3,
  speed = 0.5,
  interactive = true,
  cursorRadius = 140,
  centerFade = 0.65,
  edgeFade = 0.15,
  clickEffect = 'tear',
  className = '',
  style,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const propsRef = useRef({});
  propsRef.current = { glitchColors, baseColor, backgroundColor, characters, fontSize, density, baseOpacity, glitchAmount, speed, interactive, cursorRadius, centerFade, edgeFade, clickEffect };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext('2d', { alpha: false });
    if (!ctx || !container) return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mouse = { x: -10000, y: -10000 };
    let width = 1, height = 1, raf = 0, last = 0, visible = true;
    let cols = 0, rows = 0, cells = [];

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, container.clientWidth);
      height = Math.max(1, container.clientHeight);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const { fontSize, characters } = propsRef.current;
      const stepX = fontSize * 1.45, stepY = fontSize * 1.85;
      cols = Math.ceil(width / stepX);
      rows = Math.ceil(height / stepY);
      cells = Array.from({length: cols * rows}, () => ({
        char: characters[Math.floor(Math.random() * characters.length)],
        hot: 0,
        seed: Math.random(),
      }));
      draw(0);
    }
    function draw(now) {
      const p = propsRef.current;
      const stepX = p.fontSize * 1.45, stepY = p.fontSize * 1.85;
      ctx.fillStyle = p.backgroundColor || '#0B0717';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${p.fontSize}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const moving = !motionQuery.matches && p.speed > 0;
      const tick = moving && now - last > Math.max(45, 150 / Math.max(p.speed, 0.1));
      if (tick) last = now;
      const palette = p.glitchColors?.length ? p.glitchColors : ['#A855F7'];
      for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
        const cell = cells[row * cols + col];
        if (!cell || cell.seed > p.density) continue;
        const x = (col + .5) * stepX, y = (row + .5) * stepY;
        const distance = Math.hypot(x - mouse.x, y - mouse.y);
        const near = moving && p.interactive && distance < p.cursorRadius;
        const glitch = tick && (near ? Math.random() < .5 : Math.random() < p.glitchAmount * .13);
        if (glitch) {
          cell.char = p.characters[Math.floor(Math.random() * p.characters.length)];
          cell.hot = near ? 1 : .7;
        } else cell.hot *= .93;
        const edge = Math.min(x, y, width - x, height - y);
        const edgeMask = p.edgeFade ? Math.min(1, edge / (Math.min(width, height) * p.edgeFade)) : 1;
        const centralDistance = Math.hypot((x - width / 2) / (width * .5), (y - height / 2) / (height * .5));
        const centralMask = 1 - p.centerFade * Math.max(0, 1 - centralDistance * 1.6);
        ctx.globalAlpha = Math.min(1, (p.baseOpacity + cell.hot * .75) * edgeMask * centralMask);
        ctx.fillStyle = cell.hot > .12 ? palette[Math.floor(cell.seed * palette.length)] : p.baseColor;
        ctx.fillText(cell.char, x, y);
      }
      ctx.globalAlpha = 1;
      if (visible && !motionQuery.matches) raf = requestAnimationFrame(draw);
    }
    function pointerMove(e) {
      const r = container.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    }
    function pointerLeave() { mouse.x = -10000; mouse.y = -10000; }
    function pointerDown(e) {
      if (motionQuery.matches || propsRef.current.clickEffect === 'none') return;
      pointerMove(e);
      const stepX = propsRef.current.fontSize * 1.45;
      const stepY = propsRef.current.fontSize * 1.85;
      for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
        const x = (col + .5) * stepX, y = (row + .5) * stepY;
        if (Math.abs(y - mouse.y) < 22 && Math.abs(x - mouse.x) < 280) {
          cells[row * cols + col].hot = 1;
        }
      }
      if (motionQuery.matches) draw(0);
    }
    const observer = new ResizeObserver(resize);
    const visibility = new IntersectionObserver(entries => {
      visible = entries.some(e => e.isIntersecting);
      if (visible && !raf && !motionQuery.matches) raf = requestAnimationFrame(draw);
      if (!visible) { cancelAnimationFrame(raf); raf = 0; }
    });
    observer.observe(container);
    visibility.observe(container);
    container.addEventListener('pointermove', pointerMove);
    container.addEventListener('pointerleave', pointerLeave);
    container.addEventListener('pointerdown', pointerDown);
    resize();
    if (!motionQuery.matches) raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect(); visibility.disconnect();
      container.removeEventListener('pointermove', pointerMove);
      container.removeEventListener('pointerleave', pointerLeave);
      container.removeEventListener('pointerdown', pointerDown);
    };
  }, []);

  return <div ref={containerRef} className={`letter-glitch ${className}`.trim()} style={style} aria-hidden="true"><canvas ref={canvasRef} className="letter-glitch-canvas" /></div>;
}
