import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil';
import { isUserLogged } from '../store/atoms';

export const Logout = () => {

    const navigate = useNavigate();
    const setUserLogin = useSetRecoilState(isUserLogged)
    function handleLogout(){
        localStorage.clear()
        setUserLogin(false)
        navigate('/signin')
        
    }
  return (
    <div>
        
        <div>
          <button className='w-[4rem] p-[0.1rem] bg-blue-500 outline outline-none rounded-md text-slate-100 hover:bg-slate-300 hover:text-blue-700  'onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}
