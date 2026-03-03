import { motion } from 'framer-motion';
import { CalendarCheck, Car, Settings, Star } from 'lucide-react';

const steps = [
    {
        icon: CalendarCheck,
        title: 'Book an Appointment',
        description: 'Schedule a service online or via WhatsApp at your preferred time and date.',
    },
    {
        icon: Car,
        title: 'We Pick Up / Arrive',
        description: 'Our expert mechanic arrives at your doorstep, or we pick up your car for major repairs.',
    },
    {
        icon: Settings,
        title: 'Expert Servicing',
        description: 'We perform thorough diagnostics and servicing using premium tools and genuine parts.',
    },
    {
        icon: Star,
        title: 'Delivery & Feedback',
        description: 'Your car is handed over perfectly running. You review us and drive with a smile.',
    },
];

export function ProcessTimeline() {
    return (
        <section className="py-20 bg-brand-900 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                        How It <span className="text-accent-red">Works</span>
                    </h2>
                    <p className="text-lg text-gray-400">
                        A seamless, hassle-free process designed around your convenience.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line Base */}
                    <div className="hidden md:block absolute top-[40px] left-[12.5%] w-[75%] h-1 bg-gray-800 z-0" />
                    {/* Animated Connecting Line Fill */}
                    <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "75%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                        className="hidden md:block absolute top-[40px] left-[12.5%] h-1 bg-accent-red z-0"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="w-24 h-24 bg-gradient-to-br from-brand-800 to-gray-900 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-xl relative z-10 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 group-hover:border-accent-red/50">
                                    {/* Step Number Badge */}
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent-red rounded-full flex items-center justify-center text-white font-bold text-sm border-[3px] border-brand-900 shadow-md">
                                        {index + 1}
                                    </div>
                                    <step.icon size={40} className="text-white group-hover:text-accent-red transition-colors drop-shadow-md" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
