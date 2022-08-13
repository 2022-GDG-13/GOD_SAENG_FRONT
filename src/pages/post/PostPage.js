import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, Stack, Box, Checkbox, Dialog, DialogContent, DialogActions, DialogTitle, IconButton, } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { CloudUploadIcon } from '@heroicons/react/outline';
import Calendar from '../../components/Calendar';
import { dateToString } from '../../utils/Format';
import { XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import DetailPage from '../ranking/DetailPage';


function PostPage() {
    const classes = useStyles();
    const today = dateToString(new Date());
    const uid = 1;

    const [stage, setStage] = useState(1);
    const [disabled, setDisabled] = useState(true);

    const [day, setDay] = useState(undefined);

    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [file, setFile] = useState();
    const [imageUrl, setImageUrl] = useState("");

    const [currentTag, setCurrentTag] = useState();
    const [hideId, setHideId] = useState([]);

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

    const [detailData, setDetailData] = useState();


    useEffect(() => {
        if (stage == 2) {
            // TODO: POST day and get tasks
            getTasks();   
        }
        else if (stage == 3) {
            // TODO: POST post image, title, description

        }
    }, [stage]);

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

    useEffect(() => {
        if (title) {
            setDisabled(false);
        }
    }, [title]);

    const handleFileChange = (taskId) => (event) => {
        event.preventDefault();

        let file = event.target.files[0];
        // setFile(event.target.files[0]);

        let formdata = new FormData();
        formdata.append("img", file)

        // TODO:  POST image
        if (taskId) {
            
        }
        else {
            axios({
                method: 'post',
                url: `http://15.164.228.89:8080/api/v1/common/img`,
                data: formdata
            })
            .then(response => {
                console.log(response.data?.response);
                setImageUrl(response?.data?.response);
            })
            .catch(error => {
                console.log(error.response);
            })
        }
    }

    const handleStage = (event) => {
        setStage(stage+1);
        setDisabled(true);
    }

    const handleDay = (day) => (event) => {
        if (day) {
            setDay(day);
            setDisabled(false);
        }
    }

    const handleCheckbox = (taskId) => {
        // TODO: POST taskID
    }

    const handleUpload = (event) => {
        let taskIdList = tasks?.map(task => task.id);
        console.log(taskIdList)
        console.log(hideId);

        for (var i = hideId.length -1; i >= 0; i--) {
            taskIdList?.splice(hideId[i], 1);
        }

        console.log("taskIdList", taskIdList);

        let data = {
            "uid": uid,
            "title": title,
            "description": description,
            "imgUrl": imageUrl,
            "taskIdList": taskIdList
        }

        // TODO: POST
        axios({
            method: 'post',
            url: `http://15.164.228.89:8080/api/v1/post`,
            data: data
        })
        .then(response => {
            console.log(response.data?.response);
            setStage(stage+1);            
            handleDetail(response.data?.response?.id);
        })
        .catch(error => {
            console.log(error.response);
        })
    }

    const handleUploadTask = (taskId) => (event) => {
        // TODO: PUT
        let data = {
            "taskId": taskId,
            "title": title,
            "description": description,
            "imageUrl": imageUrl,
            "tag": currentTag
        }
        console.log(taskId, data);

        axios({
            method: "PUT",
            url: `http://15.164.228.89:8080/api/v1/task`,
            data: data
        })
        .then(response => {
            console.log(response.data);
            getTasks();
            handleModal();
        })
        .catch(error => {
            console.log(error.response);
        })
    }

    const handleTitle = (taskId) => (event) => {
        setTitle(event.target.value)
    }

    const handleDescription = (taskId) => (event) => {
        setdescription(event.target.value)
    }

    const handleModal = (event) => {
        setOpen(!open);
    }

    const handleTag = (value) => (event) => {
        setCurrentTag(value);
    }

    const handleHide = (taskId) => (event) => {
        setHideId([...hideId, taskId]);
    }

    const handleDetail = (postId) => {
        axios
        .get(`http://15.164.228.89:8080/api/v1/post/${postId}`)
        .then((response) => {
            console.log("detail", response.data?.response);
            setDetailData(response.data?.response);
        });
    }


    return (
        <div className={classes.container}>
        
            {stage === 4  ? (
                <DetailPage detailData={detailData} />
            ) : (
            <Box sx={{ height: "45rem", overflowY: "scroll" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end" pb="3rem">
                    <Typography variant="h4">게시글 작성</Typography>
                    <Typography>
                        <span style={{ color: "#475569", fontWeight: 700 }}>{stage} </span>
                        <span style={{ color: "#94A3B8" }}>/ 3</span>
                    </Typography>
                </Stack>

                <Box>
                    {stage == 1 &&
                        <Stack spacing={"1.5rem"}>
                            <Typography color="#64748B" mb="1.5rem">게시글을 작성할 날짜를 선택해주세요.</Typography>
                            <Typography color="primary.dark" fontWeight="700" variant="h5" pb="0.5rem">6월</Typography>
                            <Calendar handleDay={handleDay} day={day} />
                        </Stack>
                    }

                    {stage == 2 &&
                        <Stack spacing={"1.5rem"}>
                            <TextField fullWidth variant="standard" placeholder="제목" value={title} onChange={handleTitle()} />
                            {imageUrl ? (
                                <img src={imageUrl} />
                            ) : (
                                <Box backgroundColor="#F8FAFC" sx={{ border: "1px solid #E2E8F0", borderRadius: "10px", p: "4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <input type="file" id="contained-button-file" accept="image/*" onChange={handleFileChange()} style={{ display: "none" }} />
                                    <label htmlFor="contained-button-file">
                                        <Stack alignItems="center">
                                            <CloudUploadIcon style={{ width: "30px" }} />
                                            <Typography>이미지 업로드</Typography>
                                        </Stack>
                                    </label>   
                                </Box>
                            )}
                            <TextField fullWidth multiline minRows={13} placeholder="글을 작성해주세요" value={description} onChange={(handleDescription())} />
                        </Stack>
                    }

                    {stage == 3 &&
                        <React.Fragment>
                            <Typography color="#64748B" mb="1.5rem">업로드 이후에도 수정이 가능합니다.</Typography>
                            {tasks?.map((task) =>
                                <Box key={task?.id} sx={{ pb: "0.5rem", pt: "1rem" }}>
                                    <Box sx={{ borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                                        <Stack direction="row" alignItems="center">
                                            <Checkbox checked={task?.checkBox} value={task?.checkBox} onChange={handleCheckbox(task?.id)} />
                                            <TextField size="small" variant="standard" fullWidth margin="none" placeholder="입력" value={task?.title} onChange={handleTitle(task?.id)} />
                                            <Box width="1rem" />
                                        </Stack>
                                        <Stack direction="row" alignItems="center" spacing="1rem" p="1rem" justifyContent="flex-end">
                                            {hideId.includes(task?.id) ? (
                                                <Button variant="contained" style={{ backgroundColor: "#F1F5F9" }} onClick={handleHide(task?.id)}>숨기기 완료</Button>
                                            ) : (
                                                <React.Fragment>
                                                    <Button variant="contained" style={{ backgroundColor: "#D9F99D" }} onClick={handleModal}>수정</Button>
                                                    <Button variant="contained" style={{ backgroundColor: "#E2E8F0" }} onClick={handleHide(task?.id)}>숨기기</Button>
                                                </React.Fragment>
                                            )}
                                        </Stack>

                                    </Box>

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
                                            <Box style={{ border: "1px solid #E2E8F0", backgroundColor: "#F8FAFC", borderRadius: "10px 10px 0 0" }}>
                                                {task?.imageUrl ? (
                                                    <img src={task.imageUrl} width="100%" />
                                                ) : (
                                                    <React.Fragment>
                                                        <input type="file" id="contained-button-file" accept="image/*" onChange={handleFileChange(task?.id)} style={{ display: "none" }} />
                                                        <label htmlFor="contained-button-file">
                                                            <Stack alignItems="center" p="4rem">
                                                                <CloudUploadIcon style={{ width: "30px" }} />
                                                                <Typography>이미지 업로드</Typography>
                                                            </Stack>
                                                        </label>  
                                                    </React.Fragment>
                                                )}
                                            </Box>
                                            <TextField fullWidth multiline minRows={4} placeholder="글을 작성해주세요" value={task?.description} onChange={handleDescription(task?.id)} />
                                            <Typography variant="h6" p="1rem 1.5rem" fontWeight="700">태그</Typography>
                                            <Box sx={{ pl: "1rem", pb: "2rem" }}>
                                                {tags?.map(tag => 
                                                    <Button key={tag?.value} sx={{ mr: "0.5rem", borderRadius: "2rem", backgroundColor: tag?.value === currentTag ? "#E2E8F0" : "#F1F5F9" }} onClick={handleTag(tag?.value)}>
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
                        </React.Fragment>
                    }
                </Box>
            </Box>
            )}

            {stage === 3 ? (
                <Button className={classes.bottomButton} variant="contained" fullWidth mt="1.5rem" onClick={handleUpload}>
                    <Typography color="#fff">업로드</Typography>
                </Button>
            ) : (
                stage !== 4 &&
                    <Button className={classes.bottomButton} variant="contained" fullWidth mt="1.5rem" disabled={disabled} onClick={handleStage}>
                        <Typography color="#fff">다음</Typography>
                    </Button>
            )}
        </div>
    )
}

export default PostPage

const useStyles = makeStyles(theme => ({
    container: {
        height: "100vh",
        maxWidth: "390px",
        maxHeight: "844px",
        width: "100vw",
        padding: "24px 20px",
    },
    bottomButton: {
        position: "relative",
        marginTop: "auto",
        bottom: "24px"
    }
}));
