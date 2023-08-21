import { date_format, date_format_day, date_format_month } from "./constants";

import moment from "moment";

export const getUnixTimeStamp = (dateVal) => {
  return Math.floor(new Date(dateVal).getTime() / 1000);
};

export const getLabelFormat = (startDate, endDate, resolution) => {
  var now = moment(startDate); //todays date
  var end = moment(endDate); // another date
  var duration = moment.duration(now.diff(end));
  var days = duration.asDays();

  if (resolution === "M") {
    return date_format_month;
  }
  if (days > -7 && resolution <= 5) {
    return date_format_day;
  }

  return date_format;
};
