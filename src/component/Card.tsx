import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`border rounded-xl p-6 shadow-sm bg-background border-sakura text-foreground cursor-pointer hover:shadow-md transition-shadow ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
