import { motion } from 'framer-motion';
import {
    Car,
    Calendar,
    Gauge,
    User,
    Settings,
    DollarSign,
    Camera,
    ShieldCheck,
    MessageSquare,
    CheckCircle2,
    Info
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/SEO';
import { generateWhatsAppLink } from '../lib/whatsapp';

export default function SellCarPage() {
    const handleSellCarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const details = {
            brand: formData.get('brand'),
            model: formData.get('model'),
            year: formData.get('year'),
            km: formData.get('km'),
            ownership: formData.get('ownership'),
            condition: formData.get('condition'),
            price: formData.get('price'),
            name: formData.get('name'),
            phone: formData.get('phone'),
            location: formData.get('location')
        };

        const message = `*NEW SELL CAR INQUIRY*
---
*Vehicle Details:*
🚗 Brand & Model: ${details.brand} ${details.model}
📅 Reg. Year: ${details.year}
🛣️ KM Driven: ${details.km}
👤 Ownership: ${details.ownership}
✨ Condition: ${details.condition}
💰 Expected Price: ₹${details.price}

*Seller Details:*
👤 Name: ${details.name}
📱 Phone: ${details.phone}
📍 Location: ${details.location}
---
Hi ProAuto, I want to sell my car. Please get back to me with a valuation.`;

        window.open(generateWhatsAppLink(message), '_blank');
    };

    return (
        <div className="bg-brand-900 min-h-screen pt-24 pb-20">
            <SEO
                title="Sell Your Car | Get Instant Valuation | ProAuto"
                description="Sell your car at the best price with ProAuto. Instant valuation, 24-hour payment, and free RC transfer. Submit your car details today."
            />

            {/* Hero Section */}
            <div className="relative overflow-hidden mb-20 text-center px-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-accent-red/10 blur-[120px] rounded-full -z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent-red/10 border border-accent-red/20 text-accent-red text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        Automotive Marketplace
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-[0.9] mb-8 uppercase">
                        Sell Your Car <br />
                        <span className="text-accent-red">In Minutes.</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        Enter your vehicle details below for a professional AI-driven valuation.
                        No brokers. No lowball offers. Just fair market prices.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left: Benefits & Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-brand-800/50 p-8 rounded-[2.5rem] border border-gray-800 backdrop-blur-sm"
                        >
                            <h3 className="text-xl font-black text-white italic uppercase tracking-tight mb-8">Why Sell With ProAuto?</h3>
                            <div className="space-y-6">
                                {[
                                    { icon: <CheckCircle2 className="text-emerald-500" />, title: "Best Market Value", text: "We use live market data to give you the highest possible price." },
                                    { icon: <CheckCircle2 className="text-emerald-500" />, title: "Instant Payment", text: "Funds transferred to your bank account within 24 hours." },
                                    { icon: <CheckCircle2 className="text-emerald-500" />, title: "Hassle-Free RC Transfer", text: "We handle all RTO documentation and legal paperwork." },
                                    { icon: <CheckCircle2 className="text-emerald-500" />, title: "Free Doorstep Inspection", text: "Our engineers visit you for a final physical check." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="mt-1">{item.icon}</div>
                                        <div>
                                            <h4 className="text-white text-sm font-bold uppercase">{item.title}</h4>
                                            <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="bg-accent-red p-8 rounded-[2.5rem] shadow-2xl shadow-accent-red/20 rotate-1">
                            <div className="flex items-center gap-3 mb-4 text-white">
                                <Info size={24} />
                                <h4 className="font-black italic uppercase tracking-tighter">Pro Tip</h4>
                            </div>
                            <p className="text-white/90 text-sm font-bold leading-relaxed">
                                "Keep your service history and original insurance copy ready to get up to 15% better valuation for your vehicle."
                            </p>
                        </div>
                    </div>

                    {/* Right: The Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <form onSubmit={handleSellCarSubmit} className="bg-brand-800 p-8 md:p-12 rounded-[3.5rem] border border-gray-800 shadow-2xl relative overflow-hidden group/form">
                            {/* Form Header */}
                            <div className="mb-12">
                                <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">Sell My Vehicle</h2>
                                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Complete the details below to receive a quote</p>
                                <div className="h-1 w-20 bg-accent-red mt-6 rounded-full" />
                            </div>

                            <div className="space-y-10">
                                {/* Section 1: Vehicle Info */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Car className="text-accent-red" size={20} />
                                        <h3 className="text-lg font-black text-white italic uppercase tracking-tight">1. Vehicle Information</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormGroup label="Brand" icon={<Settings size={18} />}>
                                            <input name="brand" required placeholder="E.g. Audi, Hyundai" className="form-input-glass" />
                                        </FormGroup>
                                        <FormGroup label="Model" icon={<Car size={18} />}>
                                            <input name="model" required placeholder="E.g. Q5, Creta" className="form-input-glass" />
                                        </FormGroup>
                                        <FormGroup label="Registration Year" icon={<Calendar size={18} />}>
                                            <input name="year" type="number" required placeholder="2022" className="form-input-glass" />
                                        </FormGroup>
                                        <FormGroup label="KM Driven" icon={<Gauge size={18} />}>
                                            <input name="km" type="number" required placeholder="15000" className="form-input-glass" />
                                        </FormGroup>
                                        <FormGroup label="Ownership Status" icon={<User size={18} />}>
                                            <select name="ownership" className="form-input-glass appearance-none">
                                                <option value="1st Owner">1st Owner</option>
                                                <option value="2nd Owner">2nd Owner</option>
                                                <option value="3rd Owner">3rd Owner</option>
                                                <option value="Professional / Corporate">Professional / Corporate</option>
                                            </select>
                                        </FormGroup>
                                        <FormGroup label="Overall Condition" icon={<CheckCircle2 size={18} />}>
                                            <select name="condition" className="form-input-glass appearance-none">
                                                <option value="Excellent">Excellent (No scratches)</option>
                                                <option value="Good">Good (Minor wear)</option>
                                                <option value="Fair">Fair (Needs work)</option>
                                            </select>
                                        </FormGroup>
                                    </div>
                                </div>

                                {/* Section 2: Pricing & Location */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="text-accent-red" size={20} />
                                        <h3 className="text-lg font-black text-white italic uppercase tracking-tight">2. Your Expectation</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormGroup label="Expected Price (₹)" icon={<DollarSign size={18} />}>
                                            <input name="price" type="number" required placeholder="7,25,000" className="form-input-glass" />
                                        </FormGroup>
                                        <FormGroup label="Location in Hyderabad" icon={<Settings size={18} />}>
                                            <input name="location" required placeholder="E.g. Madhapur, Jubilee Hills" className="form-input-glass" />
                                        </FormGroup>
                                    </div>
                                </div>

                                {/* Section 3: Contact Info */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <User className="text-accent-red" size={20} />
                                        <h3 className="text-lg font-black text-white italic uppercase tracking-tight">3. Contact Details</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormGroup label="Full Name" icon={<User size={18} />}>
                                            <input name="name" required placeholder="John Doe" className="form-input-glass" />
                                        </FormGroup>
                                        <FormGroup label="WhatsApp Number" icon={<MessageSquare size={18} />}>
                                            <input name="phone" type="tel" required placeholder="+91 98765 43210" className="form-input-glass" />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <Button type="submit" size="lg" className="w-full py-8 text-xl flex justify-center items-center gap-4 bg-white text-brand-900 hover:bg-accent-red hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl">
                                        GET YOUR VALUATION NOW
                                        <ArrowRightIcon className="w-6 h-6" />
                                    </Button>
                                    <div className="mt-6 flex items-center justify-center gap-3 text-gray-500 text-[9px] font-black uppercase tracking-widest bg-brand-900/50 py-3 rounded-2xl border border-gray-700/50">
                                        <ShieldCheck size={14} className="text-accent-red" /> 128-Bit Encryption Secure
                                        <div className="w-1 h-1 rounded-full bg-gray-700" />
                                        No Obligations
                                    </div>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>

            <style>{`
                .form-input-glass {
                    width: 100%;
                    background: rgba(17, 18, 22, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 1.25rem;
                    padding: 1.25rem 1.25rem 1.25rem 3.5rem;
                    color: white;
                    font-size: 0.875rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    outline: none;
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
                }
                .form-input-glass:focus {
                    border-color: #EF4444;
                    background: rgba(17, 18, 22, 0.8);
                    box-shadow: 0 0 20px rgba(239, 68, 68, 0.1), inset 0 2px 4px rgba(0,0,0,0.2);
                }
                .form-input-glass::placeholder {
                    color: #4B5563;
                }
            `}</style>
        </div>
    );
}

function FormGroup({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="relative group/field">
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1 transition-colors group-focus-within/field:text-accent-red">
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-focus-within/field:text-accent-red">
                    {icon}
                </div>
                {children}
            </div>
        </div>
    );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
    );
}
