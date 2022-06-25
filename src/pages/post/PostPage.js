import React, { useState } from 'react';
import { TextField, Typography, Button, Stack, Box } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { CloudUploadIcon } from '@heroicons/react/outline';
import Calendar from '../../components/Calendar';


function PostPage() {
    const classes = useStyles();
    const [stage, setStage] = useState(1);
    const [file, setFile] = useState();

    const handleFileChange = (index) => (event) => {
        event.preventDefault();

        setFile(event.target.files[0]);
    }

    const handleStage = (event) => {
        setStage(stage+1);
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

            {stage == 3 &&
                <Calendar />
            }

            {stage == 2 &&
                <Stack spacing={"1.5rem"}>
                    <TextField fullWidth variant="standard" placeholder="제목" />
                    <Box backgroundColor="#F8FAFC" sx={{ border: "1px solid #E2E8F0", borderRadius: "10px", p: "4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <input type="file" id="contained-button-file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                        <label htmlFor="contained-button-file">
                            <Stack alignItems="center">
                                <CloudUploadIcon style={{ width: "30px" }} />
                                <Typography>이미지 업로드</Typography>
                            </Stack>
                        </label>   
                    </Box>
                    <TextField fullWidth multiline minRows={16} placeholder="글을 작성해주세요" />
                </Stack>
            }

            {stage == 3 &&
                <div>Tasks</div>
            }

            {stage == 3 ? (
                <Button variant="contained" fullWidth mt="1.5rem" onClick={handleUpload}>
                    <Typography color="#fff">업로드</Typography>
                </Button>
            ) : (
                <Button variant="contained" fullWidth mt="1.5rem" onClick={handleStage}>
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
    }
}));
