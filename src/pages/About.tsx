import { motion } from 'framer-motion';
import { Target, Shield, Heart } from 'lucide-react';
import { SEO } from '../components/SEO';
import { showcaseUrl, srcSet } from '../lib/cloudinary';

export default function About() {
    return (
        <>
            <SEO
                title="About Us"
                description="Learn about ProAuto's mission to redefine auto care. We deliver premium, transparent, and expert mechanical services straight to your location."
                canonicalUrl="https://proauto.com/about"
            />
            <div className="pt-20 bg-brand-900 min-h-screen">
                {/* Header */}
                <div className="bg-brand-800 py-16 border-b border-gray-800 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent-red/10 via-brand-800 to-brand-800" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                            About <span className="text-accent-red">ProAuto</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                        >
                            We're revolutionizing the auto care industry by combining top-tier technical expertise with unparalleled customer convenience.
                        </motion.p>
                    </div>
                </div>

                {/* Our Story */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                                <p>
                                    Founded in 2020, ProAuto was born out of frustration with the traditional car repair experience. Long wait times at dealerships, opaque pricing, and the sheer inconvenience of being without a vehicle for days drove us to rethink how auto maintenance should work.
                                </p>
                                <p>
                                    We asked a simple question: What if the workshop came to you?
                                </p>
                                <p>
                                    Today, we operate a fleet of fully-equipped mobile service units manned by certified technicians. We bring the expertise, the tools, and the parts directly to your home or office, ensuring transparency and convenience in every job we undertake.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <img
                                src={showcaseUrl('about/mechanic-working')}
                                srcSet={srcSet('about/mechanic-working')}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                alt="Mechanic working"
                                width={1500}
                                height={1000}
                                className="rounded-2xl shadow-2xl border border-gray-800"
                                loading="lazy"
                            />
                            <div className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 bg-brand-800/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-10">
                                <p className="text-4xl sm:text-5xl font-bold text-white mb-2 drop-shadow-md">5<span className="text-accent-red">+</span></p>
                                <p className="text-gray-300 font-medium uppercase tracking-wider text-sm">Years of Excellence</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Core Values */}
                <div className="bg-brand-800 py-24 border-y border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white">Our Core Values</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Target,
                                    title: 'Precision & Quality',
                                    text: 'We never compromise on the quality of parts or the precision of our work. Every repair is done right the first time.'
                                },
                                {
                                    icon: Shield,
                                    title: 'Transparency',
                                    text: 'No hidden fees, no unnecessary repairs. We show you exactly what needs to be fixed and give upfront pricing.'
                                },
                                {
                                    icon: Heart,
                                    title: 'Customer First',
                                    text: 'Your convenience is our priority. We respect your time and vehicle, treating every car as if it were our own.'
                                }
                            ].map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="text-center p-10 bg-gradient-to-br from-brand-800 to-brand-900 border border-white/5 rounded-3xl hover:-translate-y-2 transition-transform duration-500 shadow-xl group"
                                >
                                    <div className="w-20 h-20 mx-auto bg-brand-900/50 rounded-full border border-gray-700 flex items-center justify-center mb-6 text-accent-red shadow-inner group-hover:scale-110 transition-transform duration-500 group-hover:bg-accent-red/10 group-hover:border-accent-red/30">
                                        <value.icon size={32} className="drop-shadow-[0_0_10px_rgba(230,0,0,0.3)]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{value.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
