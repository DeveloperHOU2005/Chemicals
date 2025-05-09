import React, { useState, useRef } from 'react';

const InputField = ({
  label,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  readOnly = false,
  error = null,
  helperText = null,
  prefix = null,
  suffix = null,
  required = false,
  maxLength,
  minLength,
  pattern,
  className = '',
  id,
  name,
  autoComplete = 'off',
  autoFocus = false,
  clearable = false,
  showPasswordToggle = false,
  size = 'medium',
  addonBefore,
  addonAfter
}) => {
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const inputRef = useRef(null);

  // Handle input focus
  const handleFocus = (e) => {
    setFocused(true);
    if (onFocus) onFocus(e);
  };

  // Handle input blur
  const handleBlur = (e) => {
    setFocused(false);
    if (onBlur) onBlur(e);
  };

  // Handle input change
  const handleChange = (e) => {
    if (onChange) onChange(e);
  };

  // Clear input value
  const handleClear = () => {
    if (onChange) {
      // Create a synthetic event object to simulate an input change
      const event = {
        target: {
          value: '',
          name: name
        }
      };
      onChange(event);
      // Focus back on the input after clearing
      inputRef.current.focus();
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Determine input type (for password toggle)
  const inputType = type === 'password' && passwordVisible ? 'text' : type;

  // Determine input size classes
  const sizeClasses = {
    small: 'py-1 px-3 text-xs',
    medium: 'py-2 px-3 text-sm',
    large: 'py-3 px-4 text-base'
  };

  const inputSizeClass = sizeClasses[size] || sizeClasses.medium;
  
  // Construct addon classes
  const hasAddon = addonBefore || addonAfter;
  const addonClass = 'inline-flex items-center px-3 bg-gray-100 border border-gray-300 text-gray-600 text-sm';
  const addonBeforeClass = addonBefore ? `${addonClass} rounded-l-md border-r-0` : '';
  const addonAfterClass = addonAfter ? `${addonClass} rounded-r-md border-l-0` : '';
  
  return (
    <div className={`space-y-1 ${className}`}>
      {/* Label */}
      {label && (
        <label 
          className="block text-sm font-medium text-gray-700" 
          htmlFor={id || name}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input group with possible addons */}
      <div className="flex">
        {/* Addon before input */}
        {addonBefore && (
          <span className={addonBeforeClass}>
            {addonBefore}
          </span>
        )}
        
        {/* Input wrapper */}
        <div className={`relative flex-grow ${hasAddon ? '' : 'w-full'}`}>
          <div 
            className={`
              flex items-center w-full border bg-white rounded-md shadow-sm transition-colors duration-150
              ${hasAddon ? (addonBefore ? 'rounded-l-none' : '') + (addonAfter ? ' rounded-r-none' : '') : ''}
              ${focused ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-300'} 
              ${error ? 'border-red-500' : ''}
              ${disabled ? 'bg-gray-100 opacity-60 cursor-not-allowed' : ''}
              ${readOnly ? 'bg-gray-50' : ''}
            `}
          >
            {/* Prefix */}
            {prefix && (
              <div className="flex items-center pl-3 text-gray-500">
                {prefix}
              </div>
            )}
            
            {/* Input field */}
            <input
              ref={inputRef}
              type={inputType}
              className={`
                block w-full focus:outline-none bg-transparent disabled:cursor-not-allowed
                ${inputSizeClass}
                ${prefix ? 'pl-0' : ''}
                ${(suffix || clearable || (type === 'password' && showPasswordToggle)) ? 'pr-0' : ''}
              `}
              id={id || name}
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              maxLength={maxLength}
              minLength={minLength}
              pattern={pattern}
              autoComplete={autoComplete}
              autoFocus={autoFocus}
            />
            
            {/* Clearable button */}
            {clearable && value && !disabled && !readOnly && (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center justify-center w-8 h-full text-gray-400 hover:text-gray-600 focus:outline-none"
                tabIndex="-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            {/* Password toggle */}
            {type === 'password' && showPasswordToggle && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="flex items-center justify-center w-10 h-full text-gray-400 hover:text-gray-600 focus:outline-none"
                tabIndex="-1"
              >
                {passwordVisible ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            )}
            
            {/* Suffix */}
            {suffix && (
              <div className="flex items-center pr-3 text-gray-500">
                {suffix}
              </div>
            )}
          </div>
        </div>
        
        {/* Addon after input */}
        {addonAfter && (
          <span className={addonAfterClass}>
            {addonAfter}
          </span>
        )}
      </div>
      
      {/* Help text */}
      {(helperText && !error) && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
      
      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};
export default InputField;