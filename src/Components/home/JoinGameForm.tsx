import {useState} from "react";
import {TextInput} from "../Inputs/TextInput";
import { api } from '../../Api/ApiWrapper';
import API_CONFIG from "../../Api/ApiConfig";
import {JoinGameRequest} from "../../Types/RequestTypes";

export const JoinGameForm: React.FC = () => {
    const [gamePin, setGamePin] = useState("");
    const [playerName, setPlayerName] = useState("");

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();

        const request:JoinGameRequest = {
            gamePin: Number(gamePin),
            playerName: playerName
        };

        try{
            const response = await api.post(API_CONFIG.erdogan.endpoints.game.joinGame, request);
            console.info("Game joined successfully:", response.data);
        } catch (err: any) {
            if (err.response) {
                console.error("Error joining game:", err.response.data);
                alert("Error joining game: " + err.response.data);
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
      <form onSubmit={handleSubmit} className='w-full'>
          <TextInput label={"Game PIN"} placeholder={"123456"} onChange={(e) => setGamePin(e)} regex={/^\d{6}$/}/>
          <TextInput label={"Name"} placeholder={"Hatholder123"} onChange={(e) => setPlayerName(e)} regex={/^[a-zA-Z]{1,20}$/}/>
          <button type="submit">Join Game</button>
      </form>
    );
}