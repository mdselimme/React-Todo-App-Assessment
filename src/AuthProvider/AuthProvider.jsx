/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

  const [authBtnShow, setAuthBtnShow] = useState(false);
  const [dataLoad, setDataLoad] = useState(false);
  const [authData, setAuthData] = useState(null);
  const [todos, setTodos] = useState([]);
  const data = JSON.parse(localStorage.getItem("auth"));
  
  useEffect(()=>{
    if(data.email){
      console.log("data" , data)
      setAuthData(data);
    }else{
      setAuthData(null)
    }
  }, [dataLoad])

  console.log("authdata ", authData)



 
  const value = {
    todos,setTodos,setAuthBtnShow,authBtnShow,setDataLoad,authData,setAuthData,dataLoad
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
