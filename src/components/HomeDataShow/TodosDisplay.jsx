import { useEffect, useState } from "react";
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
import UpdateTodo from "../UpdateTodo/UpdateTodo";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TodosDisplay = () => {

  const { todos, setDataLoad, setTodos, setAuthData, dataLoad } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [todoId, setTodoId] = useState(null);

  // Fetch Data Function 
  const fetchData = async () => {
    const data = JSON.parse(localStorage.getItem("auth"));
    try {
      if (data) {
        const resp = await fetch('https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todos');
        const data = await resp.json();
        setTodos(data);
        setDataLoad(false);
      }
      else {
        setTodos([])
        setAuthData(null);
      }
    } catch (error) {
      console.log(error)
    }
  };

  // fetch side effect 
  useEffect(() => {
    fetchData();
  }, [dataLoad]);

  // Data Delete Id 
  const handleDeleteData = async (id) => {
    console.log("delete")
    try {
      const resp = await fetch(`https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/${id}`, {
        method: "DELETE"
      })
      const data = await resp.json();
      if (data.message) {
        const data = todos.filter((dt) => dt.id !== id);
        setTodos(data);
        setDataLoad(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Task Deleted Successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `${error.message}`,
        text: "Failed to send request. Check your network connection.",
      });
    }
  };

  // update modata id 
  const updateModalOpen = (id) => {
    setTodoId(id);
    handleOpen();
  };

  // modal close func 
  const hadleCloseFunc = () => {
    handleClose();
  };

  const updateCompleteFunc = async speId => {
    // find data 
    const data = todos.find((td) => td.id === speId);
    // Task Completed body 
    const body = {
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      priority: data.priority,
      is_completed: true,
    };
    try {
      const resp = await fetch(
        `https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/${speId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await resp.json();
      if (resp.ok) {

        setDataLoad(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Task Completed Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Something went wrong!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send request. Check your network connection.",
      });
    }
  }

  // Completed task message show 
  const taskCompleteShow = () => {
    Swal.fire({
      icon: "success",
      title: "Sucessfully",
      text: "Task Already Completed.",
      timer: 1500,
      showConfirmButton: false,
    });
  }

  return (
    <>
      {
        todos.length === 0 ? <Typography
          sx={{ fontSize: "30px", textAlign: "center" }}
          variant="h1"
          gutterBottom
        >
          No Task Added ! Please Add an Task &#8594;
        </Typography> : <TableContainer sx={{ marginTop: "60px", border: "1px solid orange", marginBottom: "100px" }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "800", fontSize: "16px" }}>Task No.</TableCell>
                <TableCell align="center" sx={{ fontWeight: "800", fontSize: "16px" }}>Title</TableCell>
                <TableCell align="center" sx={{ fontWeight: "800", fontSize: "16px" }}>Description</TableCell>
                <TableCell align="center" sx={{ fontWeight: "800", fontSize: "16px" }}>Deadline</TableCell>
                <TableCell align="center" sx={{ fontWeight: "800", fontSize: "16px" }}>Priority</TableCell>
                <TableCell align="center" sx={{ fontWeight: "800", fontSize: "16px" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((td, idx) => (
                <TableRow
                  key={td.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                  <TableCell align="center">{idx + 1}</TableCell>
                  <TableCell align="center">{td.title}</TableCell>
                  <TableCell align="center">{td.description}</TableCell>
                  <TableCell align="center">{td.deadline}</TableCell>
                  <TableCell align="center">{td.priority}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleDeleteData(td.id)} sx={{ padding: "5px 10px", marginRight: "5px" }} type="submit" variant="contained">Delete</Button>
                    {
                      td.is_completed === true ? <Button onClick={taskCompleteShow} sx={{ padding: "5px 10px", background: "green" }} type="submit" variant="contained"><CheckCircleIcon /></Button> : <><Button onClick={() => updateModalOpen(td.id)} sx={{ padding: "5px 10px", marginRight: "5px" }} type="submit" variant="contained">Update</Button>
                        <Button onClick={() => updateCompleteFunc(td.id)} sx={{ padding: "5px 10px" }} type="submit" variant="contained">Complete</Button></>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
      <UpdateTodo open={open} todoId={todoId} hadleCloseFunc={hadleCloseFunc} handleClose={handleClose}></UpdateTodo>
    </>
  );
};

export default TodosDisplay;
