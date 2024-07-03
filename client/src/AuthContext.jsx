import { createContext, useContext, useState,useEffect } from 'react'
import Cookies from 'universal-cookie';

const AuthContext = createContext();

export const useAuth = ()=>{
    return useContext(AuthContext)
}


export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [loggedIn,setLoggedIn] = useState(false);

    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    console.log(token)
    useEffect(() => {
        const checkAuthentication = async () => {
          if (token) {
            try {
              const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/getuser`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              console.log(response)
              const data = await response.json()
              console.log(data)
              if(data.user){
                setUser(data.user);
                setLoggedIn(true);
              }
              
              if(data.doctor){
                setUser(data.doctor);
                setLoggedIn(true);
              }
            //   setLoading(false);
            } catch (error) {
              setLoggedIn(false)
              console.log(error)
              console.log("Authentication Failed");
            //   setLoading(false);
            }
          }
          else {
            setLoggedIn(false)
            // setLoading(false);
          }
        }
    
        checkAuthentication();
      }, [token])


    return(
        <AuthContext.Provider value={{user,loggedIn,setUser,token}}>
            {children}
        </AuthContext.Provider>
    )
}