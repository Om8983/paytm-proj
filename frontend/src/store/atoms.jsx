import {atom } from "recoil"

export const isUserLogged = atom({
    key : "userLog",
    default : false
})