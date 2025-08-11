import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'beautiful' | 'floating' | 'glass' | 'gradient' | 'premium';
  hover?: boolean;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  description,
  variant = 'default',
  hover = false,
  style,
}) => {
  const variantClasses = {
    default: 'card-clean',
    elevated: 'card-elevated',
    outlined: 'bg-white rounded-lg p-6 border border-gray-200',
    beautiful: 'card-beautiful-premium',
    floating: 'card-floating', 
    glass: 'card-glass-premium',
    gradient: 'bg-gradient-primary rounded-2xl p-6 border-0 shadow-glow text-white',
    premium: 'card-premium',
  };
  
  const hoverClasses = hover ? 'hover:border-gray-300 cursor-pointer' : '';
  
  return (
    <div className={`${variantClasses[variant]} ${hoverClasses} ${className}`} style={style}>
      {(title || description) && (
        <div className="pb-6 border-b border-gray-200 mb-6">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-gray-600">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};