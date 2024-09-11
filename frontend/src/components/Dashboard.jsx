import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
  const [balance, setBal] = useState(0);
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([])
  const navigate = useNavigate();
  const USER_JWT_TOKEN = localStorage.getItem("Bearer")

  // send money button functionality 
  function handleSendMoney(id, name) {
    return () => navigate('/transferMoney', {
      state : {
        userId : id,
        firstname : name 
      }
    });
  }

  // getting users current balance 
  useEffect(() => {
    (async () => {
      const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
        headers: { Authorization: `Bearer ${USER_JWT_TOKEN}` }
      })
      if (response.status === 200) {
        setBal(response.data.currentBalance)
      } else if (response.status === 403) {
        setBal(0)
      }
    })();
  }, [balance]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?username=${username}`)
      setUsers(response.data.users)
    })();
  }, [ username])


  return (
    <>
      <div className=''>
        <div className='mb-5'>
          <div className='flex  items-center justify-between pl-4 pr-5 h-[4rem] shadow-md '>
            <h1 className='text-3xl font-bold'>Payments App</h1>
            <div className=' flex gap-3 text-base relative'>
              <div className='font-semibold'>Hello, User</div>
              {/* initial letter of username */}
              <div className=' bg-slate-300 ring-1 ring-slate-800  w-7 h-7 text-center text-lg rounded-full  '> M</div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4 px-4'>
          <div className=' font-bold text-xl'>Your Balance <span className='font-semibold'>${balance}</span> </div>
          <div className=' text-lg font-semibold'>Users</div>
          {/* searchBar with an onchang functionality which sends req to bknd */}
          <div>
            <input type="text" className='ring-2 ring-slate-400 rounded-2xl w-full p-2 ' onChange={(e) => setUsername(e.target.value)} placeholder='Search User' />
          </div>
          {/* list user using map functionality  */}
          {users.length === 0 ?
            <div className='text-base font-medium '>
              No users exist
            </div>
            : users.map((user) => {
              return (
                <>

                  <div className=' flex justify-between  mt-3' key={user._id}>
                    <div className='flex gap-2'>
                      {/* initial letter of username */}
                      <div className=' bg-slate-300 ring-1 ring-slate-800  w-7 h-7 text-center text-lg rounded-full '> {user.firstname[0]} </div>
                      {/* username  */}
                      <div className='text-lg font-semibold'> {user.firstname} {user.lastname} </div>
                    </div>
                    <button className='bg-orange-300 w-[110px] p-1 rounded-lg text-center font-semibold text-orange-800 hover:bg-orange-800 hover:text-orange-300 ' onClick={handleSendMoney(user._id, user.firstname)} > Send Money </button>

                  </div>
                </>
              )
            })}
        </div>
      </div>
    </>
  )
}
