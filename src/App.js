import React, {useState, useEffect} from 'react'


import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import moment from 'moment'

import {Box, Grid, TextField, Typography, FormControl} from '@mui/material';


// TODO documentation https://momentjs.com/docs/#/displaying/difference/

function App() {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [repeatOn, setRepeatOn] = useState(1);
    const [repeats, setRepeats] = useState(1);
    const [repeatEvery, setRepeatEvery] = useState(1);

    const [countDates, setCountDays] = useState([]);

    const [includeThisWeek, setIncludeThisWeek] = useState(true);

    const myTimeFunc = (start = moment(), end = moment(), includeThisWeek) => {

        let dayOfTheWeek = start.day();
        let arr = [];

        // Get "next" monday
        let tmp = start.clone().day(Number(dayOfTheWeek)); // save in tmp start value


        if (includeThisWeek) {
            // Push start day to result array
            if (tmp.isSame(start, 'd')) {
                arr.push(tmp.format('YYYY-MM-DD'))
            }
        }

        if (tmp.isAfter(start, 'd')) {
            arr.push(tmp.format('YYYY-MM-DD'));
        }
        while (tmp.isBefore(end)) {
            tmp.add(7, 'days');
            arr.push(tmp.format('YYYY-MM-DD'));
        }
        // console.log("Function work", arr);

        setCountDays(arr)
    }


    useEffect(() => {
        myTimeFunc(startDate, endDate, includeThisWeek);

        const myDate = moment(startDate).clone() || moment();
        const myDate2 = moment(endDate).clone() || moment();

        // console.log("myDate", myDate.day(1)); // get the current date range 1 day of week
        // console.log("myDate2", myDate2.day(1)); // get the current date range 1 day of week

        // If I need a current day I can paste number with needed day to .day(1) method
        console.log("myDate", myDate.day()); // get the current date range number day of week
        console.log("myDate2", myDate2.day()); // get the current date range number day of week

        console.log("isAfter", myDate.isAfter(startDate, 'd'));
        console.log("isBefore", myDate.isBefore(endDate, 'd'));

        console.log(myDate.add(7, 'days')); // add 7 days to my time


    }, [startDate, endDate, includeThisWeek]);

    return (
        <Box component='form' sx={{width: "100%"}}>
            <Grid container direction="column" justifyContent={"center"} alignItems={"center"} columnSpacing={2}
                  rowSpacing={3}>

                <Grid item xs={12}>
                    <Typography align={'center'} component={"h1"}>Standing Order</Typography>
                </Grid>


                <Grid item xs={2}>

                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <FormControl fullWidth={true}>
                            <DatePicker
                                label="Start Date"
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={startDate}
                                onChange={(newValue) => {
                                    setStartDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />

                        </FormControl>
                    </LocalizationProvider>
                </Grid>


                <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <FormControl fullWidth={true}>
                            <DatePicker
                                label="End Date"
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={endDate}
                                onChange={(newValue) => {
                                    setEndDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />

                        </FormControl>
                    </LocalizationProvider>
                </Grid>

                <Grid item>
                    <TextField onChange={({target}) => setRepeatOn(target.value)} value={repeatOn} fullWidth
                               label="Repeat on (day of the week)"/>
                </Grid>

                <Grid item>
                    <TextField onChange={({target}) => setRepeats(target.value)} value={repeats} fullWidth
                               label="Repeats"/>
                </Grid>

                <Grid item>
                    <TextField onChange={({target}) => setRepeatEvery(target.value)} type={'number'} value={repeatEvery}
                               fullWidth label="Repeat Every"/>
                </Grid>

                <Grid item xs={2}>
                    <strong>Start Date:</strong> {moment(startDate).format('dddd, LL')}
                </Grid>

                <Grid item xs={2}>
                    <strong>End Date:</strong> {moment(endDate).format("dddd, LL")}
                </Grid>

                <Grid item xs={2}>
                    Repeat On : {repeatOn}
                </Grid>

                <Grid item xs={2}>
                    Repeats: {repeats}
                </Grid>


                <Grid item xs={2}>
                    Repeat Every : {repeatEvery}
                </Grid>


                <Grid item xs={2}>
                    DIfference in days : {moment(endDate).diff(moment(startDate), 'days')}
                </Grid>

                <Grid item xs={2}>
                    <label>
                        Include current day
                        <input checked={includeThisWeek} onChange={() => setIncludeThisWeek(!includeThisWeek)}
                               type='checkbox'/>
                    </label>

                    <br/>

                    Count dates (current day of week) : <br/>

                    {countDates.length === 1 ? (
                        <>{moment(countDates[0]).format("dddd, LL")}</>
                    ) : (
                        <div>
                            <br/>
                            {countDates.map((date, index) => {
                                return (
                                    <div key={index}>

                                        {moment(date).format("dddd, LL")}
                                        {/*{console.log(date)}*/}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </Grid>


            </Grid>
        </Box>
    );
}

export default App;
