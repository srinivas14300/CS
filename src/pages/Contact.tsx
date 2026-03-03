import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/SEO';
import { generateWhatsAppLink } from '../lib/whatsapp';

export default function Contact() {
    const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const phone = formData.get('phone') as string;
        const service = formData.get('service') as string;
        const message = formData.get('message') as string;

        let customMessage = `Hello, I'm ${name || 'a customer'}. `;
        if (phone) customMessage += `Contact: ${phone}. `;
        if (service) customMessage += `I need help with: ${service}. `;
        if (message) customMessage += `\n\nNotes: ${message}`;

        window.open(generateWhatsAppLink(customMessage), '_blank');
    };

    return (
        <>
            <SEO
                title="Contact Us"
                description="Get in touch with ProAuto for Car Sales & Services bookings, inquiries, and emergency assistance. We're available 24/7."
                canonicalUrl="https://proauto.com/contact"
            />
            <div className="pt-20 bg-brand-900 min-h-screen">
                <div className="bg-brand-800 py-16 border-b border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                            Get In <span className="text-accent-red">Touch</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-400 max-w-2xl mx-auto"
                        >
                            Have a question or ready to book a service? Reach out to us directly or drop a message.
                        </motion.p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col h-full"
                        >
                            <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>

                            <div className="space-y-8 mb-8 flex-grow">
                                <div className="flex items-start gap-6">
                                    <div className="w-14 h-14 bg-brand-800 rounded-2xl border border-gray-700 flex items-center justify-center shrink-0 shadow-lg text-accent-red">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Our Location</h3>
                                        <p className="text-gray-400 leading-relaxed">ProAuto Service Center<br />Madhapur, Hyderabad<br />Telangana 500081</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-14 h-14 bg-brand-800 rounded-2xl border border-gray-700 flex items-center justify-center shrink-0 shadow-lg text-accent-red">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Phone Number</h3>
                                        <p className="text-gray-400 mb-1">+91 98765 43210</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-14 h-14 bg-brand-800 rounded-2xl border border-gray-700 flex items-center justify-center shrink-0 shadow-lg text-accent-red">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Email Address</h3>
                                        <p className="text-gray-400">hello@proauto.com</p>
                                        <p className="text-gray-400">support@proauto.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-14 h-14 bg-brand-800 rounded-2xl border border-gray-700 flex items-center justify-center shrink-0 shadow-lg text-accent-red">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Working Hours</h3>
                                        <p className="text-gray-400">Monday - Saturday: 8:00 AM - 6:00 PM</p>
                                        <p className="text-gray-400">Sunday: Closed for maintenance</p>
                                    </div>
                                </div>
                            </div>

                            {/* Google Maps Embed */}
                            <div className="w-full h-64 md:h-80 rounded-3xl overflow-hidden border border-gray-700 shadow-xl mt-auto grayscale-[0.5] hover:grayscale-0 transition-all duration-700 relative group">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] pointer-events-none">
                                    <div className="w-12 h-12 bg-accent-red rounded-full flex items-center justify-center animate-bounce shadow-[0_0_20px_rgba(230,0,0,0.5)] border-2 border-white">
                                        <MapPin className="text-white w-6 h-6" />
                                    </div>
                                </div>
                                <iframe
                                    title="Google Maps Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60895.04768475795!2d78.3345423!3d17.4399225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688beb557fa0ee!2sMadhapur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, borderRadius: '1.5rem' }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-brand-800 p-8 md:p-10 rounded-3xl border border-gray-700 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold text-white mb-8">Send Us a Message</h2>

                            <form className="space-y-6" onSubmit={handleWhatsAppSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="w-full bg-brand-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            className="w-full bg-brand-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red transition-colors"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Email (Optional)</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full bg-brand-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Service Needed</label>
                                    <select name="service" className="w-full bg-brand-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red transition-colors appearance-none">
                                        <option value="General Maintenance">General Maintenance</option>
                                        <option value="AC Service & Repair">AC Service & Repair</option>
                                        <option value="Battery Replacement">Battery Replacement</option>
                                        <option value="Premium Detailing">Premium Detailing</option>
                                        <option value="Diagnostics">Diagnostics</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                    <textarea
                                        rows={4}
                                        name="message"
                                        className="w-full bg-brand-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red transition-colors resize-none"
                                        placeholder="Tell us about your car and the issue..."
                                    ></textarea>
                                </div>

                                <Button type="submit" size="lg" className="w-full flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(230,0,0,0.3)]">
                                    Send via WhatsApp
                                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
