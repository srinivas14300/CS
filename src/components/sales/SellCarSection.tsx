import { Link } from 'react-router-dom';
import { Search, Calculator, Calendar, ClipboardCheck, ArrowRight, Zap, ShieldCheck, Banknote, RefreshCcw } from 'lucide-react';

export function SellCarSection() {
    const benefits = [
        { icon: <Zap size={18} />, title: "Sell in 24 Hours", desc: "Fastest checkout process" },
        { icon: <Banknote size={18} />, title: "Instant Payment", desc: "Money in bank immediately" },
        { icon: <RefreshCcw size={18} />, title: "Free RC Transfer", desc: "We handle all legal paperwork" },
        { icon: <ShieldCheck size={18} />, title: "Best Market Price", desc: "Data-driven honest valuation" }
    ];

    return (
        <section className="py-32 bg-brand-800 rounded-[3rem] border border-gray-800 overflow-hidden relative shadow-2xl">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[30%] h-[60%] bg-accent-red/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-8 md:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-900 border border-gray-700 mb-8">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Marketplace Certified</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-white italic tracking-tighter leading-[0.9] mb-8">
                            SELL YOUR CAR <br />
                            <span className="text-accent-red">IN ONE VISIT.</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-10 max-w-lg font-medium">
                            Experience the future of car selling. Get a professional valuation and instant payment within less hours. No hidden charges, no paperwork hassle.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-900 border border-gray-700 flex items-center justify-center text-accent-red group-hover:bg-accent-red group-hover:text-white transition-all duration-300">
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white text-sm font-black italic uppercase tracking-tight">{benefit.title}</h4>
                                        <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/sell"
                            className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-white text-brand-900 font-black italic uppercase tracking-tighter hover:bg-accent-red hover:text-white transition-all transform hover:-translate-y-1 shadow-xl shadow-white/5 active:scale-95"
                        >
                            Get Instant Valuation <ArrowRight size={22} strokeWidth={3} />
                        </Link>
                    </div>

                    {/* Right: Valuation Module */}
                    <Link to="/sell" className="bg-brand-900 p-8 md:p-12 rounded-[2.5rem] border border-gray-700 shadow-2xl relative group/card cursor-pointer block hover:border-accent-red/50 transition-colors">
                        <div className="absolute -top-6 right-10 p-5 rounded-2xl bg-accent-red text-white shadow-2xl shadow-accent-red/40 rotate-3 z-10">
                            <div className="text-[10px] font-black uppercase tracking-widest mb-1">Current Demand</div>
                            <div className="text-2xl font-black italic tracking-tighter leading-none">HIGH</div>
                        </div>

                        <h3 className="text-2xl font-black text-white italic tracking-tighter mb-8 flex items-center gap-3">
                            VALUATION <span className="text-accent-red">WIZARD</span>
                            <div className="h-0.5 flex-1 bg-gray-800" />
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Vehicle Registration Number</label>
                                <div className="relative">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
                                    <div className="w-full bg-brand-800 border border-gray-700 rounded-2xl py-5 pl-14 pr-4 text-gray-500 font-bold">
                                        E.g. TS 09 XX 1234
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Reg. Year</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
                                        <div className="w-full bg-brand-800 border border-gray-700 rounded-2xl py-5 pl-14 pr-4 text-gray-500 font-bold">
                                            2022
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">KM Driven</label>
                                    <div className="relative">
                                        <ClipboardCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
                                        <div className="w-full bg-brand-800 border border-gray-700 rounded-2xl py-5 pl-14 pr-4 text-gray-500 font-bold">
                                            15,000
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full py-6 rounded-2xl bg-accent-red text-white font-black italic uppercase tracking-tighter text-xl shadow-xl shadow-accent-red/20 hover:shadow-accent-red/40 transition-all flex items-center justify-center gap-3">
                                Check Online Price
                            </div>

                            <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-800">
                                <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                                    <ShieldCheck size={14} className="text-emerald-500" /> Certified Safe
                                </div>
                                <div className="w-1 h-1 rounded-full bg-gray-800" />
                                <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                                    <Calculator size={14} className="text-accent-red" /> AI Powered Valuation
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
