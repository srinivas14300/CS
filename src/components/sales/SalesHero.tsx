import { ArrowRight, Search, ShieldCheck, Banknote, FileCheck, ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function SalesHero() {
    return (
        <section className="relative pt-32 pb-16 overflow-hidden">
            {/* Elegant Background Mesh */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-brand-900">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent-red/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[0%] right-[-10%] w-[40%] h-[60%] bg-blue-600/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-red"></span>
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">India's Trusted Marketplace</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-6 leading-tight uppercase max-w-4xl mx-auto">
                        Your Journey to the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red via-red-500 to-orange-500">
                            Perfect Drive Starts Here
                        </span>
                    </h1>

                    <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-bold mb-10 leading-relaxed uppercase tracking-wide">
                        Buy, Sell & Explore 50+ Certified Premium Vehicles
                        <span className="text-white block mt-2 font-black italic tracking-tighter">Verified Inspections • Instant Financing • 5-Day Money Back</span>
                    </p>

                    {/* Dominant Search Module */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-6xl mx-auto p-3 bg-brand-800/40 backdrop-blur-[40px] rounded-[2.5rem] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                            <div className="lg:col-span-5 relative group">
                                <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-accent-red group-focus-within:scale-110 transition-transform" size={22} />
                                <input
                                    type="text"
                                    placeholder="Search by Brand, Model or City..."
                                    className="w-full bg-brand-900/60 border border-white/5 focus:border-accent-red/50 rounded-[1.5rem] pl-16 pr-8 py-6 text-sm font-black text-white transition-all outline-none placeholder:text-gray-600 focus:shadow-[0_0_20px_rgba(230,0,0,0.1)]"
                                />
                            </div>
                            <div className="lg:col-span-3">
                                <button className="w-full h-full bg-brand-900/60 border border-white/5 rounded-[1.5rem] px-8 py-6 text-sm font-black text-gray-400 flex items-center justify-between hover:bg-brand-700/50 hover:border-white/10 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <Banknote size={20} className="text-accent-red opacity-80" />
                                        <span className="uppercase tracking-widest text-[11px]">Budget Range</span>
                                    </div>
                                    <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                                </button>
                            </div>
                            <div className="lg:col-span-4">
                                <button className="w-full h-full bg-accent-red hover:bg-white text-white hover:text-accent-red rounded-[1.5rem] px-10 py-6 text-sm font-black italic uppercase tracking-[0.15em] transition-all duration-500 flex items-center justify-center gap-4 shadow-[0_15px_30px_rgba(230,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(230,0,0,0.4)] group overflow-hidden relative">
                                    <span className="relative z-10">Search Inventory</span>
                                    <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto pt-8">
                    <HeroBadge icon={ShieldCheck} title="Elite Quality" subtitle="150+ Point Checklist" />
                    <HeroBadge icon={FileCheck} title="Verified History" subtitle="Clean Document Guarantee" />
                    <HeroBadge icon={Banknote} title="Instant Loan" subtitle="Low Interest Rates" />
                    <HeroBadge icon={CheckCircle2} title="Fixed Price" subtitle="No Hidden Negotiations" />
                </div>
            </div>
        </section>
    );
}

function HeroBadge({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) {
    return (
        <div className="bg-brand-800/20 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] flex flex-col gap-4 group hover:border-white/10 transition-all hover:bg-brand-800/40">
            <div className="w-12 h-12 rounded-2xl bg-brand-900 border border-white/5 flex items-center justify-center text-accent-red group-hover:scale-110 transition-all duration-500 shadow-xl">
                <Icon size={24} />
            </div>
            <div>
                <div className="text-white font-black italic uppercase tracking-tighter text-base mb-1">{title}</div>
                <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-relaxed">{subtitle}</div>
            </div>
        </div>
    );
}
