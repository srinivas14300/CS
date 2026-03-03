import React, { createContext, useContext, useState, useEffect } from 'react';

type MarketMode = 'services' | 'sales';

interface MarketModeContextType {
    mode: MarketMode;
    toggleMode: (newMode: MarketMode) => void;
}

const MarketModeContext = createContext<MarketModeContextType | undefined>(undefined);

export function MarketModeProvider({ children }: { children: React.ReactNode }) {
    // Default to 'sales' if the URL starts with /cars, otherwise 'services'
    const [mode, setMode] = useState<MarketMode>(() => {
        const path = window.location.pathname;
        return path.startsWith('/cars') ? 'sales' : 'services';
    });

    const toggleMode = (newMode: MarketMode) => {
        setMode(newMode);
        // Persist or handle routing side effects if needed
    };

    // Keep mode in sync with URL if user navigates manually
    useEffect(() => {
        const handlePathChange = () => {
            const path = window.location.pathname;
            if (path.startsWith('/cars')) {
                setMode('sales');
            } else if (path === '/' || path.startsWith('/services') || path.startsWith('/about')) {
                setMode('services');
            }
        };

        window.addEventListener('popstate', handlePathChange);
        return () => window.removeEventListener('popstate', handlePathChange);
    }, []);

    return (
        <MarketModeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </MarketModeContext.Provider>
    );
}

export function useMarketMode() {
    const context = useContext(MarketModeContext);
    if (context === undefined) {
        throw new Error('useMarketMode must be used within a MarketModeProvider');
    }
    return context;
}
