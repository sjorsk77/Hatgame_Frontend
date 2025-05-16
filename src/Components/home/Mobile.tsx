import {JoinGameForm} from "./JoinGameForm";
import {CreateGameForm} from "./CreateGameForm";
import {useState} from "react";

export const Mobile: React.FC = () => {
    const [isCreateGame, setIsCreateGame] = useState(false);

    return (
        <div className={`flex flex-col justify-start`}>
            <div
                className={`flex flex-row transition duration-300 ease-in-out double-screensize ${isCreateGame ? 'move-right' : ""}`}>
                <div className="w-1/2 p-10 h-fit">
                    <JoinGameForm/>

                </div>
                <div className="w-1/2 p-10 h-fit">
                    <CreateGameForm/>
                </div>
            </div>
            <button onClick={() => setIsCreateGame(!isCreateGame)}>
                {isCreateGame ? "Join Game" : "Create Game"}</button>
        </div>
    );
}