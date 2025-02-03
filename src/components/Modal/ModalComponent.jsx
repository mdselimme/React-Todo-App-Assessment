import { Box, Button, Modal, TextField } from "@mui/material";
import { bool, func } from "prop-types";
import Swal from "sweetalert2";
import useAuth from "../../AuthProvider/useAuth";
import { useNavigate } from "react-router";
// import Swal from "sweetalert2";

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

  const {fecthDataCalled} = useAuth();
  const navigate = useNavigate();

  const addToDoTaskDataFunc = async (e) => {
    e.preventDefault();
    const form = e.target;
    const id = Date.now();
    const title = form.title.value;
    const description = form.description.value;
    const priority = parseInt(form.priority.value);
    const hours = 3600 * parseInt(form.hours.value);
    const minutes = 60 * parseInt(form.minutes.value);
    const seconds = parseInt(form.seconds.value);
    const deadline = hours + minutes + seconds;
    const body = {
      id,
      title,
      description,
      deadline,
      priority,
    };
    console.log(body);
    const resp = await fetch("http://3.109.211.104:8001/todo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    if (data.created_at) {
      navigate("/");
      fecthDataCalled();
      Swal.fire({
        icon: "success",
        title: "Data Added Successfully",
        showConfirmButton: false,
        timer: 1500,
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
                <TextField
                  required
                  name="priority"
                  label="Task Priority 1 - 5"
                  variant="outlined"
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <TextField
                    required
                    name="hours"
                    label="Hours"
                    defaultValue={"0"}
                    type="number"
                    style={{ width: "180px" }}
                    variant="outlined"
                  />
                  <TextField
                    required
                    name="minutes"
                    label="Minutes"
                    defaultValue={"0"}
                    type="number"
                    style={{ width: "180px" }}
                    variant="outlined"
                  />
                  <TextField
                    required
                    name="seconds"
                    label="Seconds"
                    defaultValue={"0"}
                    type="number"
                    style={{ width: "180px" }}
                    variant="outlined"
                  />
                </div>
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
