import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthState {
    isAuthenticated: boolean;
}

export const useAuth = (): AuthState => {
    const [authState, setAuthState] = useState<AuthState>({ isAuthenticated: !!localStorage.getItem('authToken') });
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthChange = () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                setAuthState({ isAuthenticated: true });
            } else {
                setAuthState({ isAuthenticated: false });
                navigate('/auth');
            }
        };

        // Listen for the custom "authChange" event
        window.addEventListener('authChange', handleAuthChange);

        // Initialize state
        handleAuthChange();

        return () => {
            window.removeEventListener('authChange', handleAuthChange);
        };
    }, [navigate]);

    return authState;
};
