import { isEmpty } from "lodash";
import { date_format_day, date_format_month } from "./constants";

import moment from "moment";

export const getUnixTimeStamp = (dateVal) => {
  return Math.floor(new Date(dateVal).getTime() / 1000);
};

export const getLabelFormat = (startDate, endDate, resolution) => {

  console.log(startDate);

  console.log(endDate);

  var now = moment(startDate); //todays date
  var end = moment(endDate); // another date
  var duration = moment.duration(now.diff(end));
  var days = duration.asDays();
  console.log(days);

  if (!isEmpty(resolution) && resolution.value === "M") {
    return date_format_month;
  }

  return date_format_day;
};
