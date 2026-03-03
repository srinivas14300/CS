import { Link } from 'react-router-dom';

interface LogoProps {
    className?: string;
    onClick?: () => void;
}

export function Logo({ className = '', onClick }: LogoProps) {
    return (
        <Link to="/" className={`flex items-center gap-3 group ${className}`} onClick={onClick}>
            <img
                src="/logo-icon.png"
                alt="ProAuto Logo"
                className="w-10 h-10 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-accent-red/20"
            />
            <div className="flex flex-col justify-center">
                <span className="text-2xl font-black tracking-tighter leading-none">
                    <span className="text-white">PRO</span>
                    <span className="text-accent-red">AUTO</span>
                </span>
                <span className="text-[0.65rem] font-semibold text-gray-400 tracking-[0.2em] uppercase mt-1">
                    Car Sales & Services
                </span>
            </div>
        </Link>
    );
}
