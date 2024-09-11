import React from 'react'
import {Routes, Route} from "react-router-dom"
import {Landing} from "./components/Landing"
import {Dashboard} from "./components/Dashboard"
import {Signup} from "./components/Signup"
import {Signin} from "./components/Signin"
import {Transfer} from "./components/Transfer"
export const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Landing/>}>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/signin' element={<Signin/>}></Route>
            <Route path='/transferMoney' element={<Transfer/>}></Route>
        </Route>
    </Routes>
  )
}
