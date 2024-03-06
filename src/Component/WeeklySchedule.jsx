import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router";

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

const WeeklySchedule = () => {
  const navigate = useNavigate();
  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const currentDate = new Date();
  const classes = useStyles();

  useEffect(() => {
    fetch("data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched schedule data:", data);
        setScheduleData(data);
      })
      .catch((error) =>
        console.error("Error fetching schedule data:", error)
      );
  }, []);

  const days = [
    { day: "Monday", date: formatDate(getNextDayOfWeek(1)), workingHours: generateWorkingHours("Monday") },
    { day: "Tuesday", date: formatDate(getNextDayOfWeek(2)), workingHours: generateWorkingHours("Tuesday") },
    { day: "Wednesday", date: formatDate(getNextDayOfWeek(3)), workingHours: generateWorkingHours("Wednesday") },
    { day: "Thursday", date: formatDate(getNextDayOfWeek(4)), workingHours: generateWorkingHours("Thursday") },
    { day: "Friday", date: formatDate(getNextDayOfWeek(5)), workingHours: generateWorkingHours("Friday") },
  ];

  function getNextDayOfWeek(dayOfWeek) {
    const today = new Date();
    const resultDate = new Date(today.getTime());
    resultDate.setDate(today.getDate() + ((7 + dayOfWeek - today.getDay()) % 7));
    return resultDate;
  }

  function formatDate(date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  function generateWorkingHours(day) {
    // Implement your logic here to generate working hours for the given day
    // For now, returning a static array for demonstration
    return [
      "08:00 AM",
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "01:00 PM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
      "05:00 PM",
    ];
  }

  const handleCheckboxChange = (day, hour) => {
    const updatedSchedule = [...selectedSchedule];
    const existingIndex = updatedSchedule.findIndex(
      (item) => item.day === day && item.time === hour
    );
    if (existingIndex !== -1) {
      // If already selected, remove from schedule
      updatedSchedule.splice(existingIndex, 1);
    } else {
      // If not selected, add to schedule
      updatedSchedule.push({ day, time: hour });
    }
    setSelectedSchedule(updatedSchedule);
  };

  // const handleViewSchedule = () => {
  //   console.log("View Schedule");
  //   console.log(scheduleData);
  //   navigate("/schedule");
  // };


  const handleViewSchedule = () => {
    console.log("View Schedule");
    console.log(scheduleData);
    navigate("/schedule", { state: { selectedSchedule } }); 
  };
  const handleConsoleSchedule = () => {
    console.log("Selected Schedule:");
    console.log(selectedSchedule);
  };

  return (
    <Grid container spacing={2} style={{ marginTop: "16px" }}>
      {days.map((dayObj) => (
        <Grid item xs={12} key={dayObj.day}>
          <Typography variant="h6" className={classes.dayTypography}>
            {dayObj.day} - {dayObj.date}
          </Typography>
          <Box className={classes.workingHoursBox}>
            {dayObj.workingHours.map((hour) => (
              <FormControlLabel
                key={hour}
                control={
                  <Checkbox
                    checked={selectedSchedule.some(
                      (item) => item.day === dayObj.day && item.time === hour
                    )}
                    onChange={() => handleCheckboxChange(dayObj.day, hour)}
                    color="primary"
                  />
                }
                label={hour}
                labelPlacement="end"
              />
            ))}
          </Box>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewSchedule}
        >
          View Schedule
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleConsoleSchedule}
          style={{ marginLeft: "16px" }}
        >
          Console Schedule
        </Button>
      </Grid>
    </Grid>
  );
};

export default WeeklySchedule;
