import React from 'react'
import { Outlet } from "react-router-dom"
import { NavBar } from './NavBar'
export const Landing = () => {
    return (
        <>
            <div>
                <NavBar></NavBar>
                <Outlet></Outlet>
            </div>
        </>
    )
}
