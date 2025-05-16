import "./../css/home.css";
import {HomeCard} from "../Components/home/HomeCard";
import {Mobile} from "../Components/home/Mobile";


export const Home: React.FC = () => {
    return (
        <div className="flex flex-col my-10 overflow-x-hidden">
            <Mobile/>
        </div>
    );
}