/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {


 
  const value = {
    name:"padu"
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
