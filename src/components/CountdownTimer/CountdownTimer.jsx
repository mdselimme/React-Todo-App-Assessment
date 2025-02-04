import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const CountdownTimer = ({ deadline }) => {

    const targetDate = dayjs(deadline);

    // Calcaulate How much time left 
    const calculateTimeLeft = () => {
        const now = dayjs();
        const diff = targetDate.diff(now, "milliseconds");
        return diff > 0 ? diff : 0; // Prevent negative values after countdown ends
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isRunning, setIsRunning] = useState(false); // Controls the timer

    // Update every millisecond - Stop updating when paused and
    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1); // 

        return () => clearInterval(interval); // Cleanup on unmount
    }, [isRunning]);

    const handleStart = () => setIsRunning(true);
    const handleStop = () => setIsRunning(false);

    // Convert Time moment 
    const milliseconds = String(Math.floor(timeLeft % 1000)).padStart(2, "0")
    const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0")
    const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, "0");
    const hours = String(Math.floor((timeLeft / (1000 * 60 * 60)) % 24)).padStart(2, "0");
    const days = String(Math.floor(timeLeft / (1000 * 60 * 60 * 24))).padStart(2, "0");;

    return (
        <Box style={{ textAlign: "center", fontWeight: "600" }}>
            <Typography fontSize={"14px"}>{days}d {hours}h {minutes}m {seconds}s {milliseconds}ms</Typography>
            <Button onClick={handleStart} sx={{ marginRight: "10px", padding: "5px 8px", fontSize: "10px" }} variant="contained"
                color="primary">
                Start
            </Button>
            <Button onClick={handleStop} sx={{ padding: "5px 8px", fontSize: "10px" }} variant="contained" color="warning">
                Stop
            </Button>
        </Box >
    );
}

export default CountdownTimer;