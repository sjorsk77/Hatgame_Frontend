import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {Game} from "../Types/ObjectTypes";
import API_CONFIG from "../Api/ApiConfig";
import {api} from "../Api/ApiWrapper";
import {useSignalRConnection} from "../SignalRContext";

const GameList: React.FC = () => {
    const signalRconnection = useSignalRConnection();

    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (signalRconnection) {
            signalRconnection.on("GameList", (updatedGame: Game[]) => {
                setGames(updatedGame);
            });
        }
    }, [signalRconnection]);

useEffect(() => {
    setIsLoading(true);
    api.get<Game[]>(API_CONFIG.erdogan.endpoints.game.getLiveGames)
        .then(response => {
            setGames(response.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.error('Failed to fetch games:', err);
            setIsLoading(false);
        });
}, []);

    const handleJoinGame = (gameId: number) => {
        navigate(`/join/${gameId}`);
    }

    return (
        <div className='h-full overflow-auto rounded'>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                games.length === 0 ? (
                    <p>No games available</p>
                ) : (
                    <ul className='h-full overflow-y-auto'>
                        {games.map((game) => (
                            <li key={game.id} className='bg-amber-100 rounded-2xl my-2 p-3'
                                onClick={() => handleJoinGame(game.id)}>
                                <h2>{game.name}</h2>
                                <p>Number of players: {game.players.length}</p>
                            </li>
                        ))}
                    </ul>
                )
            )}
        </div>
    )
}

export default GameList;