import React, { useContext, useEffect, useState } from "react";

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
import { faker } from "@faker-js/faker";
import { StockSymbolContext } from "../../context";
import { fetchStockCandles } from "../../api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Time series of prices ",
    },
  },
};
const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Dataset 3",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function Chart() {
  const [chartOptions, setChartOptions] = useState([]);
  /// const [chartDataset, setChartDataset] = useState([]);
  // const [chartLabels, setChartLabels] = useState([]);
  const { selectedOptions } = useContext(StockSymbolContext);

  useEffect(() => {
    const getStockCandles = async (stockSymbol, from, to) => {
      try {
        let dataSetItemFound;
        let chartDatasets = [];
        console.log("chartOptions", chartOptions);
        if (chartOptions && chartOptions?.datasets) {
          console.log("chartOptions inside", chartOptions);
          chartDatasets = [...chartOptions?.datasets];
          dataSetItemFound = chartDatasets.find(
            (item) => item.label === stockSymbol.label
          );
        }

        const dataSetItem = dataSetItemFound
          ? dataSetItemFound
          : {
              label: stockSymbol.label,
              data: [],
              borderColor: faker.vehicle.color(),
              backgroundColor: faker.vehicle.color(),
            };

        // let chartLabels = [];
        const stockPrices = await fetchStockCandles(
          stockSymbol.value,
          from,
          to
        );

        console.log(stockPrices, "stockPrices");
        if (stockPrices?.s === "ok") {
          const labels = [...stockPrices.t];
          // setChartLabels(chartLabels);
          dataSetItem.data = [...stockPrices.c];
          console.log("dataSetItem", dataSetItem);
          console.log("dataSetItemFound", dataSetItemFound);
          console.log("chartDatasets", chartDatasets);
          if (dataSetItemFound === undefined) chartDatasets.push(dataSetItem);

          const datasets = [...chartDatasets];
          console.log("ooipoipi", datasets);
          //setChartDataset(chartDatasets);
          const chartOptions = {
            labels,
            datasets,
          };
          
          setChartOptions(chartOptions);
        }
        console.log("chartOptions", chartOptions);
        console.log("insideddd");
      } catch (error) {
        console.error(error);
      }
    };
    // const dataSets = [];
    let from = "1673476980";
    let to = "1679476980";
    if (selectedOptions && selectedOptions.length > 0) {
      selectedOptions.map((item) => {
        getStockCandles(item, from, to);
      });
    } else {
      setChartOptions([]);
    }
  }, [selectedOptions]);

  // useEffect(() => {
  //   let datasets = [...chartDataset];
  //   let labels = [...chartLabels];
  //   const chartOptions = {
  //     labels,
  //     datasets,
  //   };
  //   setChartOptions(chartOptions);
  // }, [chartDataset]);

  console.log(chartOptions, "chartOptions");
  console.log(selectedOptions, "selectedOptions");
  return (
    <div class="row">
      <div class="col-12">
        {chartOptions?.datasets?.length > 0 && (
          <Line options={options} data={chartOptions} />
        )}
      </div>
    </div>
  );
}
