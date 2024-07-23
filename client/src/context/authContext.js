import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const AuthContext=createContext() //why we are doing this ? bcoz we need our user information in multiple components like navbar , write page and post page
//so we are going to store our information in auth context

export const AuthContextProvider=({children})=>{
    const [currentUser,setcurrentUser] = useState(JSON.parse(localStorage.getItem("user"))|| null)

    const login = async(inputs)=>{
        const res=await axios.post("/auth/login",inputs);
        setcurrentUser(res.data)
   }

   const logout = async()=>{
    await axios.post("/auth/logout");
    setcurrentUser(null);
   }

   useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(currentUser)); 
   },[currentUser])

   return (
    <AuthContext.Provider value={{currentUser, login, logout}}>{children}</AuthContext.Provider>
   )

}