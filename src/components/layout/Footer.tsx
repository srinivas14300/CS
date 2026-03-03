import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
export default function Footer() {
    return (
        <footer className="bg-[#111] pt-16 pb-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand & About */}
                    <div>
                        <Logo className="mb-6" />
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Serving Hyderabad & Surrounding Areas with premium doorstep car service & maintenance. We bring professional auto care directly to your home or office.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center text-gray-400 hover:bg-accent-red hover:text-white transition-all duration-300">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center text-gray-400 hover:bg-accent-red hover:text-white transition-all duration-300">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center text-gray-400 hover:bg-accent-red hover:text-white transition-all duration-300">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-gray-400 hover:text-accent-red transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-accent-red transition-colors">Our Services</Link></li>
                            <li><Link to="/gallery" className="text-gray-400 hover:text-accent-red transition-colors">Gallery</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-accent-red transition-colors">Contact</Link></li>
                            <li><Link to="/privacy" className="text-gray-400 hover:text-accent-red transition-colors text-sm">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-accent-red transition-colors text-sm">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Our Services</h3>
                        <ul className="space-y-4">
                            <li className="text-gray-400">Regular Maintenance</li>
                            <li className="text-gray-400">Engine Diagnostics</li>
                            <li className="text-gray-400">Premium Detailing</li>
                            <li className="text-gray-400">AC Servicing</li>
                            <li className="text-gray-400">Battery Replacement</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4 text-gray-400">
                                <MapPin className="text-accent-red shrink-0 mt-1" size={20} />
                                <span>ProAuto Service Center<br />Madhapur, Hyderabad<br />Telangana 500081</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-400">
                                <Phone className="text-accent-red shrink-0" size={20} />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-400">
                                <Mail className="text-accent-red shrink-0" size={20} />
                                <span>hello@proauto.com</span>
                            </li>
                            <li className="flex items-start gap-4 text-gray-400">
                                <Clock className="text-accent-red shrink-0 mt-1" size={20} />
                                <div>
                                    <p>Mon - Sat: 8:00 AM - 6:00 PM</p>
                                    <p>Sunday: Closed</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} ProAuto Service. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
