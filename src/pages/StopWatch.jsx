import { Button, Box, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";

const StopWatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [btnCng, setBtnCng] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (time) => {
        const milliseconds = String(Math.floor(time % 1000) / 10).padStart(2, "0")
        const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0")
        const minutes = String(Math.floor((time / 60000) % 60)).padStart(2, "0")
        const hours = String(Math.floor(time / 3600000)).padStart(2, "0")
        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            marginTop={"100px"}
        >
            <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "800" }} component="h1">
                Stopwatch
            </Typography>

            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
                <Typography variant="h3" component="div">
                    {formatTime(time)}
                </Typography>
            </Paper>
            <Box mt={4} display="flex" gap={2}>
                {
                    btnCng ? <Button variant="contained" color="success" onClick={() => {
                        setIsRunning(false);
                        setBtnCng(false);
                    }}>
                        Stop
                    </Button> : <Button variant="contained" color="warning" onClick={() => {
                        setIsRunning(true); setBtnCng(true)
                    }}>
                        Start
                    </Button>
                }

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setTime(0);
                        setIsRunning(false);
                        setBtnCng(false);
                    }}
                >
                    Reset
                </Button>
            </Box>
        </Box>
    );
};

export default StopWatch;