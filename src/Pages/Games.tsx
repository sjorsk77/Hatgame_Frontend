import GameList from "../Components/GameList";
import {useNavigate} from "react-router-dom";


export function Games() {
    const navigate = useNavigate();


    return (
        <div className='flex flex-col items-center justify-center max-h-screen min-h-screen bg-amber-400 p-20 gap-y-10'>
            <GameList/>
            <button onClick={() => navigate("/create")}>Create game</button>
        </div>
    );
}