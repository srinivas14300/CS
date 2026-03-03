import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Shield, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { GoogleBadge } from '../ui/GoogleBadge';
import { generateWhatsAppLink } from '../../lib/whatsapp';
import { heroUrl } from '../../lib/cloudinary';

export function Hero() {
    return (
        <>
            <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                {/* Cinematic Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="none"
                        poster={heroUrl('hero/car-cinematic')}
                        className="w-full h-full object-cover opacity-40"
                        // @ts-expect-error fetchpriority is valid HTML but not in React types
                        fetchpriority="high"
                    >
                        <source src="https://player.vimeo.com/external/498305096.sd.mp4?s=d125799dfd941de51eb677cc2032e549117cf4891&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
                        {/* Free stock video placeholder for cinematic car footage */}
                        <source src="https://cdn.pixabay.com/vimeo/305537552/car-20353.mp4?width=1280&hash=0ba1ea52a0aef8aa6a7e0dcd950b73be5a5bd21c" type="video/mp4" />
                    </video>

                    {/* Gradients and Overlays for depth */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/90 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent" />
                    <div className="absolute inset-0 bg-black/60" />

                    {/* Artificial Headlight Flare */}
                    <div className="absolute top-1/2 right-[20%] w-[500px] h-[500px] bg-accent-red/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />

                    {/* Subtle Smoke/Particle effect */}
                    <div className="absolute bottom-0 right-0 w-full h-[50%] overflow-hidden opacity-30 pointer-events-none">
                        <div className="absolute bottom-[-10%] right-[10%] w-[300px] h-[300px] bg-white/10 blur-[80px] rounded-full animate-smoke" style={{ animationDelay: '0s' }} />
                        <div className="absolute bottom-[-20%] right-[30%] w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full animate-smoke" style={{ animationDelay: '4s' }} />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6 drop-shadow-2xl">
                                Professional Car Service & <br />
                                <span className="text-metallic text-accent-red/0 bg-clip-text bg-gradient-to-r from-accent-red via-red-500 to-accent-red">Certified</span> Car Sales.
                            </h1>

                            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed font-medium">
                                We provide professional car servicing along with certified new and used car sales — all in one place.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 mb-8">
                                <a href={generateWhatsAppLink()} className="flex-1">
                                    <Button size="lg" className="w-full text-lg group h-14 px-8 shadow-xl bg-accent-red hover:bg-white text-white hover:text-accent-red transition-all duration-300 border-2 border-transparent hover:border-accent-red flex items-center justify-center gap-2">
                                        Book Service
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </a>
                                <a href="/cars" className="flex-1">
                                    <Button size="lg" className="w-full text-lg group h-14 px-8 shadow-xl bg-white text-brand-900 hover:bg-accent-red hover:text-white transition-all duration-300 border-2 border-transparent hover:border-accent-red flex items-center justify-center gap-2">
                                        Browse Cars
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </a>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-12">
                                <span className="flex items-center gap-2">• Genuine Parts</span>
                                <span className="flex items-center gap-2">• Certified Used Cars</span>
                                <span className="flex items-center gap-2">• Transparent Pricing</span>
                                <span className="flex items-center gap-2">• Quick Turnaround</span>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                            >
                                <GoogleBadge />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Trust & Guarantee Strip */}
            <div className="relative z-20 bg-brand-800 border-y border-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 items-center text-sm md:text-base font-medium text-gray-300">
                        <div className="flex flex-col items-center justify-center gap-3 text-center md:border-r border-white/10 pb-6 md:pb-0 border-b md:border-b-0 py-2">
                            <Star className="text-accent-red w-8 h-8 fill-accent-red drop-shadow-md" />
                            <span className="text-gray-200">4.9/5 Average Rating</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-3 text-center md:border-r border-white/10 pb-6 md:pb-0 border-b md:border-b-0 py-2">
                            <Shield className="text-accent-red w-8 h-8 drop-shadow-md" />
                            <span className="text-gray-200">100% Genuine Parts</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-3 text-center md:border-r border-white/10 pt-6 md:pt-0 py-2">
                            <Calendar className="text-accent-red w-8 h-8 drop-shadow-md" />
                            <span className="text-gray-200">Same-Day Service</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-3 text-center pt-6 md:pt-0 py-2">
                            <svg className="text-accent-red w-8 h-8 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-gray-200">Serving Hyderabad</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
