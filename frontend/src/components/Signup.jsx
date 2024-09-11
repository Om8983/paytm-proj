import React, { useState } from 'react'
import axios from "axios"
import {useSetRecoilState} from "recoil"
import { useNavigate } from "react-router-dom"
import { isUserLogged } from '../store/atoms';


export const Signup = () => {
  
  
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPass] = useState('');
  const navigate = useNavigate();
  const setUserLogin = useSetRecoilState(isUserLogged)


  // signup handler and after success set the jwt to localstorage
  async function handleSignup() {
    let newUser = {
      email, firstname, lastname, password
    }

    const response = await axios.post("http://localhost:3000/api/v1/user/signup", newUser)
    if (response.status === 200) {
      const { token } = response.data
      localStorage.setItem("Bearer", token);
      setUserLogin(true)
      alert("User SignUp Successfull!!")
      navigate('/dashboard')
      return;
    }
    if (response.status == 411) {
      alert("Email Already exist Please Signin")
      navigate('/signin')
      return;
    } else if (response.status === 403) {
      alert("Invalid Credentials")
      navigate("/signup")
      return;
    }

    return () => navigate('/dashboard')
  }


  // redirectin to signin if already have acc
  function handleSignin() {
    navigate('/signin')
  }


  return (
    <>
      <div className='flex bg-slate-800 py-[4.666rem] h-[100vh - 4rem] justify-center'>
        <div className='flex flex-col bg-slate-600 justify-center items-center gap-4 rounded-3xl w-[500px] h-[400px]  '>
          <input className='text-center p-1 rounded-lg outline-none  ring hover:ring-yellow-400   ' type="text" onChange={(e) => setEmail(e.target.value)} placeholder='Enter e-Mail' />
          <input className='text-center p-1 rounded-lg outline-none  ring hover:ring-yellow-400   ' type="text" onChange={(e) => setFirstname(e.target.value)} placeholder='Firstname' />
          <input className='text-center p-1 rounded-lg outline-none  ring hover:ring-yellow-400   ' type="text" onChange={(e) => setLastname(e.target.value)} placeholder='Lastname' />
          <input className='text-center p-1 rounded-lg outline-none  ring hover:ring-yellow-400   ' type="text" onChange={(e) => setPass(e.target.value)} placeholder='Enter Password' />
          <button className='bg-orange-300 w-20 p-1 rounded-lg text-center font-semibold text-orange-800 hover:bg-orange-800 hover:text-orange-300 ' onClick={handleSignup}> SignUp </button>
          <div className=' text-slate-200 text-sm '> Already have an Account, Please <a className='text-orange-500 hover:text-orange-300 cursor-pointer ' onClick={() => handleSignin()} > SignIn </a> </div>
        </div>
      </div>
    </>
  )
}
