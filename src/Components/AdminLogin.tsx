import {TextInput} from "./Inputs/TextInput";
import {useState} from "react";
import API_CONFIG from "../Api/ApiConfig";
import {useNavigate} from "react-router-dom";
import {api} from "../Api/ApiWrapper";
import {AdminCreateRequest} from "../Types/RequestTypes";
import {AdminLoginResponse} from "../Types/ResponseTypes";

export function AdminLogin() {

    const navigate = useNavigate();

    const [adminCreateRequest, setAdminCreateRequest] = useState<AdminCreateRequest>({email: '', password: ''});

    const handleEmailChange = (value: string) => {
        setAdminCreateRequest(prevState => ({
            ...prevState,
            email: value
        }));
    }

    const handlePasswordChange = (value: string) => {
        setAdminCreateRequest(prevState => ({
            ...prevState,
            password: value
        }));
    }

    const handleAdminLogin = async () => {
        try {
            const response = await api.post<AdminLoginResponse>(API_CONFIG.erdogan.endpoints.auth.login, adminCreateRequest);
            console.info('Admin logged in:', response.data);
            localStorage.setItem('authToken', response.data.token);
            console.log(localStorage.getItem('authToken'));
            navigate('/admin');
        } catch (err) {
            console.error('Failed to login:', err);
        }
    }

    return (
        <div>
            <h1>AdminLogin</h1>
            <TextInput label={"email"} placeholder={"email"} onChange={handleEmailChange}/>
            <TextInput label={"password"} placeholder={"password"} onChange={handlePasswordChange}/>
            <button onClick={handleAdminLogin}>Login</button>
        </div>
    );
}