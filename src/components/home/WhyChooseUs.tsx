import { AnimatedCounter } from '../ui/AnimatedCounter';
import { motion } from 'framer-motion';
import { Wrench, Shield, Clock, Users, Calendar } from 'lucide-react';

export function WhyChooseUs() {
    return (
        <section className="py-24 bg-brand-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Why <span className="text-accent-red">Thousands</span> Trust Our Service
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            We combine state-of-the-art diagnostic technology with decades of hands-on experience to deliver dealership-quality service right to your doorstep, at a fraction of the cost.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {[
                                'Transparent pricing with zero hidden fees',
                                'Advanced OEM-level computer diagnostics',
                                'Fully certified and insured master mechanics',
                                'Comprehensive warranty on all parts and labor'
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <Shield className="w-6 h-6 text-accent-red mr-3 shrink-0" />
                                    <span className="text-gray-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-brand-800 to-black border border-white/5 p-8 rounded-2xl hover:border-accent-red/50 shadow-xl hover:shadow-[0_10px_30px_rgba(230,0,0,0.15)] transition-all duration-300 transform hover:-translate-y-1 group">
                            <AnimatedCounter end={15} suffix="+" label="Years Experience" Icon={Clock} />
                        </div>
                        <div className="bg-gradient-to-br from-brand-800 to-black border border-white/5 p-8 rounded-2xl hover:border-accent-red/50 shadow-xl hover:shadow-[0_10px_30px_rgba(230,0,0,0.15)] transition-all duration-300 transform hover:-translate-y-1 group mt-8">
                            <AnimatedCounter end={25} suffix="k+" label="Cars Serviced" Icon={Wrench} />
                        </div>
                        <div className="bg-gradient-to-br from-brand-800 to-black border border-white/5 p-8 rounded-2xl hover:border-accent-red/50 shadow-xl hover:shadow-[0_10px_30px_rgba(230,0,0,0.15)] transition-all duration-300 transform hover:-translate-y-1 group">
                            <AnimatedCounter end={99} suffix="%" label="Happy Clients" Icon={Users} />
                        </div>
                        <div className="bg-gradient-to-br from-brand-800 to-black border border-white/5 p-8 rounded-2xl hover:border-accent-red/50 shadow-xl hover:shadow-[0_10px_30px_rgba(230,0,0,0.15)] transition-all duration-300 transform hover:-translate-y-1 group mt-8">
                            <AnimatedCounter end={24} suffix="/7" label="Support Available" Icon={Calendar} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
