import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, Stack, Box } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { CloudUploadIcon } from '@heroicons/react/outline';
import Calendar from '../../components/Calendar';


function PostPage() {
    const classes = useStyles();

    const [stage, setStage] = useState(1);
    const [disabled, setDisabled] = useState(true);

    const [day, setDay] = useState(undefined);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState();
    
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        if (stage == 2) {
            // TODO: POST day and get tasks
            setTasks([

            ]);
        }
        else if (stage == 3) {
            // TODO: POST post image, title, content
        }
    }, [stage]);

    useEffect(() => {
        if (title) {
            setDisabled(false);
        }
    }, [title]);

    const handleFileChange = (index) => (event) => {
        event.preventDefault();

        setFile(event.target.files[0]);
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

    const handleUpload = (event) => {
        // TODO: POST
    }

    return (
        <div className={classes.container}>
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
                        <TextField fullWidth variant="standard" placeholder="제목" onChange={(e) => setTitle(e.target.value)} />
                        <Box backgroundColor="#F8FAFC" sx={{ border: "1px solid #E2E8F0", borderRadius: "10px", p: "4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <input type="file" id="contained-button-file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                            <label htmlFor="contained-button-file">
                                <Stack alignItems="center">
                                    <CloudUploadIcon style={{ width: "30px" }} />
                                    <Typography>이미지 업로드</Typography>
                                </Stack>
                            </label>   
                        </Box>
                        <TextField fullWidth multiline minRows={16} placeholder="글을 작성해주세요" onChange={(e) => setContent(e.target.value)} />
                    </Stack>
                }

                {stage == 3 &&
                    <div>Tasks</div>
                }
            </Box>

            {stage == 3 ? (
                <Button variant="contained" fullWidth mt="1.5rem" onClick={handleUpload}>
                    <Typography color="#fff">업로드</Typography>
                </Button>
            ) : (
                <Button variant="contained" fullWidth mt="1.5rem" disabled={disabled} onClick={handleStage}>
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
}));
