"use client";

import { useEffect, useRef, useState } from "react";

const TARGET_DATE = new Date("2026-07-05T00:00:00");
const PARTICLE_COLORS = ["#b9a6d9", "#4fc4c9", "#d9aedb", "#f7f5f2", "#e8cf9c"];
const BALLOON_COLORS = ["#b9a6d9", "#4fc4c9", "#d9aedb", "#7c6a9e"];

function pad(n) {
  return String(n).padStart(2, "0");
}

function OrchidSVG({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="petal-shape p1" d="M100 108 C70 90 55 55 78 22 C92 40 96 78 100 108 Z" fill="var(--lavender)" opacity="0.92" />
      <path className="petal-shape p2" d="M100 108 C130 90 145 55 122 22 C108 40 104 78 100 108 Z" fill="var(--lavender-deep)" opacity="0.85" />
      <path className="petal-shape p3" d="M100 108 C62 100 30 112 20 145 C48 148 82 132 100 108 Z" fill="var(--orchid)" opacity="0.9" />
      <path className="petal-shape p4" d="M100 108 C138 100 170 112 180 145 C152 148 118 132 100 108 Z" fill="var(--orchid)" opacity="0.9" />
      <path className="petal-shape p5" d="M100 108 C86 140 90 178 100 205 C118 185 122 145 100 108 Z" fill="var(--turquoise)" opacity="0.9" />
      <circle className="orchid-center" cx="100" cy="108" r="12" fill="var(--white)" />
      <circle className="orchid-center" cx="100" cy="108" r="5" fill="var(--turquoise)" />
    </svg>
  );
}

function StaticOrchidSVG({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 108 C70 90 55 55 78 22 C92 40 96 78 100 108 Z" fill="var(--lavender)" opacity="0.9" />
      <path d="M100 108 C130 90 145 55 122 22 C108 40 104 78 100 108 Z" fill="var(--lavender-deep)" opacity="0.85" />
      <path d="M100 108 C62 100 30 112 20 145 C48 148 82 132 100 108 Z" fill="var(--orchid)" opacity="0.9" />
      <path d="M100 108 C138 100 170 112 180 145 C152 148 118 132 100 108 Z" fill="var(--orchid)" opacity="0.9" />
      <path d="M100 108 C86 140 90 178 100 205 C118 185 122 145 100 108 Z" fill="var(--turquoise)" opacity="0.9" />
      <circle cx="100" cy="108" r="10" fill="var(--white)" />
    </svg>
  );
}

function LockSVG() {
  return (
    <svg className="lock-badge" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="27" width="32" height="24" rx="4" fill="var(--lavender)" opacity="0.9" />
      <path d="M20 27 V18 a10 10 0 0 1 20 0 V27" stroke="var(--turquoise)" strokeWidth="3.5" fill="none" />
      <circle cx="30" cy="37" r="3.4" fill="var(--ink)" />
      <rect x="28.5" y="39" width="3" height="7" rx="1.5" fill="var(--ink)" />
    </svg>
  );
}

const LETTER_TEXT = (
  <>
    <span className="drop">O</span>rchids don&apos;t rush to bloom, and they don&apos;t need to shout to be
    noticed — they&apos;re just quietly, unmistakably beautiful. That&apos;s you, Bacha.
    <br />
    <br />
    Today isn&apos;t about balloons or noise. It&apos;s me taking a moment to say that the calm you
    carry, the way you make ordinary days feel lighter, hasn&apos;t gone unnoticed. Not by me, not
    by anyone lucky enough to know you.
    <br />
    <br />
    So here&apos;s to another year in lavender mornings and turquoise skies — may it hold everything
    you quietly hope for, and a little more.
  </>
);

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);
  const [particles, setParticles] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const petalFieldRef = useRef(null);
  const balloonFieldRef = useRef(null);
  const heartFieldRef = useRef(null);
  const hasFiredFireworks = useRef(false);

  // countdown
  useEffect(() => {
    function tick() {
      const now = new Date();
      const diff = TARGET_DATE - now;
      if (diff <= 0) {
        setTimeLeft({ arrived: true });
        return;
      }
      setTimeLeft({
        arrived: false,
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ambient floating petals (site-wide)
  useEffect(() => {
    const field = petalFieldRef.current;
    if (!field) return;
    const count = window.innerWidth < 640 ? 10 : 18;
    const nodes = [];
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "petal";
      const size = 6 + Math.random() * 10;
      const left = Math.random() * 100;
      const duration = 14 + Math.random() * 14;
      const delay = Math.random() * 18;
      const driftX = Math.random() * 80 - 40 + "px";
      const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      p.style.left = left + "vw";
      p.style.width = size + "px";
      p.style.height = size * 1.3 + "px";
      p.style.background = color;
      p.style.borderRadius = "60% 40% 60% 40%";
      p.style.animationDuration = duration + "s";
      p.style.animationDelay = delay + "s";
      p.style.setProperty("--drift-x", driftX);
      field.appendChild(p);
      nodes.push(p);
    }
    return () => nodes.forEach((n) => n.remove());
  }, []);

  // balloons rising inside the hero only
  useEffect(() => {
    const field = balloonFieldRef.current;
    if (!field) return;
    const count = window.innerWidth < 640 ? 5 : 8;
    const nodes = [];
    for (let i = 0; i < count; i++) {
      const b = document.createElement("div");
      b.className = "balloon";
      const size = 34 + Math.random() * 22;
      const left = 6 + Math.random() * 88;
      const duration = 10 + Math.random() * 10;
      const delay = Math.random() * 12;
      const sway = Math.random() * 60 - 30 + "px";
      const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
      b.style.left = left + "%";
      b.style.width = size + "px";
      b.style.height = size * 1.25 + "px";
      b.style.animationDuration = duration + "s";
      b.style.animationDelay = delay + "s";
      b.style.setProperty("--sway", sway);
      b.innerHTML = `
        <svg viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;overflow:visible;">
          <ellipse cx="20" cy="18" rx="18" ry="18" fill="${color}" opacity="0.85" />
          <path d="M20 36 L23 40 L20 44 L17 40 Z" fill="${color}" opacity="0.85" />
          <line x1="20" y1="44" x2="20" y2="50" stroke="${color}" stroke-width="1" opacity="0.5" />
        </svg>`;
      field.appendChild(b);
      nodes.push(b);
    }
    return () => nodes.forEach((n) => n.remove());
  }, []);

  // hearts drifting in the closing section
  useEffect(() => {
    const field = heartFieldRef.current;
    if (!field) return;
    const count = window.innerWidth < 640 ? 6 : 10;
    const nodes = [];
    for (let i = 0; i < count; i++) {
      const h = document.createElement("div");
      h.className = "heart";
      const size = 10 + Math.random() * 12;
      const left = Math.random() * 100;
      const duration = 12 + Math.random() * 10;
      const delay = Math.random() * 14;
      const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      h.style.left = left + "%";
      h.style.animationDuration = duration + "s";
      h.style.animationDelay = delay + "s";
      h.innerHTML = `
        <svg viewBox="0 0 32 28" style="width:${size}px;height:${size}px;" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 26 C4 18 0 10 6 5 C10 2 15 4 16 9 C17 4 22 2 26 5 C32 10 28 18 16 26 Z" fill="${color}" opacity="0.8" />
        </svg>`;
      field.appendChild(h);
      nodes.push(h);
    }
    return () => nodes.forEach((n) => n.remove());
  }, []);

  function spawnBurst(count, originLeftVw, originTopVh, spread = 1) {
    const batch = Array.from({ length: count }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = (70 + Math.random() * 170) * spread;
      return {
        id: `${Date.now()}-${i}-${Math.random()}`,
        ox: originLeftVw,
        oy: originTopVh,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance - 30,
        rotate: Math.random() * 360,
        size: 6 + Math.random() * 9,
        delay: Math.random() * 0.18,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      };
    });
    setParticles((p) => [...p, ...batch]);
    setTimeout(() => {
      const ids = new Set(batch.map((b) => b.id));
      setParticles((p) => p.filter((pt) => !ids.has(pt.id)));
    }, 1700);
  }

  // fireworks the moment the countdown hits zero and the letter unlocks
  useEffect(() => {
    if (timeLeft?.arrived && !hasFiredFireworks.current) {
      hasFiredFireworks.current = true;
      const bursts = [
        [25, 45],
        [70, 35],
        [50, 55],
        [30, 60],
        [80, 50],
      ];
      bursts.forEach(([x, y], i) => {
        setTimeout(() => spawnBurst(26, x, y, 1.3), i * 260);
      });
    }
  }, [timeLeft?.arrived]);

  function handleOpenEnvelope() {
    if (opened) return;
    setOpened(true);
    spawnBurst(30, 50, 42);
  }

  function handleSecretTap(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ox = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const oy = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    if (!secretOpen) spawnBurst(16, ox, oy);
    setSecretOpen((s) => !s);
  }

  return (
    <>
      <div id="petal-field" ref={petalFieldRef}></div>

      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            "--ox": p.ox,
            "--oy": p.oy,
            "--tx": p.tx,
            "--ty": p.ty,
            "--rotate": p.rotate,
            "--size": p.size,
            "--delay": p.delay,
            "--color": p.color,
          }}
        />
      ))}

      {/* ===== Envelope gate — the surprise entrance ===== */}
      <div className={`envelope-overlay${opened ? " opened" : ""}`} aria-hidden={opened}>
        <p className="envelope-eyebrow">A surprise, sealed just for you</p>
        <button
          className="envelope-svg-wrap"
          onClick={handleOpenEnvelope}
          aria-label="Open your surprise"
        >
          <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="30" width="180" height="100" rx="6" fill="#1b1826" stroke="var(--lavender-deep)" strokeWidth="1.5" />
            <path d="M10 36 L100 95 L190 36" fill="none" stroke="var(--turquoise)" strokeWidth="1.5" />
            <g className="envelope-flap">
              <path d="M10 36 L100 90 L190 36 L190 30 Q190 24 184 24 L16 24 Q10 24 10 30 Z" fill="#211d30" stroke="var(--lavender-deep)" strokeWidth="1.5" />
            </g>
            <g className="envelope-seal">
              <circle cx="100" cy="78" r="16" fill="var(--orchid)" opacity="0.95" />
              <circle cx="100" cy="78" r="6" fill="#1b1826" />
            </g>
          </svg>
        </button>
        <p className="envelope-hint">Tap to open</p>
        <p className="envelope-from">From Kritik</p>
      </div>

      {/* ===== HERO ===== */}
      <section id="hero">
        <div className="lights-row" aria-hidden="true">
          <svg viewBox="0 0 400 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 6 Q50 40 100 6 T200 6 T300 6 T400 6" stroke="rgba(185,166,217,0.35)" strokeWidth="1.5" fill="none" />
            {Array.from({ length: 13 }).map((_, i) => {
              const x = 6 + i * 32;
              const y = 6 + 30 * Math.abs(Math.sin((i / 12) * Math.PI));
              const colors = ["#b9a6d9", "#4fc4c9", "#d9aedb", "#e8cf9c"];
              return (
                <circle
                  key={i}
                  className="bulb"
                  cx={x}
                  cy={y}
                  r="4"
                  fill={colors[i % colors.length]}
                />
              );
            })}
          </svg>
        </div>

        <div className="balloon-field" ref={balloonFieldRef}></div>

        <p className="eyebrow">The fifth of July</p>

        <div className="orchid-wrap">
          <OrchidSVG />
        </div>

        <h1 className="name">Bacha</h1>
        <h2 className="wishline">Every year, the world gets lovelier because you&apos;re in it.</h2>
        <p className="from-tag">A little something from Kritik</p>

        {timeLeft && !timeLeft.arrived && (
          <div id="countdown" aria-live="polite">
            <div className="cd-unit">
              <span className="cd-num">{pad(timeLeft.days)}</span>
              <span className="cd-label">Days</span>
            </div>
            <span className="cd-sep">:</span>
            <div className="cd-unit">
              <span className="cd-num">{pad(timeLeft.hours)}</span>
              <span className="cd-label">Hours</span>
            </div>
            <span className="cd-sep">:</span>
            <div className="cd-unit">
              <span className="cd-num">{pad(timeLeft.mins)}</span>
              <span className="cd-label">Mins</span>
            </div>
            <span className="cd-sep">:</span>
            <div className="cd-unit">
              <span className="cd-num">{pad(timeLeft.secs)}</span>
              <span className="cd-label">Secs</span>
            </div>
          </div>
        )}
        {timeLeft && timeLeft.arrived && (
          <p id="arrived">It&apos;s here — happy birthday, my Bacha. 🤍</p>
        )}

        <span className="scroll-cue">Scroll · Read On</span>
      </section>

      {/* ===== MESSAGE (locked until the countdown ends) ===== */}
      <section id="message">
        <div className="frame">
          <span className="corner tl"></span>
          <span className="corner tr"></span>
          <span className="corner bl"></span>
          <span className="corner br"></span>

          {timeLeft && !timeLeft.arrived ? (
            <div className="locked">
              <LockSVG />
              <p className="locked-title">Your letter is sealed</p>
              <p className="locked-sub">Unlocks the moment it&apos;s July 5th</p>
              <div className="locked-blur-wrap">
                <p className="locked-blur">
                  Orchids don&apos;t rush to bloom, and they don&apos;t need to shout to be noticed
                  — they&apos;re just quietly, unmistakably beautiful. That&apos;s you, Bacha...
                </p>
                <div className="locked-shimmer"></div>
              </div>
              <div className="mini-countdown">
                <div className="u"><span className="n">{pad(timeLeft.days)}</span><span className="l">D</span></div>
                <div className="u"><span className="n">{pad(timeLeft.hours)}</span><span className="l">H</span></div>
                <div className="u"><span className="n">{pad(timeLeft.mins)}</span><span className="l">M</span></div>
                <div className="u"><span className="n">{pad(timeLeft.secs)}</span><span className="l">S</span></div>
              </div>
            </div>
          ) : (
            <>
              <button className="mini-orchid" onClick={handleSecretTap} aria-label="Tap the orchid for a secret">
                <StaticOrchidSVG />
              </button>
              <p className="tap-hint">{secretOpen ? "shh, just for you ↓" : "tap the orchid for a secret"}</p>

              <p className="letter-eyebrow">A note, just for you</p>

              <p className="letter">{LETTER_TEXT}</p>

              <div className={`secret${secretOpen ? " open" : ""}`}>
                <p>P.S. — I picked orchids for this whole page because they remind me of you: rare, graceful,
                worth waiting for. Happy birthday, my Bacha. I love you. — Kritik</p>
              </div>

              <p className="signoff">Happy Birthday, Bacha — today is yours.</p>
            </>
          )}
        </div>
      </section>

      {/* ===== CLOSING ===== */}
      <section id="closing">
        <div className="heart-field" ref={heartFieldRef}></div>
        <StaticOrchidSVG className="closing-orchid" />
        <p className="closing-line">
          With <span>black-and-white certainty</span>,
          <br />
          wrapped in lavender and turquoise —
          <br />
          happy birthday.
        </p>
        <p className="closing-tag">05 · 07</p>
        <p className="closing-from">with all my love, Kritik</p>
      </section>
    </>
  );
}
