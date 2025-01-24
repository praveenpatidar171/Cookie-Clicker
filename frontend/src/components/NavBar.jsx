import { setAuthUser } from "@/redux/userSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const NavBar = () => {

    const { authUser } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOutHandler = async () => {
        try {
            const config = {
                withCredentials: true,
            }
            const { data } = await axios.get(`${USER_API_END_POINT}/logout`, config);
            if (data?.success) {
                navigate('/signin');
                toast.success(data?.message);
                dispatch(setAuthUser(null));
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    return <div className="bg-white">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16 my-6">
            <div>
                <h1 className="text-2xl font-bold">Cookie-<span className="text-[#F83002]">Clicker</span></h1>
            </div>
            <div className="flex gap-12 items-center">

                <Popover className='hover:cursor-pointer'>
                    <PopoverTrigger>
                        <div className="flex justify-between items-center">
                            <Avatar className='h-20 w-20'>
                                <AvatarImage src={authUser?.profilePhoto} alt="User Image" />
                                <AvatarFallback>{authUser ? authUser.name?.[0].toUpperCase() : 'User'}</AvatarFallback>
                            </Avatar>
                            <h1 className="font-medium text-lg text-muted-foreground">Hello, {authUser?.name?.[0].toUpperCase() + authUser?.name?.slice(1)}</h1>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                        <div className="flex justify-center items-center ">
                            <div>
                                <LogOut />
                            </div>
                            <Button onClick={logOutHandler} variant="link">Logout</Button>
                        </div>
                    </PopoverContent>
                </Popover>

            </div>
        </div>
    </div>
}

export default NavBar