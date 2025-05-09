import React from 'react';
import Radio from './Radio';

const RadioGroup = ({ name, options, selectedValue, onChange, disabled = false }) => {
    const handleChange = (value) => {
      onChange(value);
    };
    console.log('selectedValue', selectedValue)
    return (
      <div className="space-y-2">
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={selectedValue === option.value}
            onChange={() => handleChange(option.value)}
            disabled={disabled || option.disabled}
          />
        ))}
      </div>
    );
  };
export default RadioGroup;  