import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Battery, Wind, Droplets, ShieldCheck, CheckCircle2, Crown, Settings2, Activity, Zap, Combine, Timer, Sparkles, PhoneCall, Fuel, Car, Disc3, CircleDot, Gauge, PaintBucket, Lightbulb, ThermometerSun, Filter, Search, Cable, Cog, Layers, SprayCan } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { generateWhatsAppLink } from '../lib/whatsapp';
import { SEO } from '../components/SEO';
import { cardUrl, srcSet, GRID_SIZES } from '../lib/cloudinary';
import type { LucideIcon } from 'lucide-react';

// ── Cloudinary image paths for all services ──
// Each service references a Cloudinary image path (without extension).
const FALLBACK_PATH = 'services/mechanic-engine';

interface ServiceItem {
    title: string;
    description: string;
    Icon: LucideIcon;
    image: string; // Cloudinary path, e.g. "services/general-service"
    price: string;
}

interface ServiceCategory {
    category: string;
    services: ServiceItem[];
}

const allServices: ServiceCategory[] = [
    {
        category: 'General Maintenance',
        services: [
            { title: 'General Car Service', description: 'Complete multi-point inspection and tune-up.', Icon: Car, image: 'services/general-service', price: '₹2,500+' },
            { title: 'Periodic Maintenance', description: 'Scheduled service as per manufacturer intervals.', Icon: Timer, image: 'services/periodic-maintenance', price: '₹3,500+' },
            { title: 'Oil Change Service', description: 'Premium synthetic & conventional engine oil change.', Icon: Droplets, image: 'services/oil-change', price: '₹1,500+' },
            { title: 'Coolant Flush', description: 'Complete cooling system flush and refill.', Icon: ThermometerSun, image: 'services/coolant-flush', price: '₹1,200+' },
            { title: 'Brake Fluid Replacement', description: 'DOT-4 brake fluid drain and replacement.', Icon: Droplets, image: 'services/brake-fluid', price: '₹800+' },
            { title: 'Fuel Injector Cleaning', description: 'Ultrasonic cleaning for improved fuel efficiency.', Icon: SprayCan, image: 'services/fuel-injector', price: '₹2,000+' },
        ]
    },
    {
        category: 'Mechanical Repairs',
        services: [
            { title: 'Engine Diagnostics', description: 'Advanced OBD-II scanning and fault detection.', Icon: Search, image: 'services/engine-diagnostics', price: '₹999+' },
            { title: 'Engine Overhaul', description: 'Complete engine rebuild by master mechanics.', Icon: Settings2, image: 'services/engine-overhaul', price: '₹15,000+' },
            { title: 'Clutch Replacement', description: 'Clutch plate, pressure plate, and bearing replacement.', Icon: Disc3, image: 'services/clutch-replacement', price: '₹6,000+' },
            { title: 'Brake Pad Replacement', description: 'OEM-grade brake pad installation and bedding.', Icon: ShieldCheck, image: 'services/brake-pad', price: '₹1,800+' },
            { title: 'Brake Disc Skimming', description: 'Precision lathe skimming to restore disc surface.', Icon: CircleDot, image: 'services/brake-disc-skimming', price: '₹1,500+' },
            { title: 'Suspension Repair', description: 'Shock absorbers, struts, and linkage repair.', Icon: Activity, image: 'services/suspension-repair', price: '₹3,500+' },
            { title: 'Steering Repair', description: 'Power steering pump, rack, and fluid service.', Icon: Gauge, image: 'services/steering-repair', price: '₹2,500+' },
            { title: 'Transmission Service', description: 'Automatic and manual gearbox fluid and repair.', Icon: Combine, image: 'services/transmission-service', price: '₹4,500+' },
            { title: 'Gearbox Repair', description: 'Complete gearbox overhaul and synchro replacement.', Icon: Cog, image: 'services/gearbox-repair', price: '₹8,000+' },
        ]
    },
    {
        category: 'AC Services',
        services: [
            { title: 'AC Gas Refill', description: 'R134a / R1234yf refrigerant top-up with leak test.', Icon: Wind, image: 'services/ac-gas-refill', price: '₹1,500+' },
            { title: 'AC Compressor Repair', description: 'Compressor rebuild or replacement service.', Icon: Settings2, image: 'services/ac-compressor', price: '₹5,000+' },
            { title: 'AC Cooling Service', description: 'Condenser and evaporator deep cleaning.', Icon: ThermometerSun, image: 'services/ac-cooling', price: '₹2,000+' },
            { title: 'Cabin Filter Replacement', description: 'Fresh cabin air filter for cleaner AC output.', Icon: Filter, image: 'services/cabin-filter', price: '₹600+' },
            { title: 'AC Leak Detection', description: 'UV dye and electronic leak detection.', Icon: Search, image: 'services/ac-leak-detection', price: '₹1,000+' },
        ]
    },
    {
        category: 'Electrical & Diagnostics',
        services: [
            { title: 'Battery Replacement', description: 'Genuine Amaron / Exide battery installation.', Icon: Battery, image: 'services/battery-replacement', price: '₹3,500+' },
            { title: 'Alternator Repair', description: 'Alternator rebuild and charging system test.', Icon: Zap, image: 'services/alternator-repair', price: '₹3,000+' },
            { title: 'Starter Motor Repair', description: 'Starter rebuild, solenoid, and pinion service.', Icon: Zap, image: 'services/starter-motor', price: '₹2,500+' },
            { title: 'Electrical Wiring Repair', description: 'Short circuit tracing and harness repair.', Icon: Cable, image: 'services/electrical-wiring', price: '₹1,200+' },
            { title: 'ECU Diagnostics', description: 'Engine control unit scanning and programming.', Icon: Timer, image: 'services/ecu-diagnostics', price: '₹999+' },
            { title: 'Sensor Replacement', description: 'O2, MAP, MAF, and crank sensor replacement.', Icon: Activity, image: 'services/sensor-replacement', price: '₹1,500+' },
            { title: 'Headlight Repair', description: 'Bulb, ballast, and projector lens repair.', Icon: Lightbulb, image: 'services/headlight-repair', price: '₹800+' },
            { title: 'Power Window Repair', description: 'Motor, regulator, and switch replacement.', Icon: Layers, image: 'services/power-window', price: '₹1,000+' },
        ]
    },
    {
        category: 'Detailing & Care',
        services: [
            { title: 'Interior Deep Cleaning', description: 'Steam wash, fabric extraction, and sanitization.', Icon: Sparkles, image: 'services/interior-cleaning', price: '₹1,500+' },
            { title: 'Exterior Foam Wash', description: 'pH-neutral snow foam and hand dry.', Icon: Droplets, image: 'services/foam-wash', price: '₹500+' },
            { title: 'Car Polishing', description: 'Multi-stage machine polishing for mirror finish.', Icon: PaintBucket, image: 'services/car-polishing', price: '₹2,500+' },
            { title: 'Ceramic Coating', description: '9H ceramic coating for 2-year paint protection.', Icon: ShieldCheck, image: 'services/ceramic-coating', price: '₹12,000+' },
            { title: 'Paint Protection Film (PPF)', description: 'Self-healing TPU film for stone chip protection.', Icon: Layers, image: 'services/ppf-installation', price: '₹25,000+' },
            { title: 'Headlight Restoration', description: 'Sanding, polishing, and UV clear coat.', Icon: Lightbulb, image: 'services/headlight-restoration', price: '₹1,200+' },
            { title: 'Engine Bay Cleaning', description: 'Degrease, steam, and dress engine bay.', Icon: SprayCan, image: 'services/engine-bay-cleaning', price: '₹800+' },
            { title: 'Dashboard Polishing', description: 'UV protectant dressing for dashboard and trims.', Icon: Sparkles, image: 'services/dashboard-polishing', price: '₹600+' },
        ]
    },
    {
        category: 'Tyres & Alignment',
        services: [
            { title: 'Wheel Alignment', description: 'Computerized 3D wheel alignment.', Icon: CircleDot, image: 'services/wheel-alignment', price: '₹600+' },
            { title: 'Wheel Balancing', description: 'Dynamic spin balancing for all four wheels.', Icon: CircleDot, image: 'services/wheel-balancing', price: '₹400+' },
            { title: 'Tyre Replacement', description: 'Premium tyres from MRF, Apollo, Bridgestone.', Icon: Disc3, image: 'services/tyre-replacement', price: '₹3,000+' },
            { title: 'Puncture Repair', description: 'Tubeless plug repair and pressure check.', Icon: Wrench, image: 'services/puncture-repair', price: '₹200+' },
        ]
    },
    {
        category: 'Emergency Services',
        services: [
            { title: 'Roadside Assistance', description: '24/7 on-the-spot mechanic dispatch in Hyderabad.', Icon: PhoneCall, image: 'services/roadside-assistance', price: '₹999+' },
            { title: 'Jump Start Service', description: 'Dead battery jump start at your location.', Icon: Zap, image: 'services/jump-start', price: '₹500+' },
            { title: 'Flat Tyre Assistance', description: 'Spare tyre fitting or mobile puncture repair.', Icon: Disc3, image: 'services/flat-tyre', price: '₹500+' },
            { title: 'Emergency Fuel Delivery', description: 'Petrol or diesel delivered to your GPS location.', Icon: Fuel, image: 'services/fuel-delivery', price: '₹500+' },
            { title: 'Doorstep Battery Replacement', description: 'New battery delivered and installed on-site.', Icon: Battery, image: 'services/doorstep-battery', price: '₹3,500+' },
        ]
    }
];

const categoryNames = allServices.map(c => c.category);

const servicePackages = [
    {
        name: 'Basic Care',
        price: '₹2,499',
        description: 'Essential maintenance for regular upkeep.',
        features: ['Synthetic Engine Oil', 'Oil Filter Upgrade', 'Air Filter Cleaning', 'Coolant Top-up', 'Basic Car Wash'],
        popular: false,
    },
    {
        name: 'Standard Care',
        price: '₹4,999',
        description: 'Comprehensive service for optimal performance.',
        features: ['Fully Synthetic Oil', 'All Filters Replaced', 'Brake Pad Cleaning', 'Spark Plug Check', 'Interior Vacuum & Wash'],
        popular: true,
    },
    {
        name: 'Premium Care',
        price: '₹8,999',
        description: 'Ultimate pampering and thorough diagnostics.',
        features: ['High-Performance Oil', 'Full System Flush', 'AC Gas Top-up', 'Complete Polish & Wax', 'Advanced Diagnostics'],
        popular: false,
    }
];

export default function Services() {
    const [activeFilter, setActiveFilter] = useState<string>('All');
    const filteredCategories = activeFilter === 'All'
        ? allServices
        : allServices.filter(c => c.category === activeFilter);

    return (
        <>
            <SEO
                title="Our Services & Pricing"
                description="45+ professional car services in Hyderabad. From engine repair to ceramic coating, delivered to your doorstep by certified mechanics."
                canonicalUrl="https://proauto.com/services"
            />
            <div className="pt-20 bg-brand-900 min-h-screen">
                {/* Header */}
                <div className="bg-brand-800 py-16 border-b border-gray-800 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                        >
                            Our <span className="text-accent-red">Services</span> & Pricing
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-400 max-w-2xl mx-auto"
                        >
                            45+ professional auto care services delivered to your doorstep across Hyderabad.
                        </motion.p>
                    </div>
                </div>

                {/* Pricing Packages */}
                <div className="bg-carbon py-24 border-b border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Service <span className="text-accent-red">Packages</span></h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Compare our most popular maintenance packages designed to keep your vehicle in pristine condition.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {servicePackages.map((pkg, idx) => (
                                <motion.div
                                    key={pkg.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`relative flex flex-col bg-brand-800 rounded-3xl border ${pkg.popular ? 'border-accent-red shadow-[0_0_30px_rgba(230,0,0,0.15)] scale-105 z-10' : 'border-gray-800 mt-4 mb-4'} p-8`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-accent-red to-red-600 text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-1.5 shadow-[0_5px_15px_rgba(230,0,0,0.3)]">
                                            <Crown size={14} /> Most Popular
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                                    <p className="text-gray-400 text-sm mb-6 h-10">{pkg.description}</p>
                                    <div className="mb-6 border-b border-gray-700/50 pb-6 bg-black/20 -mx-8 px-8 py-4">
                                        <span className={`text-4xl font-black ${pkg.popular ? 'text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-red-400' : 'text-white'}`}>{pkg.price}</span>
                                        <span className="text-gray-400 text-sm block mt-1">Inclusive of taxes & labor</span>
                                    </div>
                                    <ul className="flex-grow space-y-4 mb-8">
                                        {pkg.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-start text-gray-300 text-sm">
                                                <CheckCircle2 className="w-5 h-5 text-accent-red mr-3 shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <a href={generateWhatsAppLink(pkg.name)} target="_blank" rel="noopener noreferrer">
                                        <Button variant={pkg.popular ? 'primary' : 'outline'} className="w-full">
                                            Select Package
                                        </Button>
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="bg-brand-900 border-b border-gray-800/50 sticky top-[4.5rem] z-30 backdrop-blur-md bg-brand-900/90">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            <button
                                onClick={() => setActiveFilter('All')}
                                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === 'All' ? 'bg-accent-red text-white shadow-[0_0_15px_rgba(230,0,0,0.3)]' : 'bg-brand-800 text-gray-400 hover:text-white border border-gray-700'}`}
                            >
                                All Services
                            </button>
                            {categoryNames.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === cat ? 'bg-accent-red text-white shadow-[0_0_15px_rgba(230,0,0,0.3)]' : 'bg-brand-800 text-gray-400 hover:text-white border border-gray-700'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* All Services Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    {filteredCategories.map((cat, catIdx) => (
                        <motion.div
                            key={cat.category}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className={catIdx > 0 ? 'mt-20' : ''}
                        >
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-1.5 h-8 bg-accent-red rounded-full" />
                                <h2 className="text-2xl md:text-3xl font-bold text-white">{cat.category}</h2>
                                <span className="text-gray-500 text-sm font-medium">({cat.services.length} services)</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {cat.services.map((service, sIdx) => (
                                    <motion.div
                                        key={service.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: sIdx * 0.05 }}
                                        className="group bg-brand-800 rounded-2xl border border-gray-800 overflow-hidden hover:border-accent-red/30 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(230,0,0,0.1)] hover:-translate-y-1 flex flex-col"
                                    >
                                        {/* Image — Cloudinary CDN with responsive srcSet */}
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={cardUrl(service.image)}
                                                srcSet={srcSet(service.image)}
                                                sizes={GRID_SIZES}
                                                alt={service.title}
                                                width={400}
                                                height={300}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                loading="lazy"
                                                onError={(e) => { e.currentTarget.src = cardUrl(FALLBACK_PATH) }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-black/20 to-transparent pointer-events-none" />
                                            <div className="absolute top-3 right-3 w-10 h-10 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center text-accent-red">
                                                <service.Icon size={18} />
                                            </div>
                                            <div className="absolute bottom-3 left-3">
                                                <span className="text-white font-bold text-sm bg-accent-red/90 backdrop-blur-sm px-3 py-1 rounded-full">{service.price}</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <h3 className="text-base font-bold text-white mb-2 group-hover:text-accent-red transition-colors">{service.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">{service.description}</p>
                                            <a href={generateWhatsAppLink(service.title)} target="_blank" rel="noopener noreferrer" className="block">
                                                <Button size="sm" className="w-full text-xs">Book via WhatsApp</Button>
                                            </a>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}
