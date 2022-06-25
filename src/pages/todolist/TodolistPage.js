import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, Stack, Box, Checkbox, Dialog, DialogContent, DialogActions, DialogTitle, IconButton, Chip } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { PlusIcon, ChevronRightIcon, XIcon } from '@heroicons/react/solid';
import { CloudUploadIcon } from '@heroicons/react/outline';
import { dateToString } from '../../utils/Format';


function TodolistPage() {
    const classes = useStyles();
    const today = dateToString(new Date());
    const tags = [
        {"name": "개발", "value": "DEV"},
        {"name": "스포츠", "value": "SPORT"},
        {"name": "공부", "value": "STUDY"},
        {"name": "그림", "value": "DRAWING"}
    ];
    const [tasks, setTasks] = useState([
        {"id": 1, "date": today, "title": "그림 그리기", "description": "설명", "imageUrl": "이미지", "checkBox": true, "tag": "DRAWING" },
        {"id": 2, "date": today, "title": "개발하기", "description": "", "imageUrl": "", "checkBox": false, "tag": "DEV" },
        {"id": 3, "date": today, "title": "테니스 치기", "description": "", "imageUrl": "", "checkBox": false, "tag": "SPORT" },
    ]);
    const [addTask, setAddTask] = useState(false);
    const [open, setOpen] = useState(false);
    // DEV, SPORT, STUDY, DRAWING
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [checked, setChecked] = useState(false);
    const [file, setFile] = useState();
    const [currentTag, setCurrentTag] = useState();

    useEffect(() => {
        // GET tasks
    }, []);

    const handleAddTodo = (event) => {
        setAddTask(true);
    }

    const handleModal = (event) => {
        setOpen(!open);
    }

    const handleCheckbox = (taskId) => {

    }

    const handleTitle = (taskId) => (event) => {
        
    }

    const handleDescription = (taskId) => (event) => {

    }

    const handleFileChange = (taskId) => (event) => {
        event.preventDefault();

        setFile(event.target.files[0]);
    }

    const handleUploadTask = (event) => {
        // TODO: POST
        setAddTask(false);
        handleModal();
    }

    const handleTag = (value) => (event) => {
        setCurrentTag(value);
        console.log(value)
    }
    

    return (
        <div className={classes.container}>
            <Typography variant="h4" pb="1rem">할 일</Typography>

            <Box sx={{ height: "42rem", overflowY: "auto" }}>
                {tasks.map((task, index) =>
                    <Box key={index} sx={{ pb: "0.5rem", pt: "1rem" }}>
                        <Stack direction="row" alignItems="center">
                            <Checkbox value={task?.checkBox} onChange={handleCheckbox} />
                            <TextField size="small" variant="standard" fullWidth margin="none" placeholder="입력" value={task?.title} onChange={handleTitle} />
                            <Box sx={{ pl: "0.5rem" }} onClick={handleModal}>
                                <ChevronRightIcon style={{ width: "2rem" }} />
                            </Box>
                        </Stack>

                        <Dialog open={open} fullWidth maxWidth="xs">
                            <DialogTitle sx={{ display: "flex", alignItems: "flex-end" }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>상세설명</Typography>
                                <IconButton
                                    aria-label="close"
                                    onClick={handleModal}
                                    sx={{
                                    position: 'absolute',
                                    right: 16,
                                    top: 8,
                                    }}
                                >
                                    <XIcon style={{ width: "1.5rem" }} />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent sx={{ p: 0 }}>
                                <Box style={{ border: "1px solid #E2E8F0", backgroundColor: "#F8FAFC", borderRadius: "10px 10px 0 0", p: "4rem" }}>
                                    {task?.imageUrl ? (
                                        <img src={task.imageUrl} width="100%" />
                                    ) : (
                                        <React.Fragment>
                                            <input type="file" id="contained-button-file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                                            <label htmlFor="contained-button-file">
                                                <Stack alignItems="center" p="4rem">
                                                    <CloudUploadIcon style={{ width: "30px" }} />
                                                    <Typography>이미지 업로드</Typography>
                                                </Stack>
                                            </label>  
                                        </React.Fragment>
                                    )}
                                </Box>
                                <TextField fullWidth multiline minRows={4} placeholder="글을 작성해주세요" value={task?.description} onChange={handleDescription} />
                                <Typography variant="h6" p="1rem 1.5rem" fontWeight="700">태그</Typography>
                                <Box sx={{ pl: "1rem", pb: "2rem" }}>
                                    {tags?.map(tag => 
                                        <Button sx={{ mr: "0.5rem", borderRadius: "2rem", backgroundColor: tag?.value === currentTag ? "#E2E8F0" : "#F1F5F9" }} onClick={handleTag(tag?.value)}>
                                            <Typography fontSize="14px" color={tag?.value !== currentTag ? "#CBD5E1" : "#000"}>{tag?.name}</Typography>
                                        </Button>
                                    )}
                                </Box>
                                
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: "center", p: 0 }}>
                                <Button variant="contained" fullWidth sx={{ py: "1rem" }} onClick={handleUploadTask}>
                                    저장
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                )}
                {addTask &&
                    <Box sx={{ pb: "0.5rem", pt: "1rem" }}>
                        <Stack direction="row">
                            <Checkbox />
                            <TextField size="small" variant="standard" fullWidth />
                            <Box sx={{ pl: "1rem" }} onClick={handleModal}>
                                <ChevronRightIcon style={{ width: "2rem" }} />
                            </Box>
                        </Stack>

                        <Dialog open={open} fullWidth maxWidth="xs">
                            <DialogTitle sx={{ display: "flex", alignItems: "flex-end" }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>상세설명</Typography>
                                <IconButton
                                    aria-label="close"
                                    onClick={handleModal}
                                    sx={{
                                    position: 'absolute',
                                    right: 16,
                                    top: 8,
                                    }}
                                >
                                    <XIcon style={{ width: "1.5rem" }} />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent sx={{ p: 0 }}>
                                <Box sx={{ border: "1px solid #E2E8F0", backgroundColor: "#F8FAFC", borderRadius: "10px 10px 0 0", p: "4rem" }}>
                                    <input type="file" id="contained-button-file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                                    <label htmlFor="contained-button-file">
                                        <Stack alignItems="center" sx={{ backgroudColor: "yellow" }}>
                                            <CloudUploadIcon style={{ width: "30px" }} />
                                            <Typography>이미지 업로드</Typography>
                                        </Stack>
                                    </label>   
                                </Box>
                                <TextField fullWidth multiline minRows={4} placeholder="글을 작성해주세요" />
                                <Typography variant="h6" p="1rem 1.5rem" fontWeight="700">태그</Typography>
                                <Box sx={{ pl: "1rem", pb: "2rem" }}>
                                    {tags?.map(tag => 
                                        <Chip label={tag?.name} sx={{ mr: "0.5rem" }} onClick={handleTag(tag?.value)} />
                                    )}
                                </Box>
                                
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: "center", p: 0 }}>
                                <Button variant="contained" fullWidth sx={{ py: "1rem" }} onClick={handleUploadTask}>
                                    저장
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                }
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
        position: "relative", 
        bottom: "24px", 
        right: "20px",
        marginLeft: "auto", 
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  