import React from 'react';
const Checkbox = ({ label, checked = false, onChange, disabled = false }) => {
    const [isChecked, setIsChecked] = React.useState(checked);
    const handleChange = () => {
        if (!disabled) {
            setIsChecked(!isChecked);
        }
    };



    return (
    <div className="flex items-center space-x-3 select-none">
      <div className="relative">
        {/* Hidden native checkbox for accessibility */}
        <input
          type="checkbox"
          className="absolute w-0 h-0 opacity-0"
          checked={checked}
          onChange={()=> handleChange()}
          disabled={disabled}
        />
        
        {/* Custom checkbox */}
        <div 
          className={`w-5 h-5 flex items-center justify-center rounded border transition-all duration-200 cursor-pointer
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${checked 
              ? 'bg-teal-600 border-teal-600' 
              : 'bg-white border-gray-300 hover:border-teal-500'}`}
          onClick={!disabled ? onChange : undefined}
        >
          {/* Checkmark */}
          {checked && (
            <svg 
              className="w-3 h-3 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="3" 
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
      
      {/* Label */}
      <label 
        className={`text-sm font-medium
          ${disabled ? 'text-gray-400' : 'text-gray-700'}
          ${checked ? 'text-teal-700' : ''}`}
        onClick={!disabled ? onChange : undefined}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;