import React, { useState, useEffect } from "react";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import moment from "moment";

import { Box, Grid, TextField, Typography, FormControl } from "@mui/material";

// TODO documentation https://momentjs.com/docs/#/displaying/difference/

function App() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [repeatOn, setRepeatOn] = useState("");
  const [repeats, setRepeats] = useState("");
  const [repeatEvery, setRepeatEvery] = useState("");

  const [countDates, setCountDays] = useState([]);

  const [includeThisWeek, setIncludeThisWeek] = useState(true);

  const repeatDaily = (start = moment(), end = moment(), includeThisWeek) => {
    // Repeat Daily (Order every day in a date range)

    const daysDifference = Number(moment.duration(end.diff(start)).asDays());

    let datesBeetwen = [];
    for (let i = !!includeThisWeek ? 0 : 1; i <= daysDifference; i++) {
      const copyStartDate = moment(start); // copy start date for corect loop work
      datesBeetwen.push(copyStartDate.add(i, "days").format("YYYY-MM-DD"));
    }

    setCountDays([...datesBeetwen]);
  };

  const repeatWeekly = (
    start = moment(),
    end = moment(),
    customDayOfTheWeek = null,
    includeThisWeek
  ) => {
    // Repeat Weekly in Current day of the week

    let arr = []; // output array

    const dayOfTheWeek =
      customDayOfTheWeek === null
        ? Number(start.day())
        : Number(customDayOfTheWeek);

    console.log("dayOfTheWeek", dayOfTheWeek);

    // Get "next" day of the week
    let tmp = start.clone().day(dayOfTheWeek); // save in tmp start value

    if (includeThisWeek) {
      // Push start day to result array
      if (tmp.isSame(start, "d")) {
        arr.push(tmp.format("YYYY-MM-DD"));
      }
    }

    if (tmp.isAfter(start, "d")) {
      arr.push(tmp.format("YYYY-MM-DD"));
    }
    while (tmp.isBefore(end)) {
      tmp.add(7, "days");
      arr.push(tmp.format("YYYY-MM-DD"));
    }

    setCountDays([...arr]);
  };

  const repeatMonthly = () => {};

  const repeatYearly = () => {};

  useEffect(() => {
    if (repeats === "daily") {
      repeatDaily(startDate, endDate, includeThisWeek);
    } else if (repeats === "weekly") {
      repeatWeekly(startDate, endDate, repeatOn, includeThisWeek);
    } else if (repeats === "monthly") {
      repeatMonthly(startDate, endDate);
    } else if (repeats === "yearly") {
      repeatYearly(startDate, endDate);
    } else {
      setCountDays([]);
    }
  }, [startDate, endDate, includeThisWeek, repeats, repeatOn]);

  return (
    <Box component="form" sx={{ width: "100%" }}>
      <Grid
        container
        direction="row"
        justifyContent={"center"}
        alignItems={"center"}
        columnSpacing={2}
        rowSpacing={3}
      >
        <Grid item xs={12}>
          <Typography align={"center"} component={"h1"}>
            Standing Order
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <FormControl fullWidth={true}>
              <DatePicker
                label="Start Date"
                openTo="year"
                views={["year", "month", "day"]}
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
          </LocalizationProvider>
        </Grid>

        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <FormControl fullWidth={true}>
              <DatePicker
                label="End Date"
                openTo="year"
                views={["year", "month", "day"]}
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <label htmlFor="repeatRule">
            Repeat rule{" "}
            <select
              if="repeatRule"
              onChange={({ target }) => setRepeats(target.value)}
              value={repeats}
            >
              <option value={""}>select</option>
              <option value={"daily"}>Daily</option>
              <option value={"weekly"}>Weekly</option>
              <option value={"monthly"}>Monthly</option>
              <option value={"yearly"}>Yearly</option>
            </select>
          </label>
        </Grid>

        <Grid item xs={12}>
          <label
            htmlFor="repeats"
            hidden={(repeats === "daily" || repeats === "") && true}
          >
            Repeat On{" "}
            <select
              id="repeats"
              onChange={({ target }) => setRepeatOn(target.value)}
              value={repeatOn}
            >
              <option value={""}>select</option>
              <option value={0}>Sunday</option>
              <option value={1}>Monday</option>
              <option value={2}>Tusday</option>
              <option value={3}>Wensday</option>
              <option value={4}>Tithday</option>
              <option value={5}>Friday</option>
              <option value={6}>Saturday</option>
            </select>
          </label>
        </Grid>

        <Grid item xs={3}>
          <strong>Start Date:</strong> {moment(startDate).format("dddd, LL")}
        </Grid>

        <Grid item xs={3}>
          <strong>End Date:</strong> {moment(endDate).format("dddd, LL")}
        </Grid>

        <Grid item xs={2}>
          Repeat On : {repeatOn === "" ? "Day is not selected" : repeatOn}
        </Grid>

        <Grid item xs={2}>
          Repeats: {repeats === "" ? "Repeat rule not selected" : repeats}
        </Grid>

        <Grid item xs={2}>
          DIfference in days : {moment(endDate).diff(moment(startDate), "days")}
        </Grid>

        <Grid item xs={2}>
          <hr />
          <label>
            Include current day
            <input
              checked={includeThisWeek}
              onChange={() => setIncludeThisWeek(!includeThisWeek)}
              type="checkbox"
            />
            <br />
          </label>
          <br />
          Count dates:{" "}
          <i style={{ color: "green" }}>We have a {countDates.length} dates</i>
          <br />
          {countDates.length === 1 ? (
            <>{moment(countDates[0]).format("dddd, LL")}</>
          ) : (
            <div>
              <br />
              {countDates.map((date, index) => {
                return (
                  <div key={index}>
                    {moment(date).format("dddd, LL")}
                    {/*{console.log(date)}*/}
                  </div>
                );
              })}
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
