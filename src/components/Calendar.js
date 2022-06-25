import React, { useState } from 'react';
import { Typography, Grid } from '@mui/material';
import Godsaeng from '../assets/images/Godsaeng.png';


function Calendar(props) {
    const dayOfWeeks = ["일", "월", "화", "수", "목", "금", "토"];
    const [days, setDays] = useState([
        {"day": 1, "godsaeng": true},
        {"day": 2, "godsaeng": false},
        {"day": 3, "godsaeng": false},
        {"day": 4, "godsaeng": false},
        {"day": 5, "godsaeng": false},
        {"day": 6, "godsaeng": false},
        {"day": 7, "godsaeng": false},
        {"day": 8, "godsaeng": false},
        {"day": 9, "godsaeng": false},
        {"day": 10, "godsaeng": false},
        {"day": 11, "godsaeng": false},
        {"day": 12, "godsaeng": false},
        {"day": 13, "godsaeng": false},
        {"day": 14, "godsaeng": false},
        {"day": 15, "godsaeng": false},
        {"day": 16, "godsaeng": false},
        {"day": 17, "godsaeng": false},
        {"day": 18, "godsaeng": false},
        {"day": 19, "godsaeng": false},
        {"day": 20, "godsaeng": false},
        {"day": 21, "godsaeng": false},
        {"day": 22, "godsaeng": false},
        {"day": 23, "godsaeng": false},
        {"day": 24, "godsaeng": false},
        {"day": 25, "godsaeng": false},
        {"day": 26, "godsaeng": false},
        {"day": 27, "godsaeng": false},
        {"day": 28, "godsaeng": false},
        {"day": 29, "godsaeng": false},
        {"day": 30, "godsaeng": false},
    ]);

    return (
        <div>
            <Grid container>
                {dayOfWeeks.map(dayOfWeek => 
                    <Grid key={dayOfWeek} item xs={12/7} pb="0.25rem">
                        <Typography fontSize="14px" textAlign="center" color="#94A3B8">{dayOfWeek}</Typography>
                    </Grid>
                )}
                {Array(3).fill(1).map(day =>
                    <Grid key={day} item xs={12/7} display="flex" flexDirection="column" alignItems="center" sx={{ height: "56px" }} />
                )}
                {days?.map(day =>
                    <Grid 
                        key={day} item xs={12/7} 
                        display="flex" flexDirection="column" alignItems="center" sx={{ height: "56px", backgroundColor: props.day===day.day ? "primary.light" : "none" }}
                        onClick={props.handleDay(day?.day)}
                    >
                        <Typography fontSize="14px">{day.day}일</Typography>
                        {day.godsaeng &&
                            <img src={Godsaeng} width="24px" />
                        }
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default Calendar
