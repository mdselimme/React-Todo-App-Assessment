import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useAuth from "../../AuthProvider/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";

const UpdateTodo = ({ open, handleClose, hadleCloseFunc, todoId }) => {

    const { todos, setDataLoad } = useAuth();

    // find specific value by id 
    const idTodo = todos.find((td) => td.id === todoId);

    // modal style 
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

    const updateToDoTaskDataFunc = async (e) => {
        e.preventDefault();

        // find value from input field 
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;

        // Validate and parse deadline
        const deadlineInput = form.deadline.value;
        const deadline = new Date(deadlineInput);
        const priority = form.priority.value;
        const is_completed = false;
        console.log(priority)

        if (isNaN(deadline)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Date",
                text: "The deadline is not a valid date.",
            });
            return;
        }
        const deadlineISO = deadline.toISOString();
        // Create data object
        const body = {
            title,
            description,
            deadline: deadlineISO,
            priority,
            is_completed
        };

        try {
            const resp = await fetch(
                `https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/${todoId}`,
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
                hadleCloseFunc();
                setDataLoad(true);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Data Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                console.error('API Response:', data);
                hadleCloseFunc();
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
                        <h1 style={{ textAlign: "center" }}>Update Task</h1>
                        <div className="auth-main-box">
                            <form
                                onSubmit={(e) => updateToDoTaskDataFunc(e)}
                                className="input-box"
                            >
                                <TextField
                                    required
                                    name="title"
                                    label="Task Title"
                                    variant="outlined"
                                    defaultValue={idTodo?.title}
                                // onChange={(e) => setTitle(e.target.value)} // Update state when typing
                                />
                                <TextField
                                    required
                                    name="description"
                                    label="Task Description"
                                    variant="outlined"
                                    defaultValue={idTodo?.description}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Priority"
                                        name="priority"
                                        defaultValue={idTodo?.priority}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                    </Select>
                                </FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker name="deadline" value={dayjs(idTodo?.deadline)} />
                                </LocalizationProvider>
                                <Button
                                    style={{ padding: "10px 0" }}
                                    type="submit"
                                    variant="contained"
                                >
                                    Update Task
                                </Button>
                            </form>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default UpdateTodo;