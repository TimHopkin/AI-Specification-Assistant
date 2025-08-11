import React from 'react';
import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'premium';
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
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 relative';
  
  const variantClasses = {
    primary: 'btn-primary focus:ring-blue-500/50',
    secondary: 'btn-secondary focus:ring-gray-300/50',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 focus:ring-blue-500/50',
    ghost: 'btn-ghost focus:ring-gray-300/50',
    premium: 'btn-premium focus:ring-purple-500/50 focus:outline-none',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm h-8',
    md: 'px-4 py-2.5 text-sm h-10',
    lg: 'px-6 py-3 text-base h-12',
  };
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
    (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      
      {isLoading && (
        <Loader2 className="animate-spin mr-2 h-4 w-4" />
      )}
      {children}
    </button>
  );
};