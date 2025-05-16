import {Game} from "./ObjectTypes";

export type AdminLoginResponse = {
    token: string;
}

export type CreateJoinGameResponse = {
    game: Game;
    token: string;
}