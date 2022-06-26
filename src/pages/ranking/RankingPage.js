import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Stack,
  Box,
  Checkbox
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { HeartIcon } from "@heroicons/react/solid";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import Godsaeng from "../../assets/images/Godsaeng.png";
import axios from "axios";
import DetailPage from './DetailPage';
import "./tagscroll.css";


function RankingPage() {
  const classes = useStyles();

  const [detailShow, setDetailShow] = useState(false);
  const [detailId, setDetailId] = useState(0);
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    if (detailId) {
      axios
        .get(`http://15.164.228.89:8080/api/v1/post/${detailId}`)
        .then((response) => {
          console.log(response.data?.response);
          setDetailData(response.data?.response);
        });
    }
  }, [detailId]);

  const [postList, setPostList] = useState([]);
  const tags = [
    { name: "전체", value: "" },
    { name: "개발", value: "DEV" },
    { name: "스포츠", value: "SPORT" },
    { name: "공부", value: "STUDY" },
    { name: "그림", value: "DRAWING" },
  ];
  const tagsENtoKR = {
      "": "전체",
      DEV: "개발",
      SPORT: "스포츠",
      STUDY: "공부",
      DRAWING: "그림",
  };

  const [currentTag, setCurrentTag] = useState("");

  useEffect(() => {
    // TODO: GET rank
    axios
      .get("http://15.164.228.89:8080/api/v1/post/rank", {
        params: {
          tag: currentTag,
        },
      })
      .then((response) => {
        // response.data.response.map((v) => (v.tags = ["test", "test1"]));
        setPostList(response.data?.response);
      });
  }, [currentTag]);

  const handleTag = (value) => (event) => {
    setCurrentTag(value);
    console.log(value);
  };

  const handleDetailShow = (event) => {
    setDetailShow(false);
  }

  return (
    <div className={classes.container}>
      {detailShow ? (
        <DetailPage detailData={detailData} />
      ) : (
        <div style={{ paddingBottom: "60px" }}>
          <Stack justifyContent="space-between" pb="1rem" gap="1rem">
            <Typography variant="h4">실시간 랭킹</Typography>
            <div style={{ whiteSpace: "pre" }}>
              {tags?.map((tag) => (
                <Button
                  style={{
                    marginRight: "0.4rem",
                    borderRadius: "2rem",
                    backgroundColor:
                      tag?.value === currentTag ? "#E2E8F0" : "#F1F5F9",
                  }}
                  onClick={handleTag(tag?.value)}
                >
                  <Typography
                    fontSize="14px"
                    color={tag?.value !== currentTag ? "#CBD5E1" : "#000"}
                  >
                    {tag?.name}
                  </Typography>
                </Button>
              ))}
            </div>
          </Stack>
          {postList.length > 0 &&
            postList.map((v, idx) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "0.5px solid #E2E8F0",
                    borderRadius: "12px",
                    marginBottom: "20px",
                  }}
                  key={"RPPL" + idx}
                  onClick={() => {
                    setDetailShow(true);
                    setDetailId(v.post.id);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <div style={{ fontSize: "18px" }}>
                        {idx == 0
                          ? "🥇"
                          : idx == 1
                          ? "🥈"
                          : idx == 2
                          ? "🥉"
                          : null}
                      </div>
                      <Typography fontSize="12px" color="#0F172A">
                        {v.userName}
                      </Typography>
                    </div>
                    <div
                      style={{
                        color: "#EF4444",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <HeartIcon style={{ width: "16px", height: "16px" }} />
                      <Typography fontSize="12px">{v.post.likeCnt}</Typography>
                    </div>
                  </div>
                  {v.post.imgUrl ? (
                    <img src={v.post.imgUrl} width="100%" />
                  ) : (
                    <Box
                      backgroundColor="#F8FAFC"
                      sx={{
                        p: "6rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    ></Box>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0px 12px",
                    }}
                  >
                    <div>
                      <Typography
                        fontSize="16px"
                        sx={{ pt: "8px", pb: "4px", fontWeight: "medium" }}
                        color="#1E293B"
                      >
                        {v.post.title}
                      </Typography>
                      <Typography
                        style={{
                          display: "flex",
                          gap: "4px",
                          color: "#475569",
                          paddingBottom: "8px",
                          fontSize: "14px",
                          fontWeight: "lighter",
                        }}
                      >
                        {v.tags.map((v) => (
                          <div># {tagsENtoKR[v]}</div>
                        ))}
                      </Typography>
                    </div>
                    {v.godSaeng===true && (
                      <img src={Godsaeng} width="36px" height="36px" />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default RankingPage;

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    maxWidth: "390px",
    maxHeight: "844px",
    width: "100vw",
    padding: "24px 20px",
  },
}));
