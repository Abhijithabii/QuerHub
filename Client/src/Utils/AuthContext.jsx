import React ,{ createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { BACKEND_BASE_URL } from './CommonData';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [user, setUser] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null))
    let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))

    const navigate = useNavigate()
    let loginUser = async (loginData) => {

        await axios
                    .post(`${BACKEND_BASE_URL}/auth/login/`, loginData)
                    .then((res)=>{
                        console.log(res,'----------response');
                        setAuthTokens(res.data.tokens)
                        localStorage.setItem('authTokens', JSON.stringify(res.data.access));
                        setUser(jwtDecode(res.data.access))
                        toast.success("Login succes")
                        navigate('/home')
                        

                    })
                    .catch((error)=>{
                        console.log(error);
                        toast.error("Something Went Wrong Please Try again")
                    })
        
    }

    let logoutUser = (e) => {
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)
        toast.success("logout succesfully")
        navigate('/')
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}