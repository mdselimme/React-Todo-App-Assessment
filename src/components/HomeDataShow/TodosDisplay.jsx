import { useContext, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from "@mui/material";
import Swal from "sweetalert2";
import useAuth from "../../AuthProvider/useAuth";

const TodosDisplay = () => {

  const {todos, setDataLoad,setTodos,setAuthData,dataLoad} = useAuth();

  const fetchData = async () =>{
    const data = JSON.parse(localStorage.getItem("auth"));
    try{
      if(data){
        const resp = await fetch('https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todos');
        const data = await resp.json();
        setTodos(data);
        setDataLoad(false);
    }
    else{
      setTodos([])
      setAuthData(null);
    }
  }catch(error){
    console.log(error)
  }
}
   useEffect(()=>{
      fetchData();
  },[dataLoad]);

  const handleDeleteData = async (id) =>{
    console.log("delete")
    const resp = await fetch(`https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/${id}`,{
      method:"DELETE"
    })
    const data = await resp.json();
    if(data.message){
      const data = todos.filter((dt)=> dt.id !== id);
      setTodos(data);
      setDataLoad(true);
      Swal.fire({ 
            position: "top-end",
            icon: "success",
            title: "Task Deleted Successfully",
            showConfirmButton: false,
            timer: 1500                                        
        });           
  }};

  return (
    <>
   {
    todos.length === 0 ? <Typography
          sx={{ fontSize: "30px", textAlign: "center" }}
          variant="h1"
          gutterBottom
        >
          No Task Added ! Please Add an Task &#8594;
        </Typography> :  <TableContainer sx={{marginTop:"60px", border:"1px solid orange"}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{fontWeight:"800",fontSize:"16px"}}>Number</TableCell>
            <TableCell align="center" sx={{fontWeight:"800",fontSize:"16px"}}>Title</TableCell>
            <TableCell align="center" sx={{fontWeight:"800",fontSize:"16px"}}>Description</TableCell>
            <TableCell align="center" sx={{fontWeight:"800",fontSize:"16px"}}>Deadline</TableCell>
            <TableCell align="center" sx={{fontWeight:"800",fontSize:"16px"}}>Priority</TableCell>
            <TableCell align="center" sx={{fontWeight:"800",fontSize:"16px"}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((td, idx) => (
            <TableRow
              key={td.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="center">{idx+1}</TableCell>
              <TableCell align="center">{td.title}</TableCell>
              <TableCell align="center">{td.description}</TableCell>
              <TableCell align="center">{td.deadline}</TableCell>
              <TableCell align="center">{td.priority}</TableCell>
              <TableCell align="center">
            <Button onClick={()=>handleDeleteData(td.id)} sx={{padding:"5px 10px", marginRight:"5px"}} type="submit" variant="contained">Delete</Button>
            <Button sx={{padding:"5px 10px"}} type="submit" variant="contained">Update</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   }
    </>
  );
};

export default TodosDisplay;
