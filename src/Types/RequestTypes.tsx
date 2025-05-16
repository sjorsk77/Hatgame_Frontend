export type AdminCreateRequest = {
    email: string;
    password: string;
}

export type JoinGameRequest = {
    gamePin: number;
    playerName: string;
}

export type CreateGameRequest = {
    playerName: string;
}