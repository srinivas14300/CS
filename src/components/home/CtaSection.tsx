import { Shield, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function CtaSection() {
    return (
        <section className="py-20 relative overflow-hidden bg-brand-900 border-t border-gray-800">
            {/* Background Graphic */}
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-color-dodge">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-red/30 via-brand-900 to-brand-900"
                />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-6">
                    Ready to give your car the <span className="text-metallic text-accent-red/0 bg-clip-text bg-gradient-to-r from-accent-red via-red-500 to-accent-red">premium treatment</span> it deserves?
                </h2>
                <p className="text-xl text-gray-300 mb-10">
                    Book your service today and experience the difference of professional doorstep auto care.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="https://wa.me/919876543210?text=Hello,%20I%20want%20to%20book%20a%20car%20service" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                            Book via WhatsApp
                        </Button>
                    </a>
                    <a href="tel:+919876543210">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8">
                            Call Us Now
                        </Button>
                    </a>
                </div>

                <div className="flex justify-center gap-8 mt-12 opacity-80">
                    <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                        <Shield className="w-5 h-5 text-accent-red" />
                        100% Guaranteed Work
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-sm text-gray-300 font-medium">
                        <Star className="w-5 h-5 text-accent-red fill-accent-red" />
                        4.9/5 Google Rating
                    </div>
                </div>
            </div>
        </section>
    );
}
