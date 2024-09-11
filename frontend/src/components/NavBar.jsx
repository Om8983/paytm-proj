import React from 'react'
import { useNavigate } from 'react-router-dom'
import paytmIcon from "../assets/paytm.svg"
import { Logout } from './Logout'
import { useRecoilValue } from 'recoil'
import { isUserLogged } from '../store/atoms'


export const NavBar = () => {

  const userLogin = useRecoilValue(isUserLogged)
  
  const navigate = useNavigate()
  function handleNav(navroute) {
    navigate(navroute)
  }
  return (
    <>
      <div className=' flex h-[4rem] gap-10    items-center justify-center  pb-1 bg-slate-300  hover:bg-blue-500 '>

        <div className=' w-[60px] h-auto cursor-pointer'> <img src={paytmIcon} alt="paytmIcon" /> </div>

        {/* allow access to Dashboard if the user is login otherwise redirect to login page */}
        <div>
          <button className=' w-[6rem] p-[0.1rem] bg-blue-500 outline outline-none rounded-md text-slate-100 hover:bg-slate-300 hover:text-blue-700 ' onClick={(e) => handleNav(userLogin ? "/dashboard" : "/signin")} >Dashboard</button>
        </div>
        {!userLogin ?
          <>
            <div>
              <button className=' w-[4rem] p-[0.1rem] bg-blue-500 outline outline-none rounded-md text-slate-100 hover:bg-slate-300 hover:text-blue-700  ' onClick={(e) => handleNav("/signup")}>SignUp</button>
            </div>

            <div>
              <button className='w-[4rem] p-[0.1rem] bg-blue-500 outline outline-none rounded-md text-slate-100 hover:bg-slate-300 hover:text-blue-700  ' onClick={(e) => handleNav("/signin")}>SignIn</button>
            </div>
          </>
          :
          <Logout />
        }

      </div>
    </>
  )
}
