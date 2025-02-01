import {  Button, TextField } from "@mui/material";
import "./Pages.css";
import Swal from "sweetalert2";
import { Link } from "react-router";


const Register = () => {

    const registerAccountFunc = async (e) =>{
        e.preventDefault();
        const form = e.target;
        const displayname = form.displayname.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const username = form.username.value;
        const password = form.password.value;
        const confirmpass = form.confirmpass.value;
        console.log(displayname, email, phone, username, password, confirmpass)
        const body = {
            "name": displayname,
            "email": email,
            "phone": phone,
            "username": username,
            "password": password,
            "profile_picture": ""
        };
        const resp = await fetch("http://3.109.211.104:8001/register",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify(body)
        });
        const data = await resp.json();
        console.log(data)
        if(data.message){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Account Created Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
        e.target.reset();
    }

    return (
        <div style={{marginTop:"4rem"}}>
            <h1 style={{textAlign:"center"}}>Register</h1>
            <div className="auth-main-box">
                <form onSubmit={(e)=>registerAccountFunc(e)} className="input-box">
                    <TextField name="displayname" label="Name" variant="outlined" />
                    <TextField name="email" label="Email" variant="outlined" />
                    <TextField name="phone" label="Phone" variant="outlined" />
                    <TextField name="username" label="Username" variant="outlined" />
                    <TextField name="password" label="Password" variant="outlined" />
                    <TextField name="confirmpass" label="Confirm Password" variant="outlined" />
                    <Button style={{padding:"10px 0"}} type="submit" variant="contained">Create Account</Button>
                </form>
                <p style={{textAlign:"center", marginTop:"10px"}}>Already Have An Account ? Go to <Link to={"/login"}><Button>Log In</Button></Link></p>
            </div>
        </div>
    );
};

export default Register;