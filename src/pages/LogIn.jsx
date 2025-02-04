import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../AuthProvider/useAuth";


const LogIn = () => {
    const navigate = useNavigate();
    const { setAuthBtnShow, setDataLoad } = useAuth();

    const logInAccountFunc = async (e) => {
        e.preventDefault();
        // find form all value 
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // Log in information data Body 
        try {
            const body = {
                "email": email,
                "password": password,
            };
            const resp = await fetch("https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await resp.json();
            console.log(data)
            if (data.detail[0].input.email) {
                localStorage.setItem("auth", JSON.stringify({ email: data.detail[0].input.email }));
                navigate("/home");
                setAuthBtnShow(true);
                setDataLoad(true);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logged In Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: `${error.message}`,
                text: "Failed to send request. Check your network connection.",
            });
        }
        e.target.reset();
    }
    return (
        <div style={{ marginTop: "4rem" }}>
            <h1 style={{ textAlign: "center" }}>Log In</h1>
            <div className="auth-main-box">
                <form onSubmit={(e) => logInAccountFunc(e)} className="input-box">

                    <TextField name="email" label="Email" variant="outlined" />


                    <TextField name="password" label="Password" variant="outlined" />

                    <Button style={{ padding: "10px 0" }} type="submit" variant="contained">Log In</Button>
                </form>
                <p style={{ textAlign: "center", marginTop: "10px" }}>No Account ? Go to <Link to={"/register"}><Button>Register</Button></Link></p>
            </div>
        </div>
    );
};

export default LogIn;