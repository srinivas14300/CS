import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from '../ui/FloatingWhatsApp';
import { ScrollProgress } from '../ui/ScrollProgress';
import { ScrollToTop } from '../ui/ScrollToTop';
import { GlobalToggle } from './GlobalToggle';

interface ServicesLayoutProps {
    children: React.ReactNode;
}

export default function ServicesLayout({ children }: ServicesLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-brand-900 overflow-x-hidden">
            <ScrollToTop />
            <ScrollProgress />
            <Navbar />
            <GlobalToggle />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <FloatingWhatsApp />
        </div>
    );
}
