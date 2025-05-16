export const API_BASE_URL = "http://localhost:5200";
export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;
export const API_ENDPOINTS = {
    GAME: {
        GET_ALL_GAMES: "/game",
        CREATE_GAME: "/game/create",
        UPDATE_SCORE: "/game/update-score",
        JOIN_GAME: "/game/join",
        GET_GAME: "/game",
        GET_LIVE_GAMES: "/game/live",
        LEAVE_GAME: "/game/leave",
    },
    AUTH: {
        LOGIN: "/auth/login",
    },
    ADMIN: {
        CREATE: "/admin/create",
    },
};