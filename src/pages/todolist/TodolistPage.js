import React, { useState } from 'react';
import { TextField, Typography, Button, Stack, Box } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { PlusIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { CloudUploadIcon } from '@heroicons/react/outline'


function TodolistPage() {
    const classes = useStyles();
    const [file, setFile] = useState();
    const [tasks, setTasks] = useState([]);
    const [taskNum, setTaskNum] = useState(1);

    const handleAddTodo = (event) => {
        let newNum = taskNum + 1;
        setTaskNum(newNum);
        tasks.append({"title": "", "content": ""});
    }

    const handleTaskTitle = (index) => (event) => {
        
    }

    const handleContent = (index) => (event) => {

    }

    const handleFileChange = (index) => (event) => {
        event.preventDefault();

        setFile(event.target.files[0]);
    }
    

    return (
        <div className={classes.container}>
            <Typography variant="h4" pb="1rem">할 일</Typography>

            <Box sx={{ height: "42rem", overflowY: "auto" }}>
                {Array(taskNum).fill(1).map((task, index) =>
                    <Box key={index} sx={{ pb: "0.5rem", pt: "1rem" }}>
                        <Stack direction="row">
                            <TextField size="small" variant="standard" sx={{ width: "20rem" }} />
                            <Button>
                                <ChevronDownIcon style={{ width: "2rem" }} />
                            </Button>
                        </Stack>

                        <Box sx={{ mx: 0 }}>
                            <Box backgroundColor="#F8FAFC" sx={{ border: "1px solid #E2E8F0", borderRadius: "10px 10px 0 0", p: "4rem" }}>
                                <input type="file" id="contained-button-file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                                <label htmlFor="contained-button-file">
                                    <Stack alignItems="center">
                                        <CloudUploadIcon style={{ width: "30px" }} />
                                        <Typography>이미지 업로드</Typography>
                                    </Stack>
                                </label>   
                            </Box>
                            <TextField fullWidth multiline minRows={4} placeholder="글을 작성해주세요" />
                        </Box>
                    </Box>
                )}
            </Box>

            <Box>
                <CircleButton className={classes.addTodo} onClick={handleAddTodo}>
                    <PlusIcon style={{ width: "2rem", color: "#fff" }} />
                </CircleButton>
            </Box>
        </div>
    )
}

export default TodolistPage

const useStyles = makeStyles(theme => ({
    container: {
        height: "100vh",
        maxWidth: "390px",
        maxHeight: "844px",
        width: "100vw",
        padding: "24px 20px",
    },
    addTodo: {
        backgroundColor: "#84CC16", 
        position: "fixed", 
        bottom: "24px", 
        right: "20px", 
        width: "40px", 
        height: "40px", 
    }
}));

const CircleButton = styled("button")({
    borderRadius: "50%", 
    borderColor: "transparent", 
    display: "flex", 
    alignItems: "center"
})