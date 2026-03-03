import { useNavigate } from 'react-router-dom';
import { MessageSquare, Gauge, Fuel, Settings, ShieldCheck, ChevronLeft, ChevronRight, Star, CalendarDays, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Car } from '../../data/mockCars';
import { cloudinaryUrl } from '../../lib/cloudinary';

interface CarCardProps {
    car: Car;
}

export function CarCard({ car }: CarCardProps) {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setImageError(false);
        setImageLoaded(false);
        setCurrentImageIndex((prev) => (prev + 1) % Math.min(car.images.length, 3));
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setImageError(false);
        setImageLoaded(false);
        setCurrentImageIndex((prev) => (prev - 1 + Math.min(car.images.length, 3)) % Math.min(car.images.length, 3));
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const previewImages = car.images.slice(0, 3);
    const whatsappLink = `https://wa.me/919876543210?text=Hi, I'm interested in the ${car.year} ${car.brand} ${car.model} ${car.variant} (${formatPrice(car.price)}). Is it still available? I saw this on ProAuto Marketplace.`;

    // High quality fallback car images from Unsplash
    const FALLBACK_CARS = [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80', // Porsche/Sport
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80', // Muscle/Coupe
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80', // Generic/Sedan
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80'  // Luxury/Generic
    ];

    const getImageUrl = () => {
        if (imageError) {
            // Try matching local assets first
            const brandLower = car.brand.toLowerCase();
            if (brandLower.includes('audi')) return '/images/cars/audi-q5-front.png';
            if (brandLower.includes('bmw')) return '/images/cars/bmw-3series-front.png';
            if (brandLower.includes('mercedes')) return '/images/cars/merc-eclass-front.png';

            // Return deterministic fallback based on car ID
            const fallbackIdx = car.id.length % FALLBACK_CARS.length;
            return FALLBACK_CARS[fallbackIdx];
        }
        return cloudinaryUrl(car.images[currentImageIndex], `f_auto,q_auto,w_800`);
    };

    return (
        <div
            className="group bg-brand-800 rounded-[2rem] border border-gray-800/50 overflow-hidden hover:border-accent-red/40 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] flex flex-col cursor-pointer"
            onClick={() => navigate(`/cars/${car.id}`)}
        >
            {/* Image Section - Large Aspect Ratio */}
            <div className="relative aspect-[4/3] overflow-hidden bg-brand-900">
                {/* Loading Shimmer */}
                {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 bg-[length:200%_100%] animate-[shimmer_2s_infinite] z-0" />
                )}

                <img
                    src={getImageUrl()}
                    alt={`${car.brand} ${car.model}`}
                    className={`w-full h-full object-cover transition-all duration-1000 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'} group-hover:scale-105`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                        setImageError(true);
                        setImageLoaded(true); // Stop shimmer
                    }}
                />

                {/* Premium Floating Badges */}
                <div className="absolute top-5 left-5 flex flex-col gap-2.5 z-10">
                    {car.featured && (
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-amber-500 text-black text-[10px] font-black px-4 py-2 rounded-xl shadow-2xl uppercase tracking-widest backdrop-blur-xl flex items-center gap-2 border border-amber-400/50"
                        >
                            <Star size={12} fill="currentColor" /> Featured
                        </motion.div>
                    )}
                    {car.certified && (
                        <div className="bg-white/10 text-white text-[10px] font-black px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl uppercase tracking-widest backdrop-blur-xl border border-white/20">
                            <ShieldCheck size={12} className="text-emerald-500" /> Pro Certified
                        </div>
                    )}
                    {car.year >= 2024 && (
                        <div className="bg-accent-red text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-2xl uppercase tracking-widest backdrop-blur-xl border border-accent-red/50">
                            New Arrival
                        </div>
                    )}
                </div>

                {/* Simplified Carousel Indicators */}
                {previewImages.length > 1 && (
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {previewImages.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/30 w-1.5'}`}
                            />
                        ))}
                    </div>
                )}

                {/* Glass Navigation */}
                <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Condition Overlay */}
                <div className="absolute top-5 right-5">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg backdrop-blur-xl border ${car.condition === 'new'
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        : 'bg-brand-900/40 text-gray-300 border-white/10'
                        }`}>
                        {car.condition === 'new' ? 'Brand New' : 'Used'}
                    </span>
                </div>
            </div>

            {/* Content Section - Breathable Padding */}
            <div className="p-8 flex flex-col flex-grow">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-400 text-sm font-bold">{car.year}</span>
                        <div className="w-1 h-1 rounded-full bg-gray-700" />
                        <span className="text-gray-400 text-sm font-bold">{car.brand}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight group-hover:text-accent-red transition-colors">
                        {car.model}
                    </h3>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">
                        {car.variant}
                    </p>
                </div>

                {/* Refined Specs Grid */}
                <div className="grid grid-cols-2 gap-y-5 gap-x-6 py-6 border-y border-gray-800/50 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center border border-white/5">
                            <Gauge size={18} className="text-accent-red opacity-80" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Mileage</span>
                            <span className="text-xs text-white font-black uppercase tracking-tighter">
                                {car.condition === 'used' ? `${car.km?.toLocaleString()} km` : '0 km'}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center border border-white/5">
                            <Fuel size={18} className="text-accent-red opacity-80" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Fuel</span>
                            <span className="text-xs text-white font-black uppercase tracking-tighter">{car.fuel}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center border border-white/5">
                            <Settings size={18} className="text-accent-red opacity-80" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Gearbox</span>
                            <span className="text-xs text-white font-black uppercase tracking-tighter">{car.transmission}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center border border-white/5">
                            <CheckCircle2 size={18} className="text-emerald-500 opacity-80" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Status</span>
                            <span className="text-xs text-white font-black uppercase tracking-tighter">Verified</span>
                        </div>
                    </div>
                </div>

                {/* Price Section - Elite Hierarchy */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-2">
                            <span className="text-[10px] text-accent-red font-black uppercase tracking-widest italic">EMI Starts at</span>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{formatPrice(car.price)} total</span>
                        </div>
                        <div className="text-4xl md:text-5xl font-black text-white italic tracking-tighter leading-none flex items-baseline gap-2">
                            {formatPrice(car.emi)}
                            <span className="text-sm text-gray-500 normal-case font-bold italic">/mo*</span>
                        </div>
                        {car.condition === 'used' && car.insuranceValidTill && (
                            <div className="mt-3 flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                                <CalendarDays size={12} /> Insurance Valid till {car.insuranceValidTill}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(whatsappLink, '_blank');
                        }}
                        className="bg-brand-900 hover:bg-accent-red group/btn p-5 rounded-3xl transition-all duration-500 border border-white/5 hover:border-accent-red shadow-2xl hover:shadow-accent-red/40"
                    >
                        <MessageSquare size={24} className="text-accent-red group-hover/btn:text-white transition-colors" />
                    </button>
                </div>
            </div>
        </div>
    );
}
