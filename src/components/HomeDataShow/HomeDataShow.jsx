import { Button, Typography } from "@mui/material";
import { useState } from "react";
import AddToDoTaskModal from "../addToDoTaskModal/addToDoTaskModal";
import { Link, useNavigate } from "react-router";
import TodosDisplay from "./TodosDisplay";
import useAuth from "../../AuthProvider/useAuth";
import UpdateProfileModal from "./UpdateProfileModal";

const HomeDataShow = () => {
  const navigate = useNavigate();
  const [addUpdatModBtn, setAddUpdatModBtn] = useState(null);
  const [user, setUser] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { authData, authBtnShow } = useAuth();

  // Add To Task Button Function 
  const addTaskHandleButton = () => {
    const data = JSON.parse(localStorage.getItem("auth"));
    if (data) {
      handleOpen();
      setAddUpdatModBtn("addModal")
    } else {
      navigate("/login");
    }
  };

  const updateProfileModalFunc = async () => {
    const resp = await fetch(`https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/profile/${authData?.email}`)
    const result = await resp.json();
    setUser(result);
    handleOpen();
    setAddUpdatModBtn(null);
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
          authBtnShow ? <Button onClick={updateProfileModalFunc} variant="contained" size="large">
            Update Profile
          </Button> : ""
        }
      </div>
      <div>
        {authData && addUpdatModBtn === "addModal" ? <AddToDoTaskModal open={open} handleClose={handleClose}></AddToDoTaskModal> : <UpdateProfileModal user={user} open={open} handleClose={handleClose}></UpdateProfileModal>}
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
