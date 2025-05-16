import {PlayerList} from "./PlayerList";
import {useContext, useEffect, useState} from "react";
import {GameContext} from "../../pages/LobbyPage";
import {getIsHostFromToken} from "../../Functions/TokenFunctions";

export const GameDetails: React.FC = () => {
    const game = useContext(GameContext);

    const [isHost, setIsHost] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsHost(getIsHostFromToken(token || ''));
    }, []);


    return (
        <div className="p-6 text-white">
            <h1 className="text-3xl font-bold mb-4"></h1>
            <PlayerList />
            {isHost ? (
                <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
                    Start Game
                </button>
            ) : (
                <div className="mt-4 text-yellow-300">Waiting for host to start the game...</div>
            )}
        </div>
    );
}