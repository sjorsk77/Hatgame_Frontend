import {InputBox} from "../Components/InputBox";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Game} from "../Types/ObjectTypes";
import API_CONFIG from "../Api/ApiConfig";
import {ButtonWithCondition} from "../Components/ButtonWithCondition";
import {useNavigate} from "react-router-dom";
import {JoinGameRequest} from "../Types/RequestTypes";
import {CreateJoinGameResponse} from "../Types/ResponseTypes";
import {handleInputChange} from "../Functions/InputFunctions";
import {isPlayerInGameByToken} from "../Functions/GameFunctions";

export function Join() {

    const navigate = useNavigate();

    const {gameId} = useParams<{gameId: string}>();
    const [game, setGame] = useState<Game>();
    const [joinRequest, setJoinRequest] = useState<JoinGameRequest>({gameId: Number(gameId), playerName: '', password: ''});
    const [isLoading, setIsLoading] = useState(true);

    const handleUsernameChange = handleInputChange(setJoinRequest, 'playerName');
    const handlePasswordChange = handleInputChange(setJoinRequest, 'password');

    const isValidInput = () => {
        return joinRequest.playerName !== '' && (!game?.password || joinRequest.password !== '');
    }

    useEffect(() => {
        setIsLoading(true);
         fetch(API_CONFIG.erdogan.url + API_CONFIG.erdogan.endpoints.game.getGame + `/${gameId}`)
            .then(response => response.json())
            .then(data => {
                setGame(data);
                if(isPlayerInGameByToken(localStorage.getItem('authToken') || '', data as Game)) {
                    navigate(`/lobby/${gameId}`)}
                setIsLoading(false);})
            .catch(err => console.error('Failed to fetch game'))
             .finally(() => setIsLoading(false));
    }, []);

    const handleJoinGame = () => {
        setIsLoading(true);
        fetch(API_CONFIG.erdogan.url + API_CONFIG.erdogan.endpoints.game.joinGame, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(joinRequest),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json() as Promise<CreateJoinGameResponse>;
            })
            .then(data => {
                localStorage.setItem('authToken', data.token);
                navigate(`/lobby/${data.game.id}`);
                setIsLoading(false);
            })
            .catch(err => console.error('Failed to create game:', err));
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-amber-400'>
            <h1 className='text-4xl font-bold my-5'>Joining game: {game?.name}</h1>
            <div className='bg-amber-100 rounded-2xl p-5 flex flex-col justify-center bg-opacity-70'>
                {isLoading ? (<p>Loading game...</p> )
                    :
                    (<>
                        <InputBox label='Username' placeholder='Enter your username' onChange={handleUsernameChange}/>
                        {game?.password && <InputBox label='Password' placeholder='Enter the game password' onChange={handlePasswordChange}/>}
                        <ButtonWithCondition text='Join Game' onClick={handleJoinGame} condition={isValidInput()} isLoading={isLoading}/>
                    </>)}

            </div>
        </div>
    );
}