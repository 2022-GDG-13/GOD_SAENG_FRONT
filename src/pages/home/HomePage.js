import React, { useState, useEffect } from "react";
import { Typography, Stack } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import Calendar from "../../components/Calendar";
import axios from "axios";

function HomePage() {
  const classes = useStyles();

  const [rate, setRate] = useState(0);

  const [day, setDay] = useState(undefined);

  const handleDay = (day) => (event) => {};

  useEffect(() => {
    axios.get("http://15.164.228.89:8080/api/v1/task/god-saeng/rate", {
      params: {
        uid: 1
      }
    }).then(response => {
      console.log(response.data?.response)
      setRate(response.data?.response)
    })
  }, [])

  return (
    <div className={classes.container}>
      <Typography fontSize="24px" style={{ paddingBottom: "30px" }}>
        <strong>자라나는GDG갓생새싹</strong>
        <span style={{ fontWeight: "lighter" }}>
          님
          <br />
          오늘도 '갓생' 살았나요?
        </span>
      </Typography>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            backgroundColor: "#E2E8F0",
            position: "relative",
            display: "flex",
            height: "105px",
            borderRadius: "12px",
            width: "98%",
          }}
        >
          <div style={{ position: "absolute", left: "16px", top: "15px" }}>
            <Typography color="#3F6212">이번달의 갓생 지수</Typography>
            <Typography color="#3F6212" fontSize="36px" fontWeight="bold">
              {rate}%
            </Typography>
          </div>
          <div
            style={{
              width: `${rate}%`,
              backgroundColor: "#ECFCCB",
              borderRadius: "12px 0 0 12px ",
            }}
          ></div>
          <div style={{ width: `${100 - rate}%` }}></div>
        </div>
        <div
          style={{ backgroundColor: "#E2E8F0", height: "30px", width: "3%" }}
        ></div>
      </div>
      <Stack direction="row" pb="20px" pt="48px">
        <Typography
          color="primary.dark"
          fontWeight="700"
          variant="h5"
          fontSize="24px"
        >
          6월
        </Typography>
        <Typography fontWeight="700" variant="h5" gutterBottom fontSize="24px">
          의 기록
        </Typography>
      </Stack>
      <Calendar handleDay={handleDay} day={day} />
    </div>
  );
}

export default HomePage;

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    maxWidth: "390px",
    maxHeight: "844px",
    width: "100vw",
    padding: "24px 20px",
  },
}));
