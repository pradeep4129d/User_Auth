import { useContext,createContext,useState } from "react";

const Contextprovider=createContext();

export const Context=({children})=>{
    const [login,setLogin]=useState(false);
    const setlogin=(data)=>{
        setLogin(data);
    }
    return(
        <Contextprovider.Provider value={{login,setlogin}}>
            {children}
        </Contextprovider.Provider>
    )
}
export const useLogin=()=>{
    return useContext(Contextprovider);
}
