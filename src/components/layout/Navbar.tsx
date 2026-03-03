import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useMarketMode } from '../../context/MarketModeContext';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { mode } = useMarketMode();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const navLinks = useMemo(() => {
        if (mode === 'sales') {
            return [
                { name: 'Inventory', path: '/cars' },
                { name: 'New Cars', path: '/cars?condition=new' },
                { name: 'Used Cars', path: '/cars?condition=used' },
                { name: 'Sell Your Car', path: '/sell' },
            ];
        }
        return [
            { name: 'Home', path: '/' },
            { name: 'Buy Cars', path: '/cars' },
            { name: 'Our Services', path: '/services' },
            { name: 'About', path: '/about' },
            { name: 'Gallery', path: '/gallery' },
            { name: 'Contact', path: '/contact' },
        ];
    }, [mode]);

    const ctaText = mode === 'sales' ? 'Book Test Drive' : 'Book Now';
    const ctaIcon = mode === 'sales' ? <MessageSquare size={18} /> : <Phone size={18} />;

    return (
        <>
            <nav
                className={`fixed w-full z-[80] transition-all duration-300 top-0 ${isScrolled ? 'bg-brand-900/95 backdrop-blur-md shadow-lg py-3 border-b border-gray-800/50' : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <Logo />

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red rounded-sm px-1 ${location.pathname === link.path ? 'text-accent-red' : 'text-gray-400'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                to="/contact"
                                className="bg-accent-red hover:bg-white text-white hover:text-accent-red px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-xl shadow-accent-red/20 flex items-center gap-2 transform hover:-translate-y-0.5 border-2 border-transparent hover:border-accent-red"
                            >
                                {ctaIcon}
                                {ctaText}
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red rounded-xl p-2 border border-gray-800 bg-brand-800/50"
                                aria-label="Toggle Navigation"
                                aria-expanded={isMobileMenuOpen}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <div className="md:hidden absolute top-full left-0 w-full bg-brand-900 border-b border-gray-800 shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300">
                            <div className="px-6 pt-4 pb-10 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={`block px-4 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${location.pathname === link.path
                                            ? 'text-accent-red bg-accent-red/5 border border-accent-red/10'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Link
                                    to="/contact"
                                    className="block mt-6 text-center bg-accent-red text-white px-6 py-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-accent-red/20 active:scale-95 transition-all"
                                >
                                    {ctaText}
                                </Link>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}

// Minimal AnimatePresence mock if needed, but App already uses framer-motion
function AnimatePresence({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
