import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router";

const NotFound = () => {

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="grey.100">
            <Typography variant="h1" color="textPrimary" fontWeight="bold">
                404
            </Typography>
            <Typography variant="h5" color="textSecondary" mt={2}>
                Page Not Found
            </Typography>
            <Link to={'/'}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Go to Home
                </Button>
            </Link>
        </Box>
    );
};

export default NotFound;
