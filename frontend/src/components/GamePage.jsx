import { useSelector } from "react-redux"
import NavBar from "./NavBar"
import CookieImage from "./CookieImage"
import PlayerStats from "./PlayerStats"

const GamePage = () => {

    const { authUser } = useSelector((store) => store.user)
    return (
        <div >
            <NavBar />
            <div className="max-w-7xl justify-between mx-auto my-20 flex">
                <CookieImage />
                <PlayerStats />
            </div>
        </div>
    )
}

export default GamePage