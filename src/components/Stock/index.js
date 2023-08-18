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

const animatedComponents = makeAnimated();

const priceTypeOptions = [
  { value: "c", label: "Close" },
  { value: "h", label: "High" },
  { value: "l", label: "Low" },
  { value: "o", label: "Open" },
];

export default function Stock() {
  const [stocks, setStocks] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState([]);
  const [value, onChange] = useState([new Date(), new Date()]);
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
      const stockData = await fetchStockCandles(selectedStock.value, from, to);

      if (stockData?.s === "ok") {
        dataSetItem.stockData = stockData;
        dataSetItem.data = stockData[selectedPriceType];
      }
      if (stockData?.s === "no_data") {
        dataSetItem.stockData = [];
        dataSetItem.data = [];
      }

      chartDatas.push(dataSetItem);
      setChartData(chartDatas);
      // This method will be parsing through api data which should be consumable to charts.
      formatChartData(chartDatas, selectedStocks);
    }
  };

  const formatChartData = (chartDatas, selectedStocks) => {
    // Need to align the chartdata with respect to current seletion of stocks
    const chartOption = { labels: [], dataset: [] };
    if (selectedStocks && chartDatas) {
      selectedStocks.map((selectedStock) => {
        let dataSetItemFound = chartDatas.find(
          (item) => item.label === selectedStock.label
        );
        if (dataSetItemFound) {
          console.log(dataSetItemFound, "ddddd");
          if (dataSetItemFound?.stockData) {
            console.log(dataSetItemFound?.stockData?.t);
            // Need to remove duplicate timestamp inorder to map to various values of stocks
            chartOption.labels = [
              ...new Set([
                ...dataSetItemFound?.stockData?.t,
                ...chartOption.labels,
              ]),
            ];
            //Based on the price type the prices need to be changed.
          }
          chartOption.dataset.push(dataSetItemFound);
        }
      });
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
            // onChange={(o) => setSelectedOptions(o)}
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
            onChange={(e) => setSelectedPriceType(e.value)}
            optionLabel="label"
            options={priceTypeOptions}
          />
        </div>
      </div>
      <Chart data={chartOptions} />
    </Fragment>
  );
}
