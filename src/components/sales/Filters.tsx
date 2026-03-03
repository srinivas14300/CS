import { useState } from 'react';
import { Search, SlidersHorizontal, X, Check, ArrowUpDown, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface FiltersProps {
    onFilterChange: (filters: FilterState) => void;
    onSortChange: (sort: SortOption) => void;
    brands: string[];
    activeFilters: FilterState;
    resultsCount: number;
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'km-low';

export interface FilterState {
    search: string;
    selectedBrands: string[];
    priceRange: [number, number];
    yearRange: [number, number];
    fuelTypes: string[];
    transmissions: string[];
}

const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'CNG', 'Hybrid'];
const TRANSMISSIONS = ['Manual', 'Automatic'];

export function Filters({ onFilterChange, onSortChange, brands, activeFilters, resultsCount }: FiltersProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [currentSort, setCurrentSort] = useState<SortOption>('newest');

    const toggleBrand = (brand: string) => {
        onFilterChange({
            ...activeFilters,
            selectedBrands: activeFilters.selectedBrands.includes(brand)
                ? activeFilters.selectedBrands.filter(b => b !== brand)
                : [...activeFilters.selectedBrands, brand]
        });
    };

    const toggleFuel = (type: string) => {
        onFilterChange({
            ...activeFilters,
            fuelTypes: activeFilters.fuelTypes.includes(type)
                ? activeFilters.fuelTypes.filter(t => t !== type)
                : [...activeFilters.fuelTypes, type]
        });
    };

    const toggleTransmission = (type: string) => {
        onFilterChange({
            ...activeFilters,
            transmissions: activeFilters.transmissions.includes(type)
                ? activeFilters.transmissions.filter(t => t !== type)
                : [...activeFilters.transmissions, type]
        });
    };

    const resetFilters = () => {
        onFilterChange({
            search: '',
            selectedBrands: [],
            priceRange: [0, 10000000],
            yearRange: [2015, 2025],
            fuelTypes: [],
            transmissions: [],
        });
    };

    const formatPrice = (price: number) => {
        if (price >= 10000000) return 'Any';
        if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
        return `₹${(price / 1000).toFixed(0)}K`;
    };

    return (
        <div className="sticky top-[72px] z-30 bg-brand-900/60 backdrop-blur-[40px] border-b border-white/5 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                    {/* Simplified Search anchored to Filters */}
                    <div className="relative w-full lg:w-[400px] group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-accent-red opacity-80" size={18} />
                        <input
                            type="text"
                            placeholder="Quick search model or brand..."
                            className="w-full bg-brand-800/40 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-accent-red/50 transition-all text-white placeholder:text-gray-600 shadow-xl"
                            value={activeFilters.search}
                            onChange={(e) => onFilterChange({ ...activeFilters, search: e.target.value })}
                        />
                    </div>

                    {/* Unified Actions Bar */}
                    <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-center lg:justify-end">
                        <div className="flex items-center gap-3 px-5 py-4 bg-brand-800/20 border border-white/5 rounded-2xl">
                            <span className="text-accent-red text-xs font-black italic">{resultsCount}</span>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Vehicles Found</span>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative group">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center gap-3 bg-brand-800/40 border border-white/5 hover:border-white/10 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all min-w-[200px] justify-between shadow-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <ArrowUpDown size={16} className="text-accent-red opacity-80" />
                                    <span>
                                        {currentSort === 'newest' && 'Newest First'}
                                        {currentSort === 'price-low' && 'Price: Low → High'}
                                        {currentSort === 'price-high' && 'Price: High → Low'}
                                        {currentSort === 'km-low' && 'KM: Low → High'}
                                    </span>
                                </div>
                                <ChevronDown size={14} className={`transition-transform duration-500 ${isSortOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isSortOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="absolute top-full right-0 mt-3 w-full bg-brand-800/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] z-50 py-3 overflow-hidden"
                                    >
                                        {[
                                            { id: 'newest', label: 'Newest First' },
                                            { id: 'price-low', label: 'Price: Low → High' },
                                            { id: 'price-high', label: 'Price: High → Low' },
                                            { id: 'km-low', label: 'KM: Low → High' }
                                        ].map(opt => (
                                            <button
                                                key={opt.id}
                                                onClick={() => {
                                                    setCurrentSort(opt.id as SortOption);
                                                    onSortChange(opt.id as SortOption);
                                                    setIsSortOpen(false);
                                                }}
                                                className={`w-full text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all hover:bg-white/5 ${currentSort === opt.id ? 'text-accent-red' : 'text-gray-400'}`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </div>

                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="flex items-center justify-center gap-3 bg-accent-red hover:bg-white text-white hover:text-accent-red px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all transform active:scale-95 shadow-xl shadow-accent-red/20 border-2 border-transparent hover:border-accent-red"
                        >
                            <SlidersHorizontal size={18} />
                            Detailed Filters
                            {(activeFilters.selectedBrands.length + activeFilters.fuelTypes.length + activeFilters.transmissions.length) > 0 && (
                                <span className="bg-white group-hover:bg-accent-red text-accent-red group-hover:text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center transition-colors">
                                    {activeFilters.selectedBrands.length + activeFilters.fuelTypes.length + activeFilters.transmissions.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Active Filter Chips */}
                {(activeFilters.selectedBrands.length > 0 || activeFilters.fuelTypes.length > 0 || activeFilters.transmissions.length > 0) && (
                    <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-white/5">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mr-2">Refining by:</span>
                        {activeFilters.selectedBrands.map(brand => (
                            <FilterChip key={brand} label={brand} onRemove={() => toggleBrand(brand)} />
                        ))}
                        {activeFilters.fuelTypes.map(fuel => (
                            <FilterChip key={fuel} label={fuel} onRemove={() => toggleFuel(fuel)} />
                        ))}
                        {activeFilters.transmissions.map(trans => (
                            <FilterChip key={trans} label={trans} onRemove={() => toggleTransmission(trans)} />
                        ))}
                        <button
                            onClick={resetFilters}
                            className="text-[10px] font-black text-accent-red hover:text-white transition-colors uppercase tracking-[0.2em] ml-4 italic underline decoration-accent-red/30 underline-offset-4"
                        >
                            Reset All
                        </button>
                    </div>
                )}
            </div>

            {/* Slide Drawer (Full Filter) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
                    <div className="relative w-full max-w-md bg-brand-900 h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-gray-800">
                        <div className="p-6 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-brand-900 z-10">
                            <div>
                                <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">Refine <span className="text-accent-red">Selection</span></h2>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{resultsCount} vehicles match</p>
                            </div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors border border-gray-800"><X size={20} className="text-gray-400" /></button>
                        </div>

                        <div className="p-6 space-y-10 pb-32">
                            {/* Budget Slider */}
                            <div>
                                <div className="flex justify-between items-end mb-6">
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Budget Range</h3>
                                    <div className="text-sm font-black text-white italic">
                                        {formatPrice(activeFilters.priceRange[0])} — {formatPrice(activeFilters.priceRange[1])}
                                    </div>
                                </div>
                                <div className="px-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="10000000"
                                        step="100000"
                                        value={activeFilters.priceRange[1]}
                                        onChange={(e) => onFilterChange({ ...activeFilters, priceRange: [0, parseInt(e.target.value)] })}
                                        className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-accent-red"
                                    />
                                    <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                        <span>₹0</span>
                                        <span>₹1 Cr+</span>
                                    </div>
                                </div>
                            </div>

                            {/* Year Range */}
                            <div>
                                <div className="flex justify-between items-end mb-6">
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Model Year</h3>
                                    <div className="text-sm font-black text-white italic">
                                        {activeFilters.yearRange[0]} — {activeFilters.yearRange[1]}
                                    </div>
                                </div>
                                <div className="px-2">
                                    <input
                                        type="range"
                                        min="2015"
                                        max="2025"
                                        step="1"
                                        value={activeFilters.yearRange[0]}
                                        onChange={(e) => onFilterChange({ ...activeFilters, yearRange: [parseInt(e.target.value), 2025] })}
                                        className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-accent-red"
                                    />
                                    <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                        <span>2015</span>
                                        <span>2025</span>
                                    </div>
                                </div>
                            </div>

                            {/* Brand Filter */}
                            <div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Preferred Brands</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {brands.map(brand => (
                                        <button
                                            key={brand}
                                            onClick={() => toggleBrand(brand)}
                                            className={`flex items-center justify-between px-4 py-3 rounded-xl border text-xs font-bold transition-all ${activeFilters.selectedBrands.includes(brand)
                                                ? 'bg-accent-red border-accent-red text-white shadow-lg shadow-accent-red/20'
                                                : 'bg-brand-800 border-gray-700 text-gray-400 hover:border-gray-500'
                                                }`}
                                        >
                                            {brand}
                                            {activeFilters.selectedBrands.includes(brand) && <Check size={14} strokeWidth={3} />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Fuel Type */}
                            <div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Fuel Type</h3>
                                <div className="flex flex-wrap gap-2">
                                    {FUEL_TYPES.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => toggleFuel(type)}
                                            className={`px-5 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${activeFilters.fuelTypes.includes(type)
                                                ? 'bg-accent-red border-accent-red text-white'
                                                : 'bg-brand-800 border-gray-700 text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Transmission */}
                            <div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Transmission</h3>
                                <div className="flex flex-wrap gap-2">
                                    {TRANSMISSIONS.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => toggleTransmission(type)}
                                            className={`px-5 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${activeFilters.transmissions.includes(type)
                                                ? 'bg-accent-red border-accent-red text-white'
                                                : 'bg-brand-800 border-gray-700 text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-brand-900/90 backdrop-blur-md border-t border-gray-800 flex gap-4 z-20">
                            <button
                                onClick={resetFilters}
                                className="flex-1 px-6 py-4 rounded-2xl bg-brand-800 text-white text-xs font-black uppercase tracking-widest hover:bg-brand-700 transition-all border border-gray-700"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex-[2] px-6 py-4 rounded-2xl bg-accent-red text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-accent-red/20 transform hover:-translate-y-0.5 transition-all"
                            >
                                Show {resultsCount} Cars
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-800 border border-gray-700 text-[10px] font-bold text-white uppercase tracking-wider animate-in fade-in slide-in-from-left-2">
            {label}
            <button onClick={onRemove} className="hover:text-accent-red transition-colors">
                <X size={12} />
            </button>
        </div>
    );
}
