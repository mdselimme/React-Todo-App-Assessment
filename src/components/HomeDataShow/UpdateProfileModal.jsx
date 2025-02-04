import { Box, Button, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuth from '../../AuthProvider/useAuth';
import Swal from 'sweetalert2';


const UpdateProfileModal = ({ open, handleClose, user }) => {

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

    const { authData } = useAuth();

    const updateProfileData = async e => {
        e.preventDefault();

        const name = e.target.name.value;
        const phone = e.target.phone.value;
        const email = e.target.email.value;
        const profile_picture = "";


        const body = {
            name,
            email,
            phone,
            profile_picture
        };

        try {
            const resp = await fetch(`https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/profile/${authData.email}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
            const result = await resp.json();
            if (result.message) {
                handleClose();

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Profile Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                console.error('API Response:', data);
                handleClose();
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.message || "Something went wrong!",
                });
            }
        } catch (err) {
            console.log(err)
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
                        <h1 style={{ textAlign: "center" }}>Update Profile</h1>
                        <div className="auth-main-box">
                            <form
                                onSubmit={(e) => updateProfileData(e)}
                                className="input-box"
                            >
                                <TextField
                                    required
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    defaultValue={user?.name}
                                />
                                <TextField
                                    required
                                    name="phone"
                                    label="Phone"
                                    variant="outlined"
                                    defaultValue={user?.phone}
                                />
                                <TextField
                                    required
                                    name="username"
                                    label="Username"
                                    variant="outlined"
                                    disabled
                                    defaultValue={user?.username}
                                />
                                <TextField
                                    required
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    disabled
                                    defaultValue={user?.email}
                                />

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

export default UpdateProfileModal;