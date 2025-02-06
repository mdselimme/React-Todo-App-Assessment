import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import useAuth from "../../AuthProvider/useAuth";


const DataSortStatus = () => {



    const { setSortTasks, sortTasks, sortStatus, setSearchQuery, setSortStatus } = useAuth();



    return (
        <Box component="section" marginTop={"20px"} display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} sx={{ p: 2, border: '1px dashed grey' }}>
            <Box component={"div"} display={"flex"} justifyContent={"left"} alignItems={"center"}>
                <Typography sx={{ fontSize: "16px", fontWeight: "600", marginRight: "8px" }}>
                    Search By Title :
                </Typography>
                <TextField type="text" id="outlined-basic" onInput={(e) => setSearchQuery(e.target.value)} label="Type your Task Title" variant="outlined" ></TextField>
            </Box>
            <Box display={"flex"} justifyContent={"left"} alignItems={"center"} marginLeft={"10px"}>
                <Typography sx={{ fontSize: "16px", fontWeight: "600", marginRight: "8px" }}>
                    Or Priority :
                </Typography>
                <FormControl sx={{ minWidth: 200 }} >
                    <InputLabel>Sort by Priority</InputLabel>
                    <Select
                        value={sortTasks}
                        onChange={(e) => setSortTasks(e.target.value)}
                        label="Sort by Priority"
                    >
                        <MenuItem value="default">Default</MenuItem>
                        <MenuItem value="descending">High to Low</MenuItem>
                        <MenuItem value="ascending">Low to High</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box display={"flex"} justifyContent={"left"} alignItems={"center"} marginLeft={"10px"}>
                <Typography sx={{ fontSize: "16px", fontWeight: "600", marginRight: "8px" }}>
                    Or Status :
                </Typography>
                <FormControl sx={{ minWidth: 200 }} >
                    <InputLabel>Sort by Status</InputLabel>
                    <Select
                        value={sortStatus}
                        onChange={(e) => setSortStatus(e.target.value)}
                        label="Sort by Status"
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="incompleted">Incompleted</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};

export default DataSortStatus;