import { motion } from 'framer-motion';
import { ShieldCheck, Award, Clock, Wrench } from 'lucide-react';

export function GuaranteeBanner() {
    const guarantees = [
        {
            icon: ShieldCheck,
            title: "100% Satisfaction Guarantee",
            description: "We aren't happy until you're completely satisfied with our service."
        },
        {
            icon: Award,
            title: "Premium OEM Parts",
            description: "We only use genuine, manufacturer-approved parts for all repairs."
        },
        {
            icon: Clock,
            title: "On-Time Delivery",
            description: "We respect your time. Your car will be ready exactly when promised."
        },
        {
            icon: Wrench,
            title: "Certified Master Mechanics",
            description: "Your vehicle is handled only by highly trained, certified experts."
        }
    ];

    return (
        <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 py-16 border-y border-gray-800 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-red/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            The <span className="text-accent-red">ProAuto</span> Promise
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto md:text-lg">
                            We stand behind our work. Our commitment to excellence means you can drive with absolute confidence.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {guarantees.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gradient-to-br from-brand-800 to-black backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center group hover:border-accent-red/50 hover:shadow-[0_10px_30px_rgba(230,0,0,0.15)] transition-all duration-300 transform hover:-translate-y-2 shadow-xl relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-accent-red/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            <div className="w-16 h-16 bg-brand-900 border border-gray-700 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent-red/20 group-hover:border-accent-red/50 transition-all duration-500 relative z-10 shadow-lg">
                                <item.icon className="w-8 h-8 text-accent-red" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
