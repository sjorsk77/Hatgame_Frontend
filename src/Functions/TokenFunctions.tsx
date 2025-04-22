import {jwtDecode} from "jwt-decode";
import {Token} from "../Types/ObjectTypes";

export const getIsHostFromToken = (token: string) : boolean => {
    try {
        const decoded = jwtDecode<Token>(token);
        console.info(decoded);
        return decoded.typ === 'Host';
    }
    catch (err) {
        console.error('Failed to decode token:', err);
        return false;
    }
}

export const getUserIdFromToken = (token: string) : string => {
    try {
        const decoded = jwtDecode<Token>(token);
        return decoded.sub;
    } catch (err) {
        console.error('Failed to decode token:', err);
        return '';
    }
}