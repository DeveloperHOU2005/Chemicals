import React, { useState, useEffect, useRef } from 'react';
import { Info, AlertCircle } from 'lucide-react';

const Tooltip = ({ 
  children, 
  text, 
  position = 'top', 
  variant = 'default', 
  icon = false,
  delay = 300,
  width = 'auto'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const tooltipRef = useRef(null);
  const timerRef = useRef(null);

  // Positions for tooltip placement
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  // Variants for different use cases
  const variants = {
    default: 'bg-gray-800 text-white',
    primary: 'bg-blue-600 text-white',
    warning: 'bg-amber-500 text-white',
    danger: 'bg-red-600 text-white',
    success: 'bg-green-600 text-white',
    info: 'bg-cyan-600 text-white',
    light: 'bg-white text-gray-800 border border-gray-200'
  };

  // Arrow styling based on variant
  const arrowColors = {
    default: 'before:border-t-gray-800',
    primary: 'before:border-t-blue-600',
    warning: 'before:border-t-amber-500',
    danger: 'before:border-t-red-600',
    success: 'before:border-t-green-600',
    info: 'before:border-t-cyan-600',
    light: 'before:border-t-white'
  };

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setIsMounted(true), 10);
    }, delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setIsMounted(false);
    setTimeout(() => setIsVisible(false), 200);
  };
  
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Get appropriate arrow style based on position and variant
  const getArrowStyle = () => {
    if (position === 'top') return arrowColors[variant];
    if (position === 'bottom') return arrowColors[variant].replace('border-t-', 'border-b-');
    if (position === 'left') return arrowColors[variant].replace('border-t-', 'border-l-');
    if (position === 'right') return arrowColors[variant].replace('border-t-', 'border-r-');
    return '';
  };

  // Get appropriate icon for variant if icon is enabled
  const renderIcon = () => {
    if (!icon) return null;
    
    const iconProps = { 
      size: 16,
      className: "mr-1 inline-block flex-shrink-0" 
    };
    
    if (variant === 'warning' || variant === 'danger') {
      return <AlertCircle {...iconProps} />;
    }
    
    return <Info {...iconProps} />;
  };

  return (
    <div className="relative inline-flex">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex items-center cursor-help"
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          style={{ width: width !== 'auto' ? width : 'auto' }}
          className={`
            absolute z-50 
            ${positions[position]}
            px-3 py-2 
            text-sm
            rounded-md
            shadow-lg 
            ${width === 'auto' ? 'whitespace-nowrap' : 'text-left'}
            ${variants[variant]}
            before:content-[''] 
            before:absolute 
            before:border-4 
            before:border-transparent
            ${position === 'top' ? 'before:top-full before:left-1/2 before:-translate-x-1/2' : ''}
            ${position === 'bottom' ? 'before:bottom-full before:left-1/2 before:-translate-x-1/2' : ''}
            ${position === 'left' ? 'before:left-full before:top-1/2 before:-translate-y-1/2' : ''}
            ${position === 'right' ? 'before:right-full before:top-1/2 before:-translate-y-1/2' : ''}
            ${getArrowStyle()}
            transition-opacity duration-200 ease-in-out
            ${isMounted ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="flex items-center">
            {renderIcon()}
            <span>{text}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;