import React, { useState } from 'react'
import cookie from '../assets/cookie.webp'
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/userSlice';


const CookieImage = () => {
    const { authUser } = useSelector((store) => store.user)
    const dispatch = useDispatch();
    const handleClick = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }

            const { data } = await axios.put(`${USER_API_END_POINT}/updateStat`, {}, config);
            if (data?.success) {
                const user = {
                    _id: data?._id,
                    email: data?.email,
                    name: data?.name,
                    totalClicks: data?.totalClicks,
                    totalPoints: data?.totalPoints,
                    profilePhoto: data?.profilePhoto,
                    prizesWon: data?.prizesWon
                }
                if (data?.prizesWon > authUser?.prizesWon) {
                    toast.success('Hurray you won a prize this time !!');
                }
                dispatch(setAuthUser(user));
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }
    return (
        <div className='flex flex-col items-center gap-4 border border-gray-200 shadow-lg rounded-xl p-10'>
            <div className='h-80 w-80'>
                <img onClick={handleClick} className={`cursor-pointer hover:animate-zoom-twice`} src={cookie} alt="cookie-image" />
            </div>
            <h1 className='text-3xl font-medium text-teal-800'>Click on cookie to play</h1>
        </div>
    )
}

export default CookieImage