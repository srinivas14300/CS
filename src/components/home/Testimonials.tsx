import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { avatarUrl } from '../../lib/cloudinary';

const testimonials = [
    {
        name: 'Rahul S.',
        location: 'Jubilee Hills, Hyderabad',
        date: '2 weeks ago',
        car: 'Honda City',
        text: 'Incredible service! The mechanics arrived exactly on time to my office parking lot. They were very professional and explained the service clearly. The pricing is perfectly transparent.',
        rating: 5,
        image: avatarUrl('testimonials/rahul-s'),
    },
    {
        name: 'Priya M.',
        location: 'Gachibowli, Hyderabad',
        date: '1 month ago',
        car: 'Hyundai Creta',
        text: 'I used to hate taking a day off just to visit the dealership for routine maintenance. ProAuto makes it so effortless by coming straight to my home. Highly recommended!',
        rating: 5,
        image: avatarUrl('testimonials/priya-m'),
    },
    {
        name: 'Vikram K.',
        location: 'Kukatpally, Hyderabad',
        date: '3 weeks ago',
        car: 'Toyota Innova Crysta',
        text: 'Their detailing service is top-notch. My car looks brand new, inside and out before our family road trip. The convenience of doorstep luxury service is just game-changing.',
        rating: 5,
        image: avatarUrl('testimonials/vikram-k'),
    },
];

export function Testimonials() {
    return (
        <section className="py-20 bg-brand-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                        What Our <span className="text-accent-red">Clients</span> Say
                    </h2>
                    <p className="text-lg text-gray-400">
                        Don't just take our word for it. Read the experiences of our satisfied customers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-brand-900 p-8 rounded-2xl border border-gray-800 hover:border-accent-red/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-red/5 transition-all duration-300 relative flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex text-accent-red">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={20} fill="currentColor" />
                                    ))}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        <path d="M1 1h22v22H1z" fill="none" />
                                    </svg>
                                    Verified
                                </div>
                            </div>
                            <p className="text-gray-300 mb-6 italic leading-relaxed flex-grow whitespace-pre-line">"{testimonial.text}"</p>
                            <div className="flex items-center gap-4 border-t border-gray-800 pt-6 mt-auto">
                                <img src={testimonial.image} alt={`Photo of ${testimonial.name}`} width={48} height={48} className="w-12 h-12 rounded-full object-cover border-2 border-brand-800" loading="lazy" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-white flex items-center gap-2">
                                        {testimonial.name}
                                        <span className="text-xs text-gray-500 font-normal">{testimonial.date}</span>
                                    </span>
                                    <span className="text-xs text-accent-red font-medium">{testimonial.car} &bull; <span className="text-gray-400">{testimonial.location}</span></span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
