/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

  const [authBtnShow, setAuthBtnShow] = useState(false);
  const [dataLoad, setDataLoad] = useState(false);
  const [authData, setAuthData] = useState(null);
  const [todos, setTodos] = useState([]);
  const data = JSON.parse(localStorage.getItem("auth"));
  console.log(data);
  
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("auth"));
    if(data){
      setAuthData(data);
    }else{
      setAuthData(null)
    }
  }, [])

  useEffect(()=>{
    if(data){
    const fetchData = async () =>{
    const resp = await fetch('https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todos');
    const data = await resp.json();
    setTodos(data)
    }
    fetchData();
    }else{
      setTodos([])
    }
  },[dataLoad]);


 
  const value = {
    todos,setTodos,setAuthBtnShow,authBtnShow,setDataLoad,authData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
