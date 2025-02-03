import { Button, Typography } from "@mui/material";
import { useState } from "react";
import ModalComponent from "../Modal/ModalComponent";
import { useNavigate } from "react-router";
import TodosDisplay from "./TodosDisplay";

const HomeDataShow = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addTaskHandleButton = () => {
    const data = JSON.parse(localStorage.getItem("auth"));
    if (data) {
      handleOpen();
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "100px",
        }}
      >
        <Button onClick={addTaskHandleButton} variant="contained" size="large">
          Add A Task
        </Button>
        <Button onClick={handleOpen} variant="contained" size="large">
          Update Profile
        </Button>
      </div>
      <div>
        <ModalComponent open={open} handleClose={handleClose}></ModalComponent>
      </div>
      <div>
      <TodosDisplay></TodosDisplay>
        
      </div>
    </section>
  );
};

export default HomeDataShow;
