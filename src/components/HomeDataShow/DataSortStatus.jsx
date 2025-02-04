import { Box, TextField, Typography } from "@mui/material";


const DataSortStatus = ({ todos, setTodos }) => {

    const searchInputValue = e => {
        const inpVal = e.target.value;
        const searchData = todos.filter(task => task.title.toLowerCase().includes(inpVal.toLowerCase()));
        console.log(searchData)
        setTodos(searchData);
    }

    return (
        <Box component="section" marginTop={"20px"} sx={{ p: 2, border: '1px dashed grey' }}>
            <Box component={"div"} display={"flex"} justifyContent={"left"} alignItems={"center"}>
                <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                    Search By Title :
                </Typography>
                <TextField type="text" id="outlined-basic" onInput={(e) => searchInputValue(e)} label="Type your Task Title" variant="outlined" ></TextField>
            </Box>
        </Box>
    );
};

export default DataSortStatus;