import {Role} from "../Enums/Roles";

export type Game = {
    id: number;
    name: string;
    password: string;
    isLive: boolean;
    rules: Rule[];
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



type Rule = {
    id: number;
    ruleName: string;
    description: string;
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



