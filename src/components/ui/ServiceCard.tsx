import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cardUrl, srcSet, GRID_SIZES } from '../../lib/cloudinary';

const FALLBACK_PATH = 'services-preview/engine-repair';

interface ServiceCardProps {
    title: string;
    description: string;
    Icon: LucideIcon;
    imagePath?: string;
    delay?: number;
}

export function ServiceCard({ title, description, Icon, imagePath, delay = 0 }: ServiceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className="border border-white/5 group-hover:border-accent-red/30 p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-500 h-full flex flex-col relative overflow-hidden group-hover:shadow-[0_20px_40px_rgba(230,0,0,0.15)] group-hover:-translate-y-2 group"
        >
            {/* Dark/Metallic Background Texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0" />

            {imagePath && (
                <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                    <img
                        src={cardUrl(imagePath)}
                        srcSet={srcSet(imagePath)}
                        sizes={GRID_SIZES}
                        alt={title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.src = cardUrl(FALLBACK_PATH) }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-black/40" />
                </div>
            )}

            {/* Metallic noise overlay */}
            <div className="absolute inset-0 opacity-[0.03] z-0 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

            {/* Subtle gradient glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-800 to-gray-900 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-accent-red group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 overflow-hidden shadow-lg relative">
                    <div className="absolute inset-0 bg-accent-red/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Icon size={28} className="relative z-10 drop-shadow-md" />
                </div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-accent-red transition-colors duration-300">
                    {title}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
                    {description}
                </p>

                <Link
                    to="/services"
                    className="inline-flex items-center text-sm font-medium text-white group-hover:text-accent-red transition-colors duration-300 mt-auto"
                >
                    Learn more <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
            </div>
        </motion.div>
    );
}
