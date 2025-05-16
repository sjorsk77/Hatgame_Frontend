import { useAuth } from "../Hooks/UseAuth";
import { Navigate } from 'react-router-dom';

export function Admin() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        console.log('Not authenticated');
        return <Navigate to="/auth"/>;
    }

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        const event = new Event('authChange');
        window.dispatchEvent(event);
    };


    return (
        <div>
            admin page
            <button onClick={handleLogout}>Logout</button>
        </div>

    );
}