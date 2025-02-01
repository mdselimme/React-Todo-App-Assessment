import { Button, TextField } from "@mui/material";
import { Link } from "react-router";
import Swal from "sweetalert2";


const LogIn = () => {
    const logInAccountFunc = async (e) =>{
            e.preventDefault();
            const form = e.target;
            
            const email = form.email.value;
           
          
            const password = form.password.value;
         
            console.log( email, password)
            const body = {
               
                "email": email,
            
                "password": password,
               
            };
            const resp = await fetch("http://3.109.211.104:8001/login",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await resp.json();
            console.log(data)
            if(data.detail[0].input.email){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logged In Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            e.target.reset();
        }
    return (
       <div style={{marginTop:"4rem"}}>
            <h1 style={{textAlign:"center"}}>Log In</h1>
            <div className="auth-main-box">
                <form onSubmit={(e)=>logInAccountFunc(e)} className="input-box">
                    
                    <TextField name="email" label="Email" variant="outlined" />
                    
                    
                    <TextField name="password" label="Password" variant="outlined" />
                   
                    <Button style={{padding:"10px 0"}} type="submit" variant="contained">Log In</Button>
                </form>
                <p style={{textAlign:"center", marginTop:"10px"}}>No Account ? Go to <Link to={"/register"}><Button>Register</Button></Link></p>
            </div>
        </div>
    );
};

export default LogIn;