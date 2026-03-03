import { useState } from 'react';

const brands = [
    { name: 'Mercedes-Benz', domain: 'mercedes-benz.com' },
    { name: 'BMW', domain: 'bmw.com' },
    { name: 'Audi', domain: 'audi.com' },
    { name: 'Porsche', domain: 'porsche.com' },
    { name: 'Toyota', domain: 'toyota.com' },
    { name: 'Honda', domain: 'honda.com' },
    { name: 'Ford', domain: 'ford.com' },
    { name: 'Nissan', domain: 'nissanusa.com' },
    { name: 'Hyundai', domain: 'hyundai.com' }
];

function BrandIcon({ brand }: { brand: typeof brands[0] }) {
    const [isError, setIsError] = useState(false);

    return (
        <div className="mx-12 group flex items-center justify-center w-32 h-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 transform hover:scale-110 cursor-pointer">
            {!isError ? (
                <img
                    src={`https://logo.clearbit.com/${brand.domain}?size=100`}
                    alt={brand.name}
                    width={100}
                    height={48}
                    loading="lazy"
                    className="max-h-12 max-w-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    onError={() => setIsError(true)}
                />
            ) : (
                <span className="text-xl font-black text-gray-500 group-hover:text-white transition-colors italic tracking-tighter uppercase">
                    {brand.name}
                </span>
            )}
        </div>
    );
}

export function BrandsMarquee() {
    return (
        <section className="py-12 bg-black border-y border-gray-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center flex flex-col items-center">
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-red opacity-60"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-red opacity-80"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-red"></span>
                </div>
                <p className="text-gray-400 text-sm md:text-base font-semibold uppercase tracking-[0.2em] relative inline-block">
                    <span className="absolute -left-12 top-1/2 w-8 h-px bg-gray-700"></span>
                    Factory Certified Specialists
                    <span className="absolute -right-12 top-1/2 w-8 h-px bg-gray-700"></span>
                </p>
            </div>

            <div className="relative flex overflow-x-hidden">
                <div className="animate-marquee whitespace-nowrap flex items-center">
                    {[...brands, ...brands].map((brand, index) => (
                        <BrandIcon key={`b1-${index}`} brand={brand} />
                    ))}
                </div>

                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center">
                    {[...brands, ...brands].map((brand, index) => (
                        <BrandIcon key={`b2-${index}`} brand={brand} />
                    ))}
                </div>
            </div>
        </section>
    );
}
