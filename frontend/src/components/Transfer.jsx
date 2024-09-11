import React, { useState } from 'react'
import axios from "axios"
import { useLocation } from 'react-router-dom'
export const Transfer = () => {
    const [amount, setAmount] = useState(0)
    const location = useLocation();
    const {userId, firstname } = location.state;
    const USER_JWT_TOKEN = localStorage.getItem("Bearer")
    
    
    async function handleTransfer() {
        const amountToUser = {
            to: userId,
            amount: amount
        }
        const response = await axios.post('http://localhost:3000/api/v1/account/transfer', amountToUser, {
            headers: { Authorization: `Bearer ${USER_JWT_TOKEN}` }
        })
        if (response.status === 200) {
            alert("Transfer Successfull!!")
            return;
        } else if (response.data.msg === 'User has insufficient balance') {
            alert("Insufficient Balance")
            return;
        } else {
            alert("Internal server Error")
        }
    }
    return (
        <>
            <div className='flex bg-slate-800 py-[4.666rem] h-[100vh - 4rem] justify-center '>
                <div className='text-orange-500 font-semibold text-4xl absolute pt-8 '>
                    Send Money
                </div>
                <div className='flex flex-col bg-slate-600 justify-center items-center gap-4 rounded-3xl w-[500px] h-[400px]  '>

                    <div>
                        <div className='flex gap-3 items-center  pr-[4.2rem] mb-[0.1rem]'>
                            <div className=' bg-orange-300 ring-1 ring-slate-800  w-7 h-7 text-center text-lg rounded-full text-orange-900 '> {firstname.split('')[0]} </div>
                            <div className='text-3xl font-semibold text-orange-500'>
                                {firstname}
                            </div>
                        </div>
                        <div className='pr-[3rem] text-sm text-orange-400 '>
                            Amount (in $)
                        </div>
                    </div>
                    <input className='text-center p-1 rounded-lg outline-none  ring hover:ring-yellow-400   ' type="text" onChange={(e) => setAmount(parseInt(e.target.value))} placeholder='Enter Amount' />

                    <button className='bg-orange-300 w-40 p-1 rounded-lg text-center font-semibold text-orange-800 hover:bg-orange-800 hover:text-orange-300 ' onClick={handleTransfer}> Initiate Transfer </button>

                </div>
            </div>
        </>
    )
}
