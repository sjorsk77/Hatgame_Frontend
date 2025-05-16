import React, {useContext} from "react";
import {GameContext} from "../../pages/LobbyPage";

export const PlayerList: React.FC = () => {
    const gameContext = useContext(GameContext);


    return (
        <div className="p-4 bg-gray-700 text-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-2">Players:</h1>
            <ul className="grid grid-cols-3 gap-4">
                {gameContext?.players.map((player) => (
                    <li key={player.id} className="p-2 bg-gray-800 rounded-md">
                        {player.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}