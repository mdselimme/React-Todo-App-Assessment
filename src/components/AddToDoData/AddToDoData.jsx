import { Button } from "@mui/material";
import ModalComponent from "../Modal/ModalComponent";
import { useState } from "react";


const AddToDoData = () => {
      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
    return (
        <section className="container">
           <div style={{display:"flex", justifyContent:"space-between", marginTop:"100px"}}>
                <Button onClick={handleOpen} variant="contained" size="large">
                Add A Task
                </Button>
                    <Button onClick={handleOpen} variant="contained" size="large">
                Update Profile
                </Button>
           </div> 
           <div>
            <ModalComponent open={open} handleClose={handleClose}></ModalComponent>
           </div>
        </section>
    );
};

export default AddToDoData;