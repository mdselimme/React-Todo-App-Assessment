import { Button, Typography } from "@mui/material";
import { useState } from "react";
import ModalComponent from "../Modal/ModalComponent";
import { Link, useNavigate } from "react-router";
import TodosDisplay from "./TodosDisplay";
import useAuth from "../../AuthProvider/useAuth";

const HomeDataShow = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { authData, authBtnShow } = useAuth();

  // Add To Task Button Function 
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
        {
          authBtnShow ? <Button onClick={handleOpen} variant="contained" size="large">
            Update Profile
          </Button> : ""
        }
      </div>
      <div>
        {authData && <ModalComponent open={open} handleClose={handleClose}></ModalComponent>}
      </div>
      <div>{
        authBtnShow ? <TodosDisplay></TodosDisplay> : <Typography
          sx={{ fontSize: "30px", textAlign: "center" }}
          variant="h1"
          gutterBottom
        >
          You can't see your task ! Please Logged First <Link to={"/login"}>&#8594;</Link>
        </Typography>
      }

      </div>
    </section>
  );
};

export default HomeDataShow;
