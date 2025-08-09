import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'glass' | 'gradient' | 'elevated';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  description,
  variant = 'default',
  hover = true,
}) => {
  const variantClasses = {
    default: 'card',
    glass: 'card-glass',
    gradient: 'card-gradient',
    elevated: 'bg-white rounded-2xl shadow-elegant-lg border border-neutral-100',
  };
  
  const hoverClasses = hover ? 'hover:transform hover:scale-[1.01] cursor-pointer' : '';
  
  return (
    <div className={`${variantClasses[variant]} ${hoverClasses} animate-slide-up group ${className}`}>
      {(title || description) && (
        <div className="pb-4 border-b border-white/10 mb-6">
          {title && (
            <h3 className="text-xl font-semibold text-neutral-800 group-hover:text-neutral-900 transition-colors duration-200">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-2 text-sm text-neutral-600 group-hover:text-neutral-700 transition-colors duration-200">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="relative">
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/[0.02] to-secondary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
};