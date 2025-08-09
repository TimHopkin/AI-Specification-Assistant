import React from 'react';
import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group';
  
  const variantClasses = {
    primary: 'btn-primary focus:ring-primary-500/50',
    secondary: 'btn-secondary focus:ring-neutral-300/50',
    outline: 'border border-neutral-200/60 bg-white/60 backdrop-blur-sm hover:bg-white hover:border-neutral-300/60 text-neutral-700 hover:text-neutral-900 focus:ring-primary-500/50 shadow-elegant hover:shadow-elegant-lg',
    ghost: 'btn-ghost focus:ring-neutral-300/50',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm h-9',
    md: 'px-6 py-3 text-sm h-11',
    lg: 'px-8 py-4 text-base h-12',
  };
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
    (disabled || isLoading) && 'opacity-50 cursor-not-allowed transform-none hover:transform-none',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shimmer effect for primary buttons */}
      {variant === 'primary' && !isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      )}
      
      {isLoading && (
        <Loader2 className="animate-spin mr-2 h-4 w-4" />
      )}
      
      <span className="relative z-10">
        {children}
      </span>
    </button>
  );
};