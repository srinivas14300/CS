import type { Car } from '../../data/mockCars';
import { CarCard } from './CarCard';
import { PackageSearch } from 'lucide-react';

interface CarListProps {
    cars: Car[];
}

export function CarList({ cars }: CarListProps) {
    if (cars.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="w-20 h-20 bg-brand-800 rounded-full flex items-center justify-center mb-6 border border-gray-700">
                    <PackageSearch size={40} className="text-gray-500" />
                </div>
                <h3 className="text-2xl font-black text-white italic mb-2 tracking-tight">NO VEHICLES <span className="text-accent-red">FOUND</span></h3>
                <p className="text-gray-400 max-w-md mx-auto">
                    We couldn't find any cars matching your current filters. Try adjusting your search or resetting the filters.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cars.map((car) => (
                <CarCard key={car.id} car={car} />
            ))}
        </div>
    );
}
