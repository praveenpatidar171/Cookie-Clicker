import { useSelector } from "react-redux"
import NavBar from "./NavBar"
import CookieImage from "./CookieImage"
import PlayerStats from "./PlayerStats"

const GamePage = () => {

    const { authUser } = useSelector((store) => store.user)
    return (
        <div >
            <NavBar />
            <div className="hidden md:block">
                <div className="max-w-7xl flex justify-between mx-auto my-20">
                    <CookieImage />
                    <PlayerStats />
                </div>
            </div>
            <div className="md:hidden max-w-7xl flex flex-col gap-10 mx-auto my-20">
                <CookieImage />
                <PlayerStats />
            </div>
        </div>
    )
}

export default GamePage