import React, { Fragment, useContext, useEffect, useState } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { faker } from "@faker-js/faker";

import { fetchStockCandles, fetchStockSymbols } from "../../api";
import { StockSymbolContext } from "../../context";

import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";

import "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import { SelectButton } from "primereact/selectbutton";
import { Chart } from "..";
import moment from "moment";

const animatedComponents = makeAnimated();

//Defines the various price options available in stock candle api
const priceTypeOptions = [
  { value: "c", label: "Close" },
  { value: "h", label: "High" },
  { value: "l", label: "Low" },
  { value: "o", label: "Open" },
];


//Defines the various resolutions options available in stock candle api

const resolutions = [
  { value: 1, label: "Last 1 Days" },
  { value: 5, label: "Last 5 Days" },
  { value: 15, label: "Last 15 Days" },
  { value: 30, label: "Last 30 Days" },
  { value: 60, label: "Last 60 Days" },
  { value: "W", label: "Weekly" },
  { value: "M", label: "Monthly" },
  { value: "D", label: "Daily" },
];

let format_day = "DD-MM-YYYY";

export default function Stock() {
  const [stocks, setStocks] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState([]);
  const endDate = new Date();
  const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [value, onChange] = useState([startDate, endDate]);
  const { selectedOptions, setSelectedOptions } =
    useContext(StockSymbolContext);

  const { selectedPriceType, setSelectedPriceType } =
    useContext(StockSymbolContext);

  const getStockSymbols = async () => {
    try {
      const exchange = "US";
      let stockOptions = [];
      const stocks = await fetchStockSymbols(exchange);
      if (stocks) {
        stocks.map((item, index) => {
          if (index < 200) {
            //  need to check pagination options
            stockOptions.push({ value: item.symbol, label: item.description });
          }
        });
        setStocks(stockOptions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUnixTimeStamp = (dateVal) => {
    return Math.floor(new Date(dateVal).getTime() / 1000);
  };

  const handlePriceChange = (value) => {
    setSelectedPriceType(value);

    const chartOption = { ...chartOptions };
    if (chartOption.datasets) {
      chartOption.datasets.map((item) => {
        item.data = item.stockData[value];
      });
    }
    setChartOptions(chartOption);
  };

  const handleSelectChange = async (selectedStocks) => {
    // Setting multi select values
    setSelectedOptions(selectedStocks);

    // pop out the last element to process stock candle (price api)
    const selectedStock = selectedStocks[selectedStocks.length - 1];
    const chartDatas = [...chartData];
    if (selectedStock) {
      // If the stock is already added to the list need to update the data part only as rest can be kept as such
      let dataSetItemFound = chartDatas.find(
        (item) => item.label === selectedStock.label
      );

      const dataSetItem = dataSetItemFound
        ? dataSetItemFound
        : {
            label: selectedStock.label,
            borderColor: faker.vehicle.color(),
            backgroundColor: faker.vehicle.color(),
          };
      //Data range provided to the api should in unix time stamp
      const from = getUnixTimeStamp(value[0]);
      const to = getUnixTimeStamp(value[1]);
      const resolution = resolutions[0].value;
      const stockData = await fetchStockCandles(
        selectedStock.value,
        resolution,
        from,
        to
      );

      if (stockData?.s === "ok") {
        dataSetItem.stockData = stockData;
        dataSetItem.data = stockData[selectedPriceType];
        chartDatas.push(dataSetItem);
      }
      if (stockData?.s === "no_data") {
        //No need to send to chart as the stock doesnt have price details
        dataSetItem.stockData = [];
        dataSetItem.data = [];
      }

      setChartData(chartDatas);
      // This method will be parsing through api data which should be consumable to charts.
      formatChartData(chartDatas, selectedStocks);
    }
  };

  const formatChartData = (chartDatas, selectedStocks) => {
    // Need to align the chartdata with respect to current seletion of stocks
    const chartOption = { labels: [], datasets: [] };
    if (selectedStocks && chartDatas) {
      selectedStocks.map((selectedStock) => {
        let dataSetItemFound = chartDatas.find(
          (item) => item.label === selectedStock.label
        );
        if (dataSetItemFound) {
          if (dataSetItemFound?.stockData) {
            // Need to remove duplicate timestamp inorder to map to various values of stocks
            chartOption.labels = [
              ...new Set([
                ...dataSetItemFound?.stockData?.t,
                ...chartOption.labels,
              ]),
            ];
            //Based on the price type the prices need to be changed.
          }
          chartOption.datasets.push(dataSetItemFound);
        }
      });
      const chartLabels = [];
      chartOption.labels.sort();
      chartOption.labels.map((item) => {
        chartLabels.push(moment.unix(item).format(format_day));
      });
      chartOption.labels = chartLabels;
      setChartOptions(chartOption);
    }
  };

  useEffect(() => {
    getStockSymbols();
  }, []);

  return (
    <Fragment>
      <div class="row m-3">
        <div class="col-2">Stocks</div>
        <div class="col-4">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            isMulti
            value={selectedOptions}
            onChange={handleSelectChange}
            isOptionDisabled={() => selectedOptions.length >= 3}
            className="basic-multi-select"
            classNamePrefix="select"
            options={stocks}
          />
        </div>
      </div>
      <div class="row m-3">
        <div class="col-2">Date</div>
        <div class="col-4">
          <DateTimeRangePicker onChange={onChange} value={value} />
        </div>
      </div>

      <div class="row m-3">
        <div class="col-2">Price Type</div>
        <div class="col-4">
          <SelectButton
            value={selectedPriceType}
            onChange={(e) => handlePriceChange(e.value)}
            optionLabel="label"
            options={priceTypeOptions}
          />
        </div>
      </div>
      <Chart data={chartOptions} />
    </Fragment>
  );
}
