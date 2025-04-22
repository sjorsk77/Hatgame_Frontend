export type AdminCreateRequest = {
    email: string;
    password: string;
}

export type JoinGameRequest = {
    gameId: number;
    playerName: string;
    password?: string | null;
}

export type CreateGameRequest = {
    gameName: string;
    playerName: string;
    password?: string | null;
    // rules?: Rule[];
}