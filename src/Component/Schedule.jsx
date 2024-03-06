import React, { useState } from "react";
import {
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
  makeStyles,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  dayBox: {
    border: "1px solid #ccc",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
  },
  workingHoursBox: {
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(1),
    width: "50%",
    flexWrap: "wrap",
    marginLeft: "25%",
  },
  dayTypography: {
    border: "1px solid #ccc",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  pastDay: {
    color: "gray",
    fontStyle: "italic",
  },
}));

const Schedule = () => {
  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const classes = useStyles();

  // Define the schedule data directly within the component
  const scheduleData = [
    {
      Id: 101,
      Name: "test",
      Date: "2024-03-07",
      Time: "22:30",
    },
    {
      Id: 102,
      Name: "test 1",
      Date: "2024-03-08",
      Time: "09:00",
    },
    // Add more data as needed
  ];

  const handleCheckboxChange = (id, time) => {
    if (selectedSchedule.some((item) => item.Id === id && item.Time === time)) {
      setSelectedSchedule(
        selectedSchedule.filter(
          (item) => !(item.Id === id && item.Time === time)
        )
      );
    } else {
      setSelectedSchedule([...selectedSchedule, { Id: id, Time: time }]);
    }
  };

  const location = useLocation();
  const { selectedScheduleData } = location.state;
  return (
    <>
      <Grid container spacing={2} style={{ marginTop: "16px" }}>
        {scheduleData.map((item) => (
          <Grid item xs={12} key={item.Id}>
            <Typography variant="h6" className={classes.dayTypography}>
              {item.Date}
            </Typography>
            <Box className={classes.workingHoursBox}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedSchedule.some(
                      (s) => s.Id === item.Id && s.Time === item.Time
                    )}
                    onChange={() => handleCheckboxChange(item.Id, item.Time)}
                  />
                }
                label={item.Time}
                labelPlacement="end"
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <div>
        <h1>View Schedule</h1>
        <div>
          <h2>Selected Schedule:</h2>
          <ul>
            {selectedSchedule.map((item, index) => (
              <li key={index}>
                Day: {item.day}, Time: {item.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Schedule;
