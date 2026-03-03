import { useMarketMode } from '../../context/MarketModeContext';
import { useNavigate } from 'react-router-dom';
import { Wrench, CarFront } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export function GlobalToggle() {
    const { mode, toggleMode } = useMarketMode();
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const direction = latest > lastScrollY ? "down" : "up";
        if (latest < 50) {
            setIsVisible(true);
        } else if (latest > 100 && direction === "down") {
            setIsVisible(false);
        } else if (direction === "up") {
            setIsVisible(true);
        }
        setLastScrollY(latest);
    });

    const handleToggle = (newMode: 'services' | 'sales') => {
        if (newMode === mode) return;
        toggleMode(newMode);
        if (newMode === 'sales') {
            navigate('/cars');
        } else {
            navigate('/');
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, x: '-50%', opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, x: '-50%', opacity: 1, scale: 1 }}
                    exit={{ y: 100, x: '-50%', opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                    // Liquid Glass Container
                    className="fixed bottom-12 md:bottom-10 left-1/2 z-[100] bg-brand-800/40 backdrop-blur-[40px] border border-white/10 p-1.5 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.05)] flex items-center gap-1 group overflow-hidden"
                >
                    {/* Subtle Liquid Gradient Mesh Background */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent-red/20 via-transparent to-blue-600/20 animate-pulse" />
                    </div>

                    <button
                        onClick={() => handleToggle('services')}
                        className={`relative flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 rounded-[2.5rem] transition-all duration-700 font-black italic uppercase tracking-tighter text-xs md:text-sm group/btn overflow-hidden ${mode === 'services'
                                ? 'text-white'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {mode === 'services' && (
                            <motion.div
                                layoutId="liquidIndicator"
                                className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1),inset_0_0_10px_rgba(255,255,255,0.05)]"
                                transition={{ type: 'spring', damping: 22, stiffness: 200 }}
                            />
                        )}
                        <Wrench
                            size={mode === 'services' ? 20 : 18}
                            className={`relative z-10 transition-all duration-500 ${mode === 'services' ? 'text-accent-red filter drop-shadow-[0_0_8px_rgba(230,0,0,0.5)] rotate-0 scale-110' : 'opacity-50 grayscale -rotate-12'}`}
                        />
                        <span className="relative z-10 flex items-center gap-1.5">
                            Services
                            {mode === 'services' && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1 h-1 rounded-full bg-accent-red" />}
                        </span>
                    </button>

                    <button
                        onClick={() => handleToggle('sales')}
                        className={`relative flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 rounded-[2.5rem] transition-all duration-700 font-black italic uppercase tracking-tighter text-xs md:text-sm group/btn overflow-hidden ${mode === 'sales'
                                ? 'text-white'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {mode === 'sales' && (
                            <motion.div
                                layoutId="liquidIndicator"
                                className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1),inset_0_0_10px_rgba(255,255,255,0.05)]"
                                transition={{ type: 'spring', damping: 22, stiffness: 200 }}
                            />
                        )}
                        <CarFront
                            size={mode === 'sales' ? 20 : 18}
                            className={`relative z-10 transition-all duration-500 ${mode === 'sales' ? 'text-blue-500 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] scale-110' : 'opacity-50 grayscale'}`}
                        />
                        <span className="relative z-10 flex items-center gap-1.5">
                            Buy / Sell
                            {mode === 'sales' && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1 h-1 rounded-full bg-blue-500" />}
                        </span>
                    </button>

                    {/* Premium Shimmer Effect on Container Top */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
