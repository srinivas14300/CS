import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Immediate scroll to bypass browser history scroll restoration
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
