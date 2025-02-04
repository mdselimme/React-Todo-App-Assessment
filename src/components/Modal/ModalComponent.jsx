import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField,  } from "@mui/material";
import { bool, func } from "prop-types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../AuthProvider/useAuth";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useState } from "react";


const ModalComponent = ({ open, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    bgcolor: "background.paper",
    borderRadius: "20px",
    boxShadow: 24,
  };

  const {setDataLoad} = useAuth();
  
  const navigate = useNavigate();

  // Add to Task Data Function 
  const addToDoTaskDataFunc = async (e) => {
  e.preventDefault();
  // find value from input field 
  const form = e.target;
  const title = form.title.value;
  const description = form.description.value;
  const deadlineInput = form.deadline.value;
  const deadline = new Date(deadlineInput).toISOString();
  const priority = form.priority.value; 

  // data object 
  const body = {
    title,
    description,
    deadline,
    priority,
  };

  try {
    const resp = await fetch(
      "https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await resp.json();
    if (resp.ok) {
      navigate("/");
      handleClose();
      setDataLoad(true);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Added Successfully",
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

  e.target.reset();
};

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ marginTop: "4rem" }}>
            <h1 style={{ textAlign: "center" }}>Add Task</h1>
            <div className="auth-main-box">
              <form
                onSubmit={(e) => addToDoTaskDataFunc(e)}
                className="input-box"
              >
                <TextField
                  required
                  name="title"
                  label="Task Title"
                  variant="outlined"
                />
                <TextField
                  required
                  name="description"
                  label="Task Description"
                  variant="outlined"
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Priority"
                        name="priority"
                        defaultValue={1}
                      >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                        <MenuItem value="8">8</MenuItem>
                        <MenuItem value="9">9</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                      </Select>
                    </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker name="deadline" defaultValue={dayjs()} />
                </LocalizationProvider>
                <Button
                  style={{ padding: "10px 0" }}
                  type="submit"
                  variant="contained"
                >
                  Add Task
                </Button>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

ModalComponent.propTypes = {
  open: bool,
  handleClose: func,
};

export default ModalComponent;
