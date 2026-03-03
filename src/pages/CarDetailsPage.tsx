import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    ChevronLeft,
    Share2,
    MessageSquare,
    Phone,
    Calendar,
    ShieldCheck,
    Gauge,
    Fuel,
    Settings,
    MapPin,
    History,
    FileText,
    Info,
    Wrench,
    CheckCircle2,
    Banknote,
    TrendingUp,
    AlertCircle,
    Download
} from 'lucide-react';
import { CarCard } from '../components/sales/CarCard';
import type { Car } from '../data/mockCars';
import { mockCars } from '../data/mockCars';
import { cloudinaryUrl } from '../lib/cloudinary';
import { SEO } from '../components/SEO';

export default function CarDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [car, setCar] = useState<Car | null>(null);
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'history'>('overview');

    // Image fallback state
    const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
    const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const foundCar = mockCars.find(c => c.id === id);
        if (foundCar) {
            setCar(foundCar);
        } else {
            navigate('/404');
        }
    }, [id, navigate]);

    if (!car) return null;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const whatsappLink = `https://wa.me/919876543210?text=Hi, I'm interested in the ${car.year} ${car.brand} ${car.model} ${car.variant} (${formatPrice(car.price)}) listed on ProAuto. Is it still available?`;

    const similarCars = mockCars
        .filter(c => c.id !== car.id && c.condition === car.condition && (c.brand === car.brand || Math.abs(c.price - car.price) < 1500000))
        .slice(0, 3);

    const priceImpact = car.price < 1500000 ? 'Great Price' : 'Fair Market Price';

    // High quality fallback car images from Unsplash
    const FALLBACK_CARS = [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80', // Porsche/Sport
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80', // Muscle/Coupe
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80', // Generic/Sedan
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80'  // Luxury/Generic
    ];

    const getImageUrl = (index: number, width = 1200) => {
        if (imageError[index]) {
            const brandLower = car.brand.toLowerCase();
            if (brandLower.includes('audi')) return '/images/cars/audi-q5-front.png';
            if (brandLower.includes('bmw')) return '/images/cars/bmw-3series-front.png';
            if (brandLower.includes('mercedes')) return '/images/cars/merc-eclass-front.png';

            const fallbackIdx = (car.id.length + index) % FALLBACK_CARS.length;
            return FALLBACK_CARS[fallbackIdx];
        }
        return cloudinaryUrl(car.images[index], `f_auto,q_auto,w_${width}`);
    };

    return (
        <main className="bg-brand-900 min-h-screen pt-24 pb-32">
            <SEO
                title={`${car.year} ${car.brand} ${car.model} | ProAuto Marketplace`}
                description={`View details for this ${car.certified ? 'certified' : ''} ${car.brand} ${car.model}. ${car.condition === 'used' ? `${car.km} km,` : ''} ${car.fuel}, ${car.transmission}. Contact us for a test drive.`}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs & Actions */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate('/cars')}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors font-black uppercase tracking-widest text-[10px]"
                    >
                        <ChevronLeft size={16} /> Back to Inventory
                    </button>
                    <div className="flex gap-2">
                        <button className="p-3 rounded-xl bg-brand-800 border border-gray-700 text-white hover:border-gray-500 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                            <Share2 size={16} /> Share
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Gallery */}
                    <div className="lg:col-span-8 space-y-4">
                        <div
                            className="aspect-[16/9] rounded-3xl overflow-hidden border border-gray-800 bg-brand-800 relative group/gallery"
                        >
                            {/* Shimmer */}
                            {!imageLoaded[activeImage] && !imageError[activeImage] && (
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 bg-[length:200%_100%] animate-[shimmer_2s_infinite] z-10" />
                            )}
                            <img
                                src={getImageUrl(activeImage)}
                                alt={car.model}
                                className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded[activeImage] ? 'opacity-100 scale-100' : 'opacity-0 scale-110'} group-hover/gallery:scale-105`}
                                onLoad={() => setImageLoaded(prev => ({ ...prev, [activeImage]: true }))}
                                onError={() => {
                                    setImageError(prev => ({ ...prev, [activeImage]: true }));
                                    setImageLoaded(prev => ({ ...prev, [activeImage]: true }));
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                            <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2">
                                <FileText size={14} /> View All {car.images.length} Photos
                            </div>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            {car.images.slice(0, 5).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`aspect-[16/10] rounded-2xl overflow-hidden border-2 transition-all relative ${activeImage === idx ? 'border-accent-red shadow-lg shadow-accent-red/20 scale-95' : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'
                                        }`}
                                >
                                    {!imageLoaded[idx] && !imageError[idx] && (
                                        <div className="absolute inset-0 bg-brand-800 animate-pulse" />
                                    )}
                                    <img
                                        src={getImageUrl(idx, 400)}
                                        alt={`View ${idx + 1}`}
                                        className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded[idx] ? 'opacity-100' : 'opacity-0'}`}
                                        onLoad={() => setImageLoaded(prev => ({ ...prev, [idx]: true }))}
                                        onError={() => {
                                            setImageError(prev => ({ ...prev, [idx]: true }));
                                            setImageLoaded(prev => ({ ...prev, [idx]: true }));
                                        }}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Inspection Report Summary (Phase 4) */}
                        <div className="bg-brand-800 rounded-3xl border border-gray-800 p-8 mt-10">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Inspection <span className="text-accent-red">Report</span></h3>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Last Checked: 2 Days Ago</p>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-red/10 text-accent-red border border-accent-red/20 text-[10px] font-black uppercase tracking-widest hover:bg-accent-red hover:text-white transition-all">
                                    <Download size={14} /> Full PDF
                                </button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <InspectionBox label="Engine" status="Perfect" score={95} />
                                <InspectionBox label="Exterior" status="Clean" score={90} />
                                <InspectionBox label="Interior" status="Mint" score={98} />
                                <InspectionBox label="Electrical" status="Verified" score={100} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Key Info & CTAs */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-brand-800 rounded-3xl border border-gray-800 p-8 sticky top-32 shadow-2xl">
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${car.condition === 'new'
                                        ? 'bg-accent-red text-white border-accent-red'
                                        : 'bg-blue-600 text-white border-blue-600'
                                        }`}>
                                        {car.condition}
                                    </span>
                                    {car.inspectionCertified && (
                                        <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest border border-emerald-600 flex items-center gap-1.5">
                                            <ShieldCheck size={10} strokeWidth={4} /> Certified
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-4xl font-black text-white italic tracking-tighter leading-[0.9] mb-2 uppercase">
                                    {car.year} {car.brand} <br />
                                    <span className="text-accent-red">{car.model}</span>
                                </h1>
                                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">{car.variant} • {car.color}</p>
                            </div>

                            <div className="mb-8 p-6 bg-brand-900/50 rounded-2xl border border-gray-700/50">
                                <div className="flex items-end justify-between mb-4">
                                    <div>
                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Selling Price</p>
                                        <div className="text-4xl font-black text-white italic tracking-tighter">
                                            {formatPrice(car.price)}
                                        </div>
                                    </div>
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center gap-2 text-emerald-500">
                                        <TrendingUp size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{priceImpact}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                                    <Banknote size={14} className="text-accent-red" /> EMI from <span className="text-white">{formatPrice(car.emi)}</span>/mo*
                                </div>

                                {/* Trust Highlights Box */}
                                <div className="space-y-3 pt-6 mt-6 border-t border-gray-700/50">
                                    <TrustLine icon={CheckCircle2} label={car.condition === 'new' ? 'Factory Direct Quality' : '150-Point Inspection Done'} />
                                    <TrustLine icon={CheckCircle2} label="RC Verified & Clean Title" />
                                    <TrustLine icon={AlertCircle} label={`Insurance valid till ${car.insuranceValidTill || 'N/A'}`} />
                                    <TrustLine icon={MapPin} label={`Located at ${car.location}`} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-5 rounded-2xl bg-[#25D366] text-white font-black italic uppercase tracking-tighter flex flex-col items-center justify-center transition-all hover:scale-[1.02] hover:brightness-110 active:scale-95 shadow-xl shadow-[#25D366]/20 group"
                                >
                                    <div className="flex items-center gap-3">
                                        <MessageSquare size={20} className="group-hover:animate-bounce-slow" /> Book Test Drive
                                    </div>
                                    <span className="text-[10px] opacity-80 mt-1 not-italic font-bold uppercase tracking-widest">Instant WhatsApp Enquiry</span>
                                </a>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="py-4 rounded-2xl bg-brand-700 border border-gray-600 text-white font-black italic uppercase tracking-tighter flex items-center justify-center gap-2 transition-all hover:bg-brand-600 active:scale-95 border-b-4 border-b-black/20">
                                        <Phone size={18} /> Call Hub
                                    </button>
                                    <button className="py-4 rounded-2xl bg-white text-brand-900 font-black italic uppercase tracking-tighter flex items-center justify-center gap-2 transition-all hover:bg-gray-100 active:scale-95 border-b-4 border-b-black/20">
                                        <Calendar size={18} /> Financing
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs & Full Specs */}
                <div className="mt-16 bg-brand-800 rounded-3xl border border-gray-800 overflow-hidden">
                    <div className="flex border-b border-gray-700/50 px-4 overflow-x-auto no-scrollbar">
                        {[
                            { id: 'overview', label: 'Overview', icon: Info },
                            { id: 'specs', label: 'Key Specifications', icon: Wrench },
                            { id: 'history', label: 'Certification Detail', icon: History }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-8 py-6 text-sm font-black italic uppercase tracking-tighter transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-accent-red' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-red rounded-t-full shadow-[0_-5px_15px_rgba(230,0,0,0.5)]" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="p-8 md:p-12">
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
                                <SpecItem label="Year" value={car.year} icon={Calendar} />
                                <SpecItem label="Kilometers" value={car.condition === 'new' ? 'Brand New' : `${car.km?.toLocaleString()} km`} icon={Gauge} />
                                <SpecItem label="Fuel Type" value={car.fuel} icon={Fuel} />
                                <SpecItem label="Transmission" value={car.transmission} icon={Settings} />
                                <SpecItem label="Ownership" value={car.condition === 'new' ? '1st' : `${car.ownership} Owner`} icon={Info} />
                                <SpecItem label="Location" value={car.location} icon={MapPin} />
                                <SpecItem label="Insurance" value={car.insuranceValidTill || 'First Party'} icon={ShieldCheck} />
                                <SpecItem label="Color" value={car.color} icon={FileText} />
                            </div>
                        )}

                        {activeTab === 'specs' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
                                <DetailItem label="Engine Model" value={car.specs.engine || 'Standard'} />
                                <DetailItem label="Estimated ARAI Mileage" value={car.specs.mileage || 'Company Specs'} />
                                <DetailItem label="RC Details" value={car.specs.rcDetails} />
                                <DetailItem label="Registration Year" value={car.specs.registrationYear.toString()} />
                                <DetailItem label="Accident History" value={car.specs.accidentHistory} />
                                <DetailItem label="Seating" value="Premium 5 Seater" />
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="max-w-3xl">
                                <h4 className="text-xl font-black text-white italic tracking-tighter uppercase mb-6 flex items-center gap-3">
                                    <ShieldCheck className="text-emerald-500" /> Professional <span className="text-accent-red">Certification</span>
                                </h4>
                                <div className="space-y-6">
                                    <CertificationStep
                                        title="Paperwork Verification"
                                        desc="All documents including RC, Insurance, and Service History have been verified manually at our hub."
                                    />
                                    <CertificationStep
                                        title="Non-Accidental Guarantee"
                                        desc="Body structure checked for major impact and repairs. Frame integrity is strictly verified."
                                        status="Pass"
                                    />
                                    <CertificationStep
                                        title="Flood Damage Check"
                                        desc="Electrical and floor components inspected for signs of water infiltration or corrosion."
                                        status="Pass"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Similar Cars Section */}
            {similarCars.length > 0 && (
                <section className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800 pt-20">
                    <h2 className="text-4xl font-black text-white italic tracking-tighter mb-10 uppercase">
                        Similar <span className="text-accent-red">Recommendations</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {similarCars.map(sc => (
                            <CarCard key={sc.id} car={sc} />
                        ))}
                    </div>
                </section>
            )}

            {/* Mobile Sticky CTA */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-brand-900/95 backdrop-blur-xl border-t border-gray-800 z-[60] animate-in slide-in-from-bottom duration-500 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <div className="flex gap-3">
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-[2] py-4 rounded-xl bg-[#25D366] text-white font-black italic uppercase tracking-tighter flex items-center justify-center gap-3 shadow-xl shadow-[#25D366]/20 active:scale-95 transition-all"
                    >
                        <MessageSquare size={20} /> Enquiry
                    </a>
                    <button className="flex-1 py-4 rounded-xl bg-white text-brand-900 font-black italic uppercase tracking-tighter flex items-center justify-center gap-2 active:scale-95 transition-all">
                        <Phone size={20} /> Hub
                    </button>
                </div>
            </div>
        </main>
    );
}

function SpecItem({ label, value, icon: Icon }: { label: string; value: string | number; icon: any }) {
    return (
        <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-brand-900/40 border border-gray-700/30 hover:border-accent-red/30 transition-colors">
            <div className="flex items-center gap-2 text-gray-500">
                <Icon size={14} className="text-accent-red" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">{label}</span>
            </div>
            <div className="text-white font-black italic uppercase tracking-tight text-sm truncate">{value}</div>
        </div>
    );
}

function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between items-center py-5 border-b border-gray-700/50 group">
            <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest group-hover:text-gray-300 transition-colors">{label}</span>
            <span className="text-white font-black italic uppercase tracking-tighter text-sm">{value}</span>
        </div>
    );
}

function InspectionBox({ label, status, score }: { label: string; status: string; score: number }) {
    return (
        <div className="p-4 rounded-2xl bg-brand-900/50 border border-gray-700/50 text-center">
            <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</div>
            <div className="text-emerald-500 font-black italic uppercase tracking-tighter text-lg">{status}</div>
            <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${score}%` }} />
            </div>
        </div>
    );
}

function TrustLine({ icon: Icon, label }: { icon: any; label: string }) {
    return (
        <div className="flex items-center gap-3 text-[10px] font-black text-gray-300 uppercase tracking-widest">
            <Icon size={14} className="text-emerald-500" />
            {label}
        </div>
    );
}

function CertificationStep({ title, desc, status }: { title: string; desc: string; status?: string }) {
    return (
        <div className="flex gap-4 group">
            <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-brand-700 border-2 border-accent-red flex items-center justify-center text-[10px] text-white font-black">
                    {status === 'Pass' ? '✓' : '1'}
                </div>
                <div className="flex-1 w-[2px] bg-gray-800 my-2" />
            </div>
            <div className="pb-8">
                <h5 className="text-white font-black italic uppercase tracking-tight mb-1 group-hover:text-accent-red transition-colors">{title}</h5>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">{desc}</p>
            </div>
        </div>
    );
}
