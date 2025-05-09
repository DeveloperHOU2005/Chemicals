import React from 'react';

const Radio = ({ label, name, value, checked = true, onChange, disabled = false }) => {
    return (
        <label className="inline-flex items-center cursor-pointer mx-2">
            <div className="relative">
                <input
                    type="radio"
                    className="sr-only peer"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                />
                <div className="w-5 h-5 border-2 rounded-full border-gray-300 peer-checked:bg-teal-500 
                                            peer-disabled:border-gray-200 peer-disabled:bg-gray-100">
                    <div className="absolute hidden w-3 h-3 transform -translate-x-1/2 -translate-y-1/2 
                                                bg-teal-500 rounded-full top-1/2 left-1/2 peer-checked:block 
                                                peer-disabled:bg-gray-400 z-40"></div>
                </div>
            </div>
            {label && (
                <span className={`ml-2 text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
                    {label}
                </span>
            )}
        </label>
    );
};

export default Radio;