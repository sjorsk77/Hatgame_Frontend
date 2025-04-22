import React from 'react';

interface ButtonWithConditionProps {
    condition: boolean;
    onClick: () => void;
    isLoading: boolean;
    text: string;
}

export const ButtonWithCondition: React.FC<ButtonWithConditionProps> = ({ condition, onClick, isLoading, text }) => {
    return (
        <button
            onClick={onClick}
            disabled={!condition}
            className={`px-4 py-2 rounded ${condition ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-300'} ${isLoading ? 'cursor-not-allowed' : ''}`}
        >
            {isLoading ? 'Joining...' : text}
        </button>
    );
};