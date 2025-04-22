import React, {useState} from "react";

export function InputBox({label, placeholder, onChange}: {label: string; placeholder: string, onChange: (value: string) => void}) {
    const [value, setValue] = useState('');

    const handleChange = (e : any) => {
        setValue(e.target.value);
        onChange(e.target.value);
    }

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold">{label}</label>
            <input
                value={value}
                onChange={handleChange}
                type="text"
                placeholder={placeholder}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
    );
}