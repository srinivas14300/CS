import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900';

    const variants = {
        primary: 'bg-accent-red hover:bg-accent-hover text-white shadow-[0_0_15px_rgba(230,0,0,0.3)] hover:shadow-[0_0_25px_rgba(230,0,0,0.5)]',
        secondary: 'bg-white text-brand-900 hover:bg-gray-100 shadow-md',
        outline: 'border-2 border-accent-red text-accent-red hover:bg-accent-red hover:text-white',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
            {children}
        </button>
    );
}
