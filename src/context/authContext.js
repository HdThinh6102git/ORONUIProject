import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [currentUser , setCurrentUser] = useState(
            JSON.parse(localStorage.getItem("user") )|| null
    );


    const login = async  (inputs)=>{
        const res = await axios.post("http://localhost:8081/api/v1/auth/authenticate", inputs, {
            withCredentials :true
        } );
        setCurrentUser(res.data);

    //    setCurrentUser({id: 1, 
    //     name: "Dinh Thinh", 
    //     profileImg: 
    //     "https://thumbs.dreamstime.com/z/icon-gentleman-image-presented-51918223.jpg",   })
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
        
    },[currentUser]);   


    return (
        <AuthContext.Provider value = {{currentUser, login }}>
            {children}
        </AuthContext.Provider>
    )
}