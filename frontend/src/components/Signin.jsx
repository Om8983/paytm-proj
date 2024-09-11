import React, { useState } from 'react'
import axios from "axios"
import {useSetRecoilState} from "recoil"
import { useNavigate } from "react-router-dom"
import { isUserLogged } from '../store/atoms';
export const Signin = () => {

  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const navigate = useNavigate();
  const setUserLogin =  useSetRecoilState(isUserLogged)

  async function handleSignin() {
    const userLogin = { email, password };
    
    const response = await axios.post("http://localhost:3000/api/v1/user/signin", userLogin)
    if (response.status === 200) {
      const { token } = response.data;
      localStorage.setItem("Bearer", token);
      setUserLogin(true)  
      alert("User LogIn Successfull!!!")
      navigate('/dashboard')
      return;
    } else if (response.status === 404) {
      alert("User Not Found, Please SignUp");
      navigate('/signup')
    } else if (403) {
      alert("Invalid Credentials")
      navigate('/signin')
    } else if (404) {
      alert("Incorrect Password")
      navigate('/signin')
    }
  }

  function handleSignup() {
    navigate('/signup')
  }
  return (
    <>
      <div className='flex bg-slate-800 py-[4.666rem] h-[100vh - 4rem] justify-center'>
        <div className='flex flex-col bg-slate-600 justify-center items-center gap-4 rounded-3xl w-[500px] h-[400px]  '>
          <input className='text-center p-1 rounded-lg outline-none  ring hover:ring-yellow-400   ' type="text" onChange={(e) => setEmail(e.target.value)} placeholder='Enter e-Mail' />
          <input className='text-center p-1 rounded-lg outline-none  ring hover:ring-yellow-400   ' type="text" onChange={(e) => setPass(e.target.value)} placeholder='Enter Password' />
          <button className='bg-orange-300 w-20 p-1 rounded-lg text-center font-semibold text-orange-800 hover:bg-orange-800 hover:text-orange-300 ' onClick={handleSignin}> SignIn </button>
          <div className=' text-slate-200 text-sm '> Don't have an Account, Please <a className='text-orange-500 hover:text-orange-300 cursor-pointer ' onClick={() => handleSignup()} > SignUp </a> </div>
        </div>
      </div>
    </>
  )
}
