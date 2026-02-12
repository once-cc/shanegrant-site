import React from 'react';

interface TechCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  status?: 'active' | 'inactive' | 'warning' | 'critical';
  index?: number; // For staggered animation
}

const TechCard: React.FC<TechCardProps> = ({ title, icon, children, className = '', status = 'active', index = 0 }) => {
  const statusColors = {
    active: 'text-army-green border-army-green',
    inactive: 'text-gray-400 border-gray-400',
    warning: 'text-battleship-gray border-battleship-gray',
    critical: 'text-alert-red border-alert-red',
  };

  return (
    <div
      className={`glass-panel relative p-6 transition-all duration-300 hover:shadow-md group ${className}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-border-neutral pb-3">
        <div className="flex items-center space-x-3">
          {icon && <span className="text-charcoal opacity-80">{icon}</span>}
          <h3 className="font-header text-lg font-bold text-charcoal tracking-tight">
            {title}
          </h3>
        </div>
        {/* Status Indicator - Minimal */}
        <div className="flex items-center space-x-2">
          <div className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-army-green' : 'bg-battleship-gray'}`}></div>
        </div>
      </div>

      {/* Content */}
      <div className="font-body text-sm leading-relaxed text-charcoal-light">
        {children}
      </div>
    </div >
  );
};

export default TechCard;
