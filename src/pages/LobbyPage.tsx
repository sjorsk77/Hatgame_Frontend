import React, {useEffect, useState, createContext, useContext} from "react";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useParams } from "react-router-dom";
import { Game } from "../Types/ObjectTypes";
import { api } from "../Api/ApiWrapper";
import API_CONFIG from "../Api/ApiConfig";
import {PlayerList} from "../Components/LobbyPage/PlayerList";
import {GameDetails} from "../Components/LobbyPage/GameDetails";
import {getUserIdFromToken} from "../Functions/TokenFunctions";
import {SignalRProvider, useSignalRConnection} from "../SignalRContext";

export const GameContext = createContext<Game | null>(null);

const LobbyPage: React.FC = () => {
    const connection = useSignalRConnection();

    const { gameId } = useParams<{ gameId: string }>();
    const [game, setGame] = useState<Game | null>(null);
    const handleLeave =  () => {
        api.get(`${API_CONFIG.erdogan.endpoints.game.leaveGame}/${gameId}`)
    }

    useEffect(() => {
        if (!gameId) return;

        api.get<Game>(`${API_CONFIG.erdogan.endpoints.game.getGame}/${gameId}`)
            .then((response) => {
                console.info("Game data fetched:", response.data);
                setGame(response.data);
            })
            .catch((err) => console.error("Failed to fetch game:", err));

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            handleLeave();
            event.preventDefault();
            event.returnValue = '';
        }



        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [gameId]);

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="w-full max-w-4xl p-6 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg">
                <GameContext.Provider value={game}>
                    {game ? (
                        <GameDetails/>
                    ) : (
                        <p className="text-center text-xl">Loading game details...</p>
                    )}
                </GameContext.Provider>
            </div>
        </div>
    );
};

export default LobbyPage;