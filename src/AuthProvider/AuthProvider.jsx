/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

  const [authBtnShow, setAuthBtnShow] = useState(false);
  const [dataLoad, setDataLoad] = useState(false);
  const [authData, setAuthData] = useState(null);
  const [todos, setTodos] = useState([]);
  const [sortTasks, setSortTasks] = useState("default");
  const [sortStatus, setSortStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("auth"));
    if (data) {
      setAuthData(data);
    } else {
      setAuthData(null)
    }
  }, [dataLoad]);

  // Fetch Data Function 
  const fetchData = async () => {
    const ldata = JSON.parse(localStorage.getItem("auth"));
    try {
      if (ldata) {
        const resp = await fetch('https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todos');
        const data = await resp.json();
        const staSortTasks = [...data].filter((task) => {
          if (sortStatus === "completed") return task.is_completed;
          if (sortStatus === "incompleted") return !task.is_completed;
          if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
          }
          return true;
        });
        setTodos(staSortTasks);
        setDataLoad(false);
      }
      else {
        setTodos([]);
        setAuthData(null);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `${error.message}`,
        text: "Failed to send request. Check your network connection.",
      });
    }
  };

  // fetch side effect 
  useEffect(() => {
    fetchData();
  }, [dataLoad, sortStatus, searchQuery]);

  // Sort by Priority Method 
  useEffect(() => {
    const sortedTasks = [...todos].sort((a, b) => {
      if (sortTasks === "ascending") return a.priority - b.priority;
      if (sortTasks === "descending") return b.priority - a.priority;
      return a.id - b.id;
    });
    setTodos(sortedTasks);
  }, [sortTasks]);


  const value = {
    todos, setTodos, setAuthBtnShow, authBtnShow, setSearchQuery, searchQuery, setSortTasks, sortTasks, setDataLoad, authData, setAuthData, dataLoad, sortStatus, setSortStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
