import {Game} from "./ObjectTypes";

export type AdminLoginResponse = {
    token: string;
}

export type CreateJoinGameResponse = {
    token: string;
    game: Game;
}