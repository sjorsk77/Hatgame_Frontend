import {Role} from "../Enums/Roles";

export type Game = {
    id: number;
    pin: number;
    isLive: boolean;
    hubGroup: string;
    players: Player[];
};

type Player = {
    id: number;
    name: string;
    score: number;
    gameId: number;
    isHost: boolean;
    drinks: Drink[];
};

type Drink = {
    // Define properties for drinks if available
};

export type Token = {
    aud: string,
    exp: number,
    iss: string,
    sub: string,
    typ: Role,
}



