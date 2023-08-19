import React, { Fragment } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { reactChartOptions } from "../../utils/constants";
import Placeholder from "./placeholder";
import Info from "./info";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart(props) {
  const { data, noDataItems } = props;
  return (
    <Fragment>
      <div class="row">
        <div class="col-12" data-test-id="chart">
          {data?.datasets ? (
            <Fragment>
              <Line options={reactChartOptions} data={data} />
              <Info items={noDataItems} />
            </Fragment>
          ) : (
            <Placeholder />
          )}
        </div>
      </div>
    </Fragment>
  );
}
