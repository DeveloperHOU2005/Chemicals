import React, { useState, useRef, useEffect } from 'react';

const SelectDropdown = ({ 
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  error = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Find the selected option to display
  const selectedOption = options.find(option => option.value === value);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // Handle option selection
  const handleSelect = (option) => {
    onChange(option.value);
    console.log('Selected option:', option.label);
    setIsOpen(false);
  };

  return (
    <div className="space-y-1">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      {/* Dropdown container */}
      <div 
        className="relative"
        ref={dropdownRef}
      >
        {/* Selected value display */}
        <div
          className={`flex items-center justify-between px-3 py-2 border rounded-md shadow-sm transition-colors duration-200 
            ${isOpen ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-300'}
            ${disabled ? 'bg-gray-100 opacity-60 cursor-not-allowed' : 'bg-white cursor-pointer hover:border-indigo-400'}
            ${error ? 'border-red-500' : ''}`}
          onClick={toggleDropdown}
        >
          <span className={`block truncate ${!selectedOption ? 'text-gray-400' : 'text-gray-700'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          
          {/* Dropdown arrow */}
          <span className="pointer-events-none">
            <svg 
              className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180 text-indigo-500' : 'text-gray-400'}`} 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </span>
        </div>
        
        {/* Error message */}
        {error && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
        
        {/* Dropdown menu */}
        {isOpen && !disabled && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
            <ul className="py-1">
              {options.length > 0 ? (
                options.map((option) => (
                  <li
                    key={option.value}
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-indigo-50 transition-colors duration-150
                      ${option.value === value ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-700'}
                      ${option.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50 hover:bg-gray-50' : ''}`}
                    onClick={() => !option.disabled && handleSelect(option)}
                  >
                    {option.label}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-sm text-gray-500">No options available</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default SelectDropdown;