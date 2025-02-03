/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

  const [todos, setTodos] = useState([]);

 const fecthDataCalled = () =>{
  useEffect(()=>{
    const fetchData = async () =>{
    const resp = await fetch('http://3.109.211.104:8001/todos');
    const data = await resp.json();
    setTodos(data)
    console.log(data)
    }
    fetchData()
  },[]);
 }

 fecthDataCalled();
 
  const value = {
    todos,fecthDataCalled
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
