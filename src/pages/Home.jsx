import { Typography } from "@mui/material";
import HomeDataShow from "../components/HomeDataShow/HomeDataShow";


const Home = () => {

  return (
    <>
      <Typography
        sx={{ fontSize: "35px", textAlign: "center", fontWeight: "800", marginTop: "25px" }}
        variant="h1"
        gutterBottom
      >
        Welcome to our Todo App! 🚀
      </Typography>
      <HomeDataShow></HomeDataShow>
    </>
  );
};

export default Home;
