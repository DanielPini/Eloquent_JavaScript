"use strict";
/**
 * Security camera near lab
 * Activated by motion sensor
 * Connected to the network
 * Sends out video when active
 *
 * System set up which notices wireless traffic and turns on a light whenever there is outside activity
 *
 * Times when camera is tripped have been logged and need to be sued to visualise which times in an average week are quiet and which are busy.
 * Log is stored in filesholding one timeStamp number per line --> As returned by Date.now()
 *
 * "camera_logs.txt" holds logfiels
 * Write async function activityTable(day) that returns an array of 24 numbers, one for each hour of the day
 * That should hold the number of camera network trffic observations seen in that hour of the day.
 * Days are identified by number usering the Date.getDay, where Sunday is 0 and Saturday is 6
 * ActivityGraph function summarises such a table into a string
 *
 */
function readText(filename) {
    return new Promise((res, rej) => {
        readTextFile(filename, (text, error) => {
            if (error)
                rej(error);
            else
                res(text);
        });
    });
}
async function generateFakeTimestamps() {
    return new Promise((res) => {
        let stamps = "";
        for (let i = 0; i < 500; i++) {
            const timestamp = Math.floor(Math.random() * 9936000000 + 1363179600000);
            stamps += `${timestamp.toString()}\n`;
        }
        res(stamps);
    });
}
const activityTable = async (day) => {
    let dataArray = new Array(24).fill(0);
    await generateFakeTimestamps()
        .then((text) => text.match(/\d+/g))
        .then((timestamps) => {
        if (!timestamps)
            return;
        timestamps.forEach((timestamp) => {
            const date = new Date(Number(timestamp));
            if (date.getDay() !== day)
                return;
            const dateHour = date.getHours();
            dataArray[dateHour] = dataArray[dateHour] + 1;
        });
        console.log(dataArray);
    })
        .catch((e) => {
        throw new Error(e);
    });
};
activityTable(0);
