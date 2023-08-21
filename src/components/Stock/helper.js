import { isEmpty } from "lodash";
import { getLabelFormat } from "../../utils";

import moment from "moment";
//Need to check the possibilty of apply same behaviour to all array elements without looping.

/**
 * Handles the labels of chart
 * @param {Object} chartOption - Data for react chart
 * @param {DateObeject} startDate -time object including start date and end date
 * @param {DateObeject} endDate -time object including start date and end date
 * @param {Object} resoluton -resolution object
 * This methods invoked sort and make the timestamp units to human readable time forma based on resolution.
 * @returns null
 */
export const getChartLabels = (chartOption, startDate, endDate, resoluton) => {
  const chartLabels = [];
  if (!isEmpty(chartOption?.labels)) {
    const format = getLabelFormat(startDate, endDate, resoluton?.value);
    chartOption.labels.sort();
    chartOption.labels.map((item) => {
      chartLabels.push(moment.unix(item).format(format));
    });
  }
  return chartLabels;
};
