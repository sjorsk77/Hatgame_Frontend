import React, { useState } from 'react';
import { InputBox } from './InputBox';
import {Game} from '../Types/ObjectTypes';
import { api } from '../Api/ApiWrapper';
import API_CONFIG from "../Api/ApiConfig";
import {useNavigate} from "react-router-dom";
import {CreateGameRequest} from "../Types/RequestTypes";
import {CreateJoinGameResponse} from "../Types/ResponseTypes";

export function CreateGameForm() {

    const navigate = useNavigate();

    const [gameName, setGameName] = useState('');
    const [password, setPassword] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [rules, setRules] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const createGameRequest: CreateGameRequest = {
            gameName,
            playerName,
            password: password || null,
        };

        try {
            const response = await api.post<CreateJoinGameResponse>(API_CONFIG.erdogan.endpoints.game.createGame, createGameRequest);
            localStorage.setItem('authToken', response.data.token);
            navigate(`/lobby/${response.data.game.id}`);
            console.info('Game created:', response.data.game);
        }
        catch (err) {
            console.error('Failed to create game:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputBox label="Game Name" placeholder="Enter game name" onChange={setGameName} />
            <InputBox label="User name" placeholder="Enter a user name" onChange={setPlayerName} />
            <InputBox label="Password(optional)" placeholder="Enter password" onChange={setPassword} />
            <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white">
                Create Game
            </button>
        </form>
    );
}