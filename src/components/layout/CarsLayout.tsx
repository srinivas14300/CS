import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from '../ui/FloatingWhatsApp';
import { ScrollProgress } from '../ui/ScrollProgress';
import { ScrollToTop } from '../ui/ScrollToTop';
import { GlobalToggle } from './GlobalToggle';

interface CarsLayoutProps {
    children: React.ReactNode;
}

export default function CarsLayout({ children }: CarsLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-brand-900 car-marketplace-theme overflow-x-hidden">
            <ScrollToTop />
            <ScrollProgress />
            <GlobalToggle />
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <FloatingWhatsApp />
        </div>
    );
}
