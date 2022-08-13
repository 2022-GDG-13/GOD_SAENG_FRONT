import React from "react";
import {
  Typography,
  Stack,
  Box,
  Checkbox,
} from "@mui/material";
import { HeartIcon } from "@heroicons/react/solid";
import { ChevronLeftIcon } from "@heroicons/react/outline";


function DetailPage({ detailData, handleDetailShow }) {
    const tagsENtoKR = {
        "": "전체",
        DEV: "개발",
        SPORT: "스포츠",
        STUDY: "공부",
        DRAWING: "그림",
    };

    return (
        <div style={{ paddingBottom: "60px" }}>
          <Stack justifyContent="space-between" pb="1rem" gap="1rem">
            <div
              style={{ display: "flex", alignItems: "center", gap: "2px" }}
              onClick={handleDetailShow}
            >
              <ChevronLeftIcon width="24px" strokeWidth="2.5" />
              <Typography variant="h4">게시글</Typography>
            </div>
          </Stack>
          {detailData && detailData.post && (
            <>
              <Typography fontSize="20px" fontWeight="medium" color="#1E293B">
                {detailData.post.title}
              </Typography>
              <Stack
                direction="row"
                style={{ justifyContent: "space-between" }}
                sx={{ mt: "6px" }}
              >
                <Typography color="#0F172A" fontSize="14px">
                  {detailData.userName}
                </Typography>
                <div
                  style={{
                    color: "#EF4444",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <HeartIcon style={{ width: "16px", height: "16px" }} />
                  <Typography fontSize="14px">
                    {detailData.post.likeCnt}
                  </Typography>
                </div>
              </Stack>
              {detailData.post.imgUrl ? (
                <img
                  src={detailData.post.imgUrl}
                  width="100%"
                  style={{ marginTop: "12px", borderRadius: "12px" }}
                />
              ) : (
                <Box
                  backgroundColor="#F8FAFC"
                  sx={{
                    p: "6rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    mt: "12px",
                  }}
                ></Box>
              )}
              <Stack sx={{ mt: "12px" }}>
                <Typography
                  color="#0F172A"
                  fontSize="16px"
                  sx={{ mb: "4px", fontWeight: "lighter" }}
                >
                  {detailData.post.description}
                </Typography>
                <Typography
                  style={{
                    display: "flex",
                    gap: "4px",
                    color: "#475569",
                    paddingBottom: "8px",
                    fontSize: "16px",
                    fontWeight: "lighter",
                  }}
                >
                  {detailData.tags.map((v) => (
                    <># {tagsENtoKR[v]}</>
                  ))}
                </Typography>
              </Stack>
              {detailData.taskEntityList.map((v) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      border: "0.5px solid #E2E8F0",
                      borderRadius: "12px",
                      marginBottom: "20px",
                      marginTop: "20px",
                    }}
                  >
                    <Stack direction="row" style={{ alignItems: "center" }}>
                      <Checkbox value={v.checkBox} disabled />
                      <Typography fontSize="15px" color="#0F172A">
                        {v.title}
                      </Typography>
                    </Stack>
                    {v.imageUrl ? (
                      <img src={v.imageUrl} width="100%" />
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
                        padding: "0px 12px",
                      }}
                    >
                      <Typography
                        fontSize="16px"
                        sx={{ pt: "8px", pb: "4px", fontWeight: "medium" }}
                        color="#1E293B"
                      >
                        {v.title}
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
                        # {tagsENtoKR[v.tag]}
                      </Typography>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
    )
}

export default DetailPage
