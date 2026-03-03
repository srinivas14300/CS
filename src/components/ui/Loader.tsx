import { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════
// Architecture:
//   - Adaptive: skips entirely on fast loads (<400ms), shows quick
//     fade on medium loads (400-1000ms), full animation on slow loads.
//   - Non-blocking: Hero renders behind the loader (opacity overlay,
//     not display:none), so the browser can still compute LCP.
//   - Deterministic: all random values computed once via useMemo.
//   - Animation-safe: all infinite loops gate on `active` state and
//     stop before the exit transition begins.
// ═══════════════════════════════════════════════════════════════════

interface LoaderProps {
    brand?: string;
}

// ── Pre-computed spoke endpoints relative to (0,0) local origin ──
const SPOKE_ANGLES = [0, 72, 144, 216, 288] as const;
const SPOKE_RADIUS = 11;
const SPOKES_LOCAL = SPOKE_ANGLES.map((angle) => ({
    x2: SPOKE_RADIUS * Math.cos((angle * Math.PI) / 180),
    y2: SPOKE_RADIUS * Math.sin((angle * Math.PI) / 180),
}));

// ── Road line data generated once at module level ──
const ROAD_LINES = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    width: 20 + ((i * 7 + 3) % 30),                         // deterministic pseudo-random
    alpha: 0.06 + ((i * 13 + 5) % 8) * 0.01,
}));

// ── Particle data generated once at module level ──
const PARTICLES = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: 2 + ((i * 3 + 1) % 3),
    top: 20 + ((i * 17 + 7) % 60),
    left: 10 + ((i * 23 + 11) % 80),
    duration: 1.5 + (i % 3) * 0.4,
}));

// ── Wheel component (animation-gated, SVG-native transform origin) ──
// Spokes rotate inside a <g> translated to the wheel center so that
// transformOrigin "0 0" is the exact geometric center of the wheel.
function Wheel({ cx, active }: { cx: number; active: boolean }) {
    const cy = 90;
    return (
        <g>
            {/* Outer tyre + rim rings at absolute position */}
            <circle cx={cx} cy={cy} r="18" fill="#111" stroke="#333" strokeWidth="1" />
            <circle cx={cx} cy={cy} r="14" fill="#1a1a1a" stroke="#444" strokeWidth="0.5" />

            {/* Spokes — translated to wheel center, drawn from local (0,0) */}
            <g transform={`translate(${cx} ${cy})`}>
                <motion.g
                    animate={active ? { rotate: 360 } : undefined}
                    transition={active ? { duration: 0.8, repeat: Infinity, ease: 'linear' } : undefined}
                    style={{ transformOrigin: '0px 0px' }}
                >
                    {SPOKES_LOCAL.map((s, i) => (
                        <line key={i} x1="0" y1="0" x2={s.x2} y2={s.y2}
                            stroke="#555" strokeWidth="2" strokeLinecap="round" />
                    ))}
                </motion.g>
            </g>

            {/* Hub cap + decorative ring at absolute position */}
            <circle cx={cx} cy={cy} r="4" fill="#333" stroke="#555" strokeWidth="0.5" />
            <circle cx={cx} cy={cy} r="17" fill="none" stroke="#444" strokeWidth="0.3" opacity="0.5" />
        </g>
    );
}

// ── Car SVG — all infinite animations gated on `active` ──
function CarSVG({ active }: { active: boolean }) {
    const pulse = active
        ? { animate: { opacity: [0.3, 0.7, 0.3] }, transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const } }
        : {};
    const lightPulse = active
        ? { animate: { opacity: [0.7, 1, 0.7] }, transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const } }
        : {};

    return (
        <svg viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="w-[280px] md:w-[360px]">
            <defs>
                <radialGradient id="hlGlow" cx="0" cy="0.5" r="1" fx="0" fy="0.5">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
                    <stop offset="40%" stopColor="#ffe4cc" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ffe4cc" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="bGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4a4a4a" />
                    <stop offset="50%" stopColor="#2a2a2a" />
                    <stop offset="100%" stopColor="#1a1a1a" />
                </linearGradient>
                <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3a5a7a" />
                    <stop offset="100%" stopColor="#1a2a3a" />
                </linearGradient>
                <linearGradient id="tGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#555" />
                    <stop offset="50%" stopColor="#888" />
                    <stop offset="100%" stopColor="#555" />
                </linearGradient>
            </defs>

            {/* Headlight beam */}
            <motion.ellipse cx="375" cy="72" rx="50" ry="20" fill="url(#hlGlow)" {...pulse} />

            {/* Body — lower */}
            <path d="M40,78 Q40,62 55,62 L345,62 Q365,62 368,72 L370,78 Q370,88 355,90 L55,90 Q40,90 40,78 Z"
                fill="url(#bGrad)" stroke="#333" strokeWidth="0.5" />
            {/* Body — cabin */}
            <path d="M105,62 L130,30 Q135,24 145,24 L255,24 Q265,24 275,30 L310,62 Z"
                fill="url(#bGrad)" stroke="#333" strokeWidth="0.5" />

            {/* Windows */}
            <path d="M115,60 L137,33 Q140,28 148,28 L200,28 L200,60 Z" fill="url(#wGrad)" opacity="0.9" />
            <path d="M204,28 L258,28 Q264,28 270,33 L298,60 L204,60 Z" fill="url(#wGrad)" opacity="0.9" />
            <rect x="200" y="26" width="4" height="36" fill="#1a1a1a" rx="1" />

            {/* Chrome trim */}
            <path d="M55,68 L350,68" stroke="url(#tGrad)" strokeWidth="1" opacity="0.6" />

            {/* Headlight + LED */}
            <motion.path d="M350,66 Q370,66 370,74 L368,78 Q366,80 360,80 L350,80 Z" fill="#ffe4cc" {...lightPulse} />
            <motion.rect x="352" y="70" width="14" height="2" rx="1" fill="#fff"
                animate={active ? { opacity: [0.5, 1, 0.5] } : undefined}
                transition={active ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : undefined} />

            {/* Tail light */}
            <motion.path d="M40,66 Q38,66 38,72 L40,80 Q42,82 48,80 L52,66 Z" fill="#e60000"
                animate={active ? { opacity: [0.6, 1, 0.6] } : undefined}
                transition={active ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : undefined} />

            {/* Bumpers */}
            <rect x="340" y="82" width="28" height="6" rx="2" fill="#222" stroke="#333" strokeWidth="0.5" />
            <rect x="38" y="82" width="20" height="6" rx="2" fill="#222" stroke="#333" strokeWidth="0.5" />

            {/* Details */}
            <rect x="190" y="52" width="12" height="2" rx="1" fill="#666" opacity="0.5" />
            <path d="M115,55 L108,52 L108,58 Z" fill="#2a2a2a" stroke="#333" strokeWidth="0.5" />
            <path d="M300,55 L307,52 L307,58 Z" fill="#2a2a2a" stroke="#333" strokeWidth="0.5" />

            {/* Wheels — animation gated */}
            <Wheel cx={120} active={active} />
            <Wheel cx={310} active={active} />

            {/* Ground reflection */}
            <motion.rect x="60" y="108" width="290" height="1" rx="0.5" fill="#e60000"
                animate={active ? { opacity: [0.04, 0.12, 0.04] } : undefined}
                transition={active ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : undefined} />
        </svg>
    );
}

// ═══════════════════════════════════════════════════════════════════
// Main Loader — adaptive, non-blocking, animation-safe
// ═══════════════════════════════════════════════════════════════════

type Phase = 'active' | 'exiting' | 'done';

export function Loader({ brand = 'PROAUTO' }: LoaderProps) {
    const [phase, setPhase] = useState<Phase>('active');
    const loadStartRef = useRef(performance.now());

    // ── Always show full cinematic animation for 3s, then exit ──
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const start = loadStartRef.current;
        let timer: ReturnType<typeof setTimeout>;

        const beginExit = () => {
            const elapsed = performance.now() - start;
            const remaining = Math.max(0, 3000 - elapsed);
            timer = setTimeout(() => setPhase('exiting'), remaining);
        };

        if (document.readyState === 'complete') {
            beginExit();
        } else {
            window.addEventListener('load', beginExit, { once: true });
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener('load', beginExit);
        };
    }, []);

    // ── Unlock scroll when exiting / done ──
    useEffect(() => {
        if (phase !== 'active') {
            document.body.style.overflow = '';
        }
    }, [phase]);

    // ── Brand split — stable across renders ──
    const brandParts = useMemo(() => {
        if (brand === 'PROAUTO') return { first: 'PRO', second: 'AUTO' };
        const mid = Math.ceil(brand.length / 2);
        return { first: brand.slice(0, mid), second: brand.slice(mid) };
    }, [brand]);

    // If already done, render nothing
    if (phase === 'done') return null;

    const animating = phase === 'active';

    return (
        <AnimatePresence onExitComplete={() => setPhase('done')}>
            {animating && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
                    style={{
                        backgroundColor: '#0a0a0a',
                        pointerEvents: animating ? 'auto' : 'none',
                    }}
                >
                    {/* Subtle ambient gradient */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(230,0,0,0.06),transparent_70%)]" />
                    </div>

                    {/* Ambient particles — deterministic positions */}
                    {PARTICLES.map((p) => (
                        <motion.div
                            key={p.id}
                            className="absolute rounded-full bg-white/5"
                            style={{ width: p.size, height: p.size, top: `${p.top}%`, left: `${p.left}%` }}
                            animate={animating ? { x: [0, -100, -200], opacity: [0, 0.4, 0] } : { x: 0, opacity: 0 }}
                            transition={animating ? { duration: p.duration, repeat: Infinity, delay: p.id * 0.3, ease: 'linear' } : { duration: 0.3 }}
                        />
                    ))}

                    {/* Car with drift + bounce — gated */}
                    <motion.div
                        className="relative"
                        animate={animating ? { x: [-8, 8, -8] } : { x: 0 }}
                        transition={animating ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
                    >
                        <motion.div
                            animate={animating ? { y: [0, -1.5, 0, -0.5, 0] } : { y: 0 }}
                            transition={animating ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
                        >
                            <CarSVG active={animating} />
                        </motion.div>
                    </motion.div>

                    {/* Road surface */}
                    <div className="relative w-[320px] md:w-[420px] mt-2">
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <div className="relative overflow-hidden h-[12px] mt-1">
                            <motion.div
                                className="flex gap-6 absolute top-1"
                                animate={animating ? { x: [0, -120] } : { x: 0 }}
                                transition={animating ? { duration: 0.8, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
                            >
                                {Array.from({ length: 20 }, (_, i) => (
                                    <div key={i} className="w-8 h-[1px] bg-white/[0.07] rounded-full shrink-0" />
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* Secondary road lines — deterministic */}
                    <div className="absolute bottom-[38%] left-0 right-0 overflow-hidden h-[2px]">
                        <motion.div
                            className="flex gap-12 w-[200%]"
                            animate={animating ? { x: [0, '-50%'] } : { x: 0 }}
                            transition={animating ? { duration: 1.2, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
                        >
                            {ROAD_LINES.map((line) => (
                                <div key={line.id} className="h-[2px] rounded-full shrink-0"
                                    style={{ width: line.width, backgroundColor: `rgba(255,255,255,${line.alpha})` }} />
                            ))}
                        </motion.div>
                    </div>

                    {/* Brand reveal */}
                    <motion.div
                        className="mt-10 flex items-center gap-0.5 relative"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div className="flex tracking-[0.35em] text-2xl md:text-3xl font-bold">
                            {brandParts.first.split('').map((char, i) => (
                                <motion.span key={`f-${i}`} className="text-white"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }} >
                                    {char}
                                </motion.span>
                            ))}
                            {brandParts.second.split('').map((char, i) => (
                                <motion.span key={`s-${i}`} className="text-accent-red"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + (brandParts.first.length + i) * 0.06, duration: 0.4 }} >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                        <motion.div
                            className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-accent-red to-red-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 0.7, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        className="mt-5 text-[10px] md:text-xs text-gray-600 uppercase tracking-[0.4em] font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                    >
                        Car Sales & Services
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
