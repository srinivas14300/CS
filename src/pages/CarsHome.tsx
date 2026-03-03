import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { SalesHero } from '../components/sales/SalesHero';
import { Filters } from '../components/sales/Filters';
import type { FilterState, SortOption } from '../components/sales/Filters';
import { CarList } from '../components/sales/CarList';
import { FeaturedCars } from '../components/sales/FeaturedCars';
import { SellCarSection } from '../components/sales/SellCarSection';
import { mockCars } from '../data/mockCars';
import { SEO } from '../components/SEO';

export default function CarsHome() {
    const [searchParams] = useSearchParams();
    const [condition, setCondition] = useState<'new' | 'used'>((searchParams.get('condition') as 'new' | 'used') || 'new');

    useEffect(() => {
        const cond = searchParams.get('condition');
        if (cond === 'new' || cond === 'used') {
            setCondition(cond);
        }
    }, [searchParams]);

    const [activeFilters, setActiveFilters] = useState<FilterState>({
        search: '',
        selectedBrands: [],
        priceRange: [0, 10000000],
        yearRange: [2015, 2025],
        fuelTypes: [],
        transmissions: [],
    });

    const [sortOption, setSortOption] = useState<SortOption>('newest');

    const handleFilterChange = useCallback((filters: FilterState) => {
        setActiveFilters(filters);
    }, []);

    const handleSortChange = useCallback((sort: SortOption) => {
        setSortOption(sort);
    }, []);

    const brands = useMemo(() => {
        return Array.from(new Set(mockCars.map(car => car.brand))).sort();
    }, []);

    const filteredAndSortedCars = useMemo(() => {
        let results = mockCars.filter(car => {
            // Condition filter (Strict separation)
            if (car.condition !== condition) return false;

            // Search filter
            const searchMatch = !activeFilters.search ||
                car.brand.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
                car.model.toLowerCase().includes(activeFilters.search.toLowerCase());

            // Brand filter
            const brandMatch = activeFilters.selectedBrands.length === 0 ||
                activeFilters.selectedBrands.includes(car.brand);

            // Price filter
            const priceMatch = car.price >= activeFilters.priceRange[0] &&
                car.price <= activeFilters.priceRange[1];

            // Year filter
            const yearMatch = car.year >= activeFilters.yearRange[0] &&
                car.year <= activeFilters.yearRange[1];

            // Fuel filter
            const fuelMatch = activeFilters.fuelTypes.length === 0 ||
                activeFilters.fuelTypes.includes(car.fuel);

            // Transmission filter
            const transMatch = activeFilters.transmissions.length === 0 ||
                activeFilters.transmissions.includes(car.transmission);

            return searchMatch && brandMatch && priceMatch && yearMatch && fuelMatch && transMatch;
        });

        // Apply Sorting
        return [...results].sort((a, b) => {
            switch (sortOption) {
                case 'price-low': return a.price - b.price;
                case 'price-high': return b.price - a.price;
                case 'km-low': return (a.km || 0) - (b.km || 0);
                case 'newest':
                default:
                    return b.year - a.year;
            }
        });
    }, [activeFilters, sortOption, condition]);


    return (
        <main className="bg-brand-900 min-h-screen">
            <SEO
                title={condition === 'new' ? "New Cars in India | Buy Latest Models | ProAuto" : "Verified Used Cars for Sale | Best Prices | ProAuto"}
                description="Explore 50+ professional car listings across India. Featured new models and certified pre-owned vehicles with transparent pricing and inspection reports."
            />

            <SalesHero />

            <div className="relative z-40 -mt-8">
                <Filters
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                    brands={brands}
                    activeFilters={activeFilters}
                    resultsCount={filteredAndSortedCars.length}
                />
            </div>

            {/* Featured Section - Subtle Contrast */}
            {condition === 'new' && (
                <section className="bg-brand-800/30 py-24 border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                            <div>
                                <h2 className="text-sm font-black text-accent-red uppercase tracking-[0.4em] mb-4">Curated Selection</h2>
                                <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
                                    Featured <span className="text-gray-500">Inventory</span>
                                </h3>
                            </div>
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest max-w-sm">
                                Handpicked premium models with exclusive benefits and priority delivery.
                            </p>
                        </div>
                        <FeaturedCars />
                    </div>
                </section>
            )}

            {/* Main Listing Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-8 mb-16">
                        <div className="flex-shrink-0">
                            <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.4em] italic flex items-center gap-4">
                                {condition === 'new' ? 'EXPLORE ALL MODELS' : 'CERTIFIED USED INVENTORY'}
                                <div className="w-2.5 h-2.5 rounded-full bg-accent-red shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse" />
                            </h2>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-gray-800 to-transparent" />
                    </div>

                    <CarList cars={filteredAndSortedCars} />

                    {filteredAndSortedCars.length === 0 && (
                        <div className="py-20 text-center">
                            <div className="w-20 h-20 bg-brand-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                                <Search size={32} className="text-gray-600" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-2">No matching vehicles</h3>
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Try adjusting your filters or search term</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Sell Car Section - High Contrast */}
            <section className="bg-brand-800 py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SellCarSection />
                </div>
            </section>
        </main>
    );
}
