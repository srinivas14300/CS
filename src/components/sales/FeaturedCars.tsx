import { ShieldCheck, ChevronRight, Verified } from 'lucide-react';
import { mockCars } from '../../data/mockCars';
import { CarCard } from './CarCard';
import { useNavigate } from 'react-router-dom';

export function FeaturedCars() {
    const navigate = useNavigate();
    const certifiedCars = mockCars.filter(car => car.certified);

    return (
        <section className="py-24 bg-brand-900 border-t border-gray-800 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-600/20 mb-4">
                            <ShieldCheck size={12} /> Elite Selection
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter leading-none">
                            CERTIFIED <span className="text-accent-red">LUXURY</span> <br />
                            STRICTLY INSPECTED.
                        </h2>
                    </div>

                    <button
                        onClick={() => navigate('/cars')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-all font-black uppercase tracking-widest text-xs group"
                    >
                        View Full Certified Stock
                        <div className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center group-hover:bg-accent-red group-hover:border-accent-red transition-all group-hover:text-white">
                            <ChevronRight size={16} />
                        </div>
                    </button>
                </div>

                {/* Horizontal Scroll Layout */}
                <div className="relative group">
                    <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
                        {certifiedCars.map(car => (
                            <div key={car.id} className="min-w-[300px] md:min-w-[400px] snap-start">
                                <CarCard car={car} />
                            </div>
                        ))}
                    </div>

                    {/* Gradient Fades for Scroll */}
                    <div className="absolute top-0 right-0 bottom-8 w-20 bg-gradient-to-l from-brand-900 to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 bottom-8 w-12 bg-gradient-to-r from-brand-900 to-transparent pointer-events-none" />
                </div>

                {/* Verification Banner */}
                <div className="mt-12 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-brand-800 to-brand-900 border border-gray-800 relative overflow-hidden group">
                    <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-accent-red/5 blur-[80px] rounded-full group-hover:bg-accent-red/10 transition-colors" />

                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-accent-red shrink-0">
                                <Verified size={40} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white italic tracking-tighter mb-2">PROAUTO VERIFIED STANDARDS</h3>
                                <p className="text-gray-400 max-w-xl font-medium">
                                    Every certified vehicle undergoes a rigorous 200-point inspection covering engine health, transmission, chassis integrity, and comprehensive document verification.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-10">
                            <div className="text-center">
                                <div className="text-3xl font-black text-white italic tracking-tighter">200+</div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Points</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-black text-white italic tracking-tighter">7 DAY</div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Returns</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-black text-white italic tracking-tighter">6 MO.</div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Warranty</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
