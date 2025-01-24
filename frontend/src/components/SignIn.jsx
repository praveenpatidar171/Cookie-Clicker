import { setAuthUser } from "@/redux/userSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { authUser } = useSelector((store) => store.user);


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
            const sendData = {
                email, password,
            }
            const { data } = await axios.post(`${USER_API_END_POINT}/login`, sendData, config);
            if (data?.success) {
                navigate('/');
                const user = {
                    _id: data?._id,
                    email: data?.email,
                    name: data?.name,
                    totalClicks: data?.totalClicks,
                    totalPoints: data?.totalPoints,
                    profilePhoto: data?.profilePhoto,
                    prizesWon: data?.prizesWon
                }
                dispatch(setAuthUser(user));
                toast.success(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (authUser) {
            navigate('/');
        }
    }, [authUser, navigate]);
    return <div>
        <div className="flex justify-center items-center h-screen w-screen ">
            <form onSubmit={submitHandler} className="w-[400px] border border-gray-200 rounded-md p-4 my-10">
                <h1 className="font-bold text-xl mb-5"> Sign In</h1>
                <div className="my-2">
                    <Label htmlFor='email'>Email</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='john@example.com' />
                </div>
                <div className="my-2">
                    <Label htmlFor='password'>Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='password' />
                </div>
                {
                    loading ? <Button className='w-full my-4'><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</Button>
                        : <Button type='submit' className='w-full my-4'>SignIn</Button>
                }
                <span className="font-medium text-sm">Don't have an account? <Link to={'/signup'} className="text-blue-600" >SignUp</Link></span>
            </form>
        </div>
    </div>
}
export default SignIn