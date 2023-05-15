import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import axios from 'axios';
export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user,setUser] = useState(null);
    useEffect(()=>{
        if(!user)
        {
            const {data} = axios.get(`/Login/Profile`).then(({data})=>{
                setUser(data);
            });
            
        }

    }, [])
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}