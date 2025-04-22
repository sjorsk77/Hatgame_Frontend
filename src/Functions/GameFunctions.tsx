import {Game} from "../Types/ObjectTypes";
import {getUserIdFromToken} from "./TokenFunctions";

export const isPlayerInGameByToken = (token: string, game: Game)  : boolean => {
    const userId = getUserIdFromToken(token);
    console.info(game.players.some(player => player.id === Number(userId)));
    return game.players.some(player => player.id === Number(userId));
}