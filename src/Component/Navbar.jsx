import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Box,
} from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import momentTimeZone from "moment-timezone";
import WeeklySchedule from "./WeeklySchedule";

const Navbar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timezone, setTimezone] = useState("");

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handlePreviousDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const timeZones = momentTimeZone.tz.names().map((timeZone) => {
    const offset = momentTimeZone.tz(timeZone).format("Z");
    return `[UTC${offset}] ${timeZone}`;
  });

  // Log information from Navbar
  console.log(JSON.stringify({ currentDate, timezone }));

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="previous"
            onClick={handlePreviousDate}
          >
            <ArrowBack />
            Previous Week
          </IconButton>
          <Typography variant="h6" style={{ flex: 1, textAlign: "center" }}>
            {formatDate(currentDate)}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="next"
            onClick={handleNextDate}
          >
            Next Week
            <ArrowForward />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        p={5}
        display="flex"
        justifyContent="center"
        style={{ marginTop: "20px" }}
      >
        <Autocomplete
          options={timeZones}
          renderInput={(params) => (
            <TextField {...params} label="Timezone" variant="outlined" />
          )}
          value={timezone}
          onChange={(event, newValue) => {
            setTimezone(newValue);
          }}
        />
      </Box>
      <WeeklySchedule
        currentDate={currentDate}
        timezone={timezone}
        style={{ marginTop: "16px" }}
      />
    </>
  );
};

export default Navbar;
