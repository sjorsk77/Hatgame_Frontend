import React, { useState } from 'react';
import { api } from '../../Api/ApiWrapper';
import API_CONFIG from "../../Api/ApiConfig";
import {useNavigate} from "react-router-dom";
import {CreateGameRequest} from "../../Types/RequestTypes";
import {CreateJoinGameResponse} from "../../Types/ResponseTypes";
import {TextInput} from "../Inputs/TextInput";

export const CreateGameForm: React.FC = ()=> {
    const [playerName, setPlayerName] = useState('');

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();

        const request: CreateGameRequest = {
            playerName: playerName
        };

        try{
            const response = await api.post(API_CONFIG.erdogan.endpoints.game.createGame, request);
            console.info("Game created successfully:", response.data);
        } catch (err: any) {
            if (err.response) {
                console.error("Error creating game:", err.response.data);
                alert("Error creating game: " + err.response.data);
            } else if (err.request) {
                console.error("No response received:", err.request);
                alert("No response received from the server.");
            } else {
                console.error("Error:", err.message);
                alert("Error: " + err.message);
            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <TextInput label={"Player name"} placeholder={"Hatholder123"} onChange={(e) => setPlayerName(e)}/>

            <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white">
                Create Game
            </button>
        </form>
    );
}