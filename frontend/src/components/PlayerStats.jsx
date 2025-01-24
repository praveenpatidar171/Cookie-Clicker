import React from 'react'
import { useSelector } from 'react-redux'

const PlayerStats = () => {
    const { authUser } = useSelector((store) => store.user);
    return (
        <div className='flex flex-col justify-around border border-gray-200 shadow-lg rounded-xl p-8'>
            <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-50 -z-10 '> </div>
                <h1 className='relative text-5xl font-medium'>Keep Clicking, Keep Winning! 🏆</h1>
            </div>
            <div className='flex items-center justify-center h-80'>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-2 text-2xl font-bold'>
                        <h1>Your Score</h1>
                        <h1>{authUser?.totalPoints}</h1>
                    </div>
                    <div className='flex gap-2 text-2xl font-bold'>
                        <h1>Prizes Won</h1>
                        <h1>{authUser?.prizesWon}</h1>
                    </div>
                    <div className='flex gap-2 text-2xl font-bold'>
                        <h1>Total Clicks</h1>
                        <h1>{authUser?.totalClicks}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerStats