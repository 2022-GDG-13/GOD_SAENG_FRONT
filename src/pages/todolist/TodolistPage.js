import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, Stack, Box, Checkbox, Dialog, DialogContent, DialogActions, DialogTitle, IconButton } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { PlusIcon, ChevronRightIcon, XIcon } from '@heroicons/react/solid';
import { CloudUploadIcon } from '@heroicons/react/outline';
import { dateToString } from '../../utils/Format';
import axios from 'axios';


function TodolistPage() {
    const classes = useStyles();
    const today = dateToString(new Date());
    const uid = 1;
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
    const [imageUrl, setImageUrl] = useState("");
    const [currentTag, setCurrentTag] = useState();
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = () => {
        axios({
            method: 'get',
            url: `http://15.164.228.89:8080/api/v1/task/daily`,
            params: {
                uid: uid,
                date: today
            }
        })
        .then(response => {
            console.log(response.data?.response);
            setTasks(response?.data?.response)
        })
        .catch(error => {
            console.log(error.response);
        })
    }

    const handleAddTodo = (event) => {
        setAddTask(true);
    }

    const handleModal = (event) => {
        if (open) {
            setTitle("");
            setDescription("");
            setImageUrl("");
        }
        setOpen(!open);
    }

    const handleCheckbox = (taskId) => (event) => {
        axios({
            method: 'patch',
            url: `http://15.164.228.89:8080/api/v1/task/check?taskId=${taskId}`,
        })
        .then(response => {
            console.log(response.data?.response);
            getTasks();
        })
        .catch(error => {
            console.log(error.response);
        });
        getTasks();
    }

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleFileChange = (event) => {
        event.preventDefault();

        let file = event.target.files[0];
        // setFile(event.target.files[0]);

        let formdata = new FormData();
        formdata.append("img", file)

        axios({
            method: 'post',
            url: `http://15.164.228.89:8080/api/v1/common/img`,
            data: formdata
        })
        .then(response => {
            console.log(response.data?.response);
            setImageUrl(response?.data?.response)
        })
        .catch(error => {
            console.log(error.response);
        })
    }

    const handleUploadTask = (taskId) => (event) => {
        event.preventDefault();
        
        // TODO: POST
        let method = "post";
        let data;
 
        console.log("upload task", data)

        if (taskId) {
            data = {
                "taskId": taskId,
                "title": title,
                "description": description,
                "imageUrl": imageUrl,
                "tag": currentTag
            }
            method = "put";
        }
        else {
            data = {
                "uid": uid,
                "title": title,
                "description": description,
                "imageUrl": imageUrl,
                "tag": currentTag
            }
        }

        console.log(taskId, data);

        axios({
            method: method,
            url: `http://15.164.228.89:8080/api/v1/task`,
            data: data
        })
        .then(response => {
            console.log(response.data);
            setAddTask(false);
            getTasks();
            handleModal();
        })
        .catch(error => {
            console.log(error.response);
        })
    }

    const handleTag = (value) => (event) => {
        setCurrentTag(value);
        console.log(value)
    }
    

    return (
        <div className={classes.container}>
            <Typography variant="h4" pb="1rem">할 일</Typography>

            <Box sx={{ height: "42rem", overflowY: "auto", zIndex: 9 }}>
                {tasks.map((task, index) =>
                    <Box key={index} sx={{ pb: "0.5rem", pt: "1rem" }}>
                        <Stack direction="row" alignItems="center">
                            <Checkbox checked={task?.checkBox} onChange={handleCheckbox(task?.id)} />
                            <TextField size="small" variant="standard" fullWidth margin="none" placeholder="입력" value={task?.title} onChange={handleTitle} />
                            <Box sx={{ pl: "0.5rem" }} onClick={handleModal}>
                                <ChevronRightIcon style={{ width: "2rem" }} />
                            </Box>
                        </Stack>
                        
                        <Dialog open={!addTask && open} fullWidth maxWidth="xs">
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
                                    {(task?.imageUrl || imageUrl) ? (
                                        <img src={imageUrl ? imageUrl : task.imageUrl} width="100%" />
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
                                {!addTask &&
                                    <Button variant="contained" fullWidth sx={{ py: "1rem" }} onClick={handleUploadTask(task?.id)}>
                                        저장
                                    </Button>
                                }
                            </DialogActions>
                        </Dialog>
                    </Box>
                )}
                {addTask &&
                    <Box sx={{ pb: "0.5rem", pt: "1rem" }}>
                        <Stack direction="row">
                            <Checkbox />
                            <TextField size="small" variant="standard" fullWidth placeholder="입력" value={title} onChange={handleTitle} />
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
                                <Box sx={{ border: "1px solid #E2E8F0", backgroundColor: "#F8FAFC", borderRadius: "10px 10px 0 0" }}>
                                    {imageUrl ? (
                                        <img src={imageUrl} width="100%" />
                                    ) : (
                                        <Box>
                                            <input type="file" id="contained-button-file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                                            <label htmlFor="contained-button-file">
                                                <Stack alignItems="center" sx={{ backgroudColor: "yellow", p: "4rem" }}>
                                                    <CloudUploadIcon style={{ width: "30px" }} />
                                                    <Typography>이미지 업로드</Typography>
                                                </Stack>
                                            </label>   
                                        </Box>
                                    )}
                                </Box>
                                <TextField fullWidth multiline minRows={4} placeholder="글을 작성해주세요" />
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
                                <Button variant="contained" fullWidth sx={{ py: "1rem" }} onClick={handleUploadTask()}>
                                    저장
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                }
            </Box>

            <Box sx={{ zIndex: 99 }}>
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
