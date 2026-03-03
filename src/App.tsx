import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useEffect } from 'react';
import Home from './pages/Home';
import { useMarketMode } from './context/MarketModeContext';
import ServicesLayout from './components/layout/ServicesLayout';
import CarsLayout from './components/layout/CarsLayout';

// ── Lazy-loaded routes ──
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const CarsHome = lazy(() => import('./pages/CarsHome'));
const CarDetailsPage = lazy(() => import('./pages/CarDetailsPage'));
const SellCarPage = lazy(() => import('./pages/SellCarPage'));

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

function RouteFallback() {
  return (
    <div className="min-h-screen bg-brand-900 flex items-center justify-center">
      <div className="text-white text-2xl font-bold tracking-tighter flex items-center gap-2 animate-pulse">
        <span>PRO</span>
        <span className="text-accent-red">AUTO</span>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();
  const { mode, toggleMode } = useMarketMode();

  // Redirect if URL doesn't match mode (for deep linking)
  useEffect(() => {
    if ((location.pathname.startsWith('/cars') || location.pathname.startsWith('/sell')) && mode !== 'sales') {
      toggleMode('sales');
    } else if ((location.pathname === '/' || location.pathname.startsWith('/services')) && mode !== 'services' && !location.pathname.startsWith('/sell')) {
      toggleMode('services');
    }
  }, [location.pathname, mode, toggleMode]);

  return (
    <Suspense fallback={<RouteFallback />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname.split('/')[1] || 'services'}>
          {/* Sales Mode Routes */}
          <Route path="/cars/*" element={
            <CarsLayout>
              <Routes>
                <Route index element={<PageWrapper><CarsHome /></PageWrapper>} />
                <Route path=":id" element={<PageWrapper><CarDetailsPage /></PageWrapper>} />
                {/* Fallback within cars */}
                <Route path="*" element={<Navigate to="/cars" replace />} />
              </Routes>
            </CarsLayout>
          } />

          <Route path="/sell" element={
            <CarsLayout>
              <PageWrapper><SellCarPage /></PageWrapper>
            </CarsLayout>
          } />

          {/* Services Mode Routes */}
          <Route path="/*" element={
            <ServicesLayout>
              <Routes>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
                <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                <Route path="/privacy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
                <Route path="/terms" element={<PageWrapper><TermsOfService /></PageWrapper>} />
                <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
              </Routes>
            </ServicesLayout>
          } />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default App;
