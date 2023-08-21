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
  const { data } = props;
  return (
    <Fragment>
      <div className="row">
        <div className="col-12" data-test-id="chart">
          {data?.datasets ? (
            <Fragment>
              <Line options={reactChartOptions} data={data} />
            </Fragment>
          ) : (
            <Placeholder />
          )}
        </div>
      </div>
    </Fragment>
  );
}
