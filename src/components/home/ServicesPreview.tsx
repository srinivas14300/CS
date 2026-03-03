import { Wrench, Battery, Wind, Droplets, Activity, ShieldCheck, ArrowRight } from 'lucide-react';
import { ServiceCard } from '../ui/ServiceCard';
import { motion } from 'framer-motion';

const services = [
    {
        title: 'Engine Repair & Overhaul',
        description: 'Comprehensive mechanical check-ups, oil changes, and tune-ups to keep your engine running smoothly.',
        Icon: Wrench,
        imagePath: 'services-preview/engine-repair',
    },
    {
        title: 'AC Service & Repair',
        description: 'Complete inspection and gas refill to ensure your cabin stays cool during summers.',
        Icon: Wind,
        imagePath: 'services-preview/ac-service',
    },
    {
        title: 'Battery Replacement',
        description: 'On-the-spot battery testing, jump-starts, and replacement with genuine brands.',
        Icon: Battery,
        imagePath: 'services-preview/battery-replacement',
    },
    {
        title: 'Premium Detailing',
        description: 'Exterior polishing and interior deep cleaning for that showroom shine.',
        Icon: Droplets,
        imagePath: 'services-preview/premium-detailing',
    },
    {
        title: 'ECU Diagnostics',
        description: 'Advanced computer diagnostics to identify and resolve complex engine issues.',
        Icon: Activity,
        imagePath: 'services-preview/ecu-diagnostics',
    },
    {
        title: 'Brake Service',
        description: 'Brake pad replacement, fluid checks, and disc skimming for your safety.',
        Icon: ShieldCheck,
        imagePath: 'services-preview/brake-service',
    },
];

export function ServicesPreview() {
    return (
        <section className="py-24 bg-brand-900 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6"
                    >
                        Premium Services Delivered to <span className="text-accent-red">Your Doorstep</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-400"
                    >
                        We offer a comprehensive range of car care services using state-of-the-art equipment and highly trained professionals.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.title}
                            {...service}
                            delay={index * 0.1}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <a href="/services" className="inline-flex items-center gap-2 bg-transparent border-2 border-accent-red text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:bg-accent-red hover:shadow-[0_0_20px_rgba(230,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red group">
                        Explore All 17+ Services
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
