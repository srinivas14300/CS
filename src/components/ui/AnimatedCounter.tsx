import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    label: string;
    Icon?: LucideIcon;
}

export function AnimatedCounter({
    end,
    duration = 2,
    prefix = '',
    suffix = '',
    label,
    Icon
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
            });

            let startTime: number;
            let animationFrame: number;

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = (timestamp - startTime) / (duration * 1000);

                if (progress < 1) {
                    setCount(Math.min(Math.floor(end * progress), end));
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };

            animationFrame = requestAnimationFrame(animate);

            return () => cancelAnimationFrame(animationFrame);
        }
    }, [isInView, end, duration, controls]);

    const IconComponent = Icon;

    return (
        <div ref={ref} className="flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                className="text-5xl md:text-6xl font-black mb-3 flex items-center text-white"
            >
                {IconComponent && <IconComponent className="mr-3 text-accent-red drop-shadow-lg" size={40} />}
                {prefix}{count.toLocaleString()}{suffix}
            </motion.div>
            <div className="text-lg text-gray-400 font-medium tracking-wide uppercase text-sm">
                {label}
            </div>
        </div>
    );
}
