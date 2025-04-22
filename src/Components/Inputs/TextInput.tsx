import React, { useState } from 'react';

interface TextInputProps {
    label: string;
    placeholder: string;
    regex?: RegExp;
    onChange: (value: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ label, placeholder, regex, onChange }) => {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (regex) {
            setIsValid(regex.test(newValue));
        }
        onChange(newValue);
    };

    return (
        <div className="mb-6">
            <label
                htmlFor={label.toLowerCase()}
                className="block text-sm font-medium text-gray-900 mb-2"
            >
                {label}
            </label>
            <input
                id={label.toLowerCase()}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    isValid ? 'border-gray-300 focus:ring-blue-500' : 'border-red-500 focus:ring-red-500'
                }`}
            />
            {!isValid && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    <span>Invalid input. Please follow the correct format.</span>
                </div>
            )}
        </div>


    );
};
