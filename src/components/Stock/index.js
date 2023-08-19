import React, { Fragment, useContext, useEffect, useState } from "react";

import { faker } from "@faker-js/faker";

import {
  fetchStockCandle,
  fetchStockCandles,
  fetchStockSymbols,
} from "../../api";

import { StockSymbolContext } from "../../context";

import { isEmpty } from "lodash";

import { Chart } from "..";
import moment from "moment";
import {
  exchange,
  stock_limit,
} from "../../utils/constants";

import { getLabelFormat, getUnixTimeStamp } from "../../utils";
import PriceType from "./priceType";
import Resolutions from "./resolutions";
import DateFilter from "./dateFilter";
import SelectStocks from "./selectStocks";

export default function Stock() {
  const [isLoading, setIsLoading] = useState(false);
  const [stockWithNoData, setStockWithNoData] = useState([]);
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

  const { selectedResolution, setSelectedResolution } =
    useContext(StockSymbolContext);

  /**
   * Updates the stock price data whenever resolution, date gets changed
   * Need to update the price of already plotted stock details.
   * Multiple stocks are updated in a single API call
   *
   * @returns null
   */

  const updateNoStockData = async () => {
    const stockSelected = [...selectedOptions];
    let stockWithNoDatas = [...stockWithNoData];
    if (!isEmpty(stockSelected)) {
      stockWithNoDatas = stockWithNoDatas.filter((noDataItem) =>
        stockSelected.find((item) => noDataItem.value === item.value)
      );
      setStockWithNoData(stockWithNoDatas);
    } else {
      setStockWithNoData([]);
    }
  };

  /**
   * Updates the stock price data whenever resolution, date gets changed
   * Need to update the price of already plotted stock details.
   * Multiple stocks are updated in a single API call
   *
   * @returns null
   */

  const updateStockData = async () => {
    const stockSelected = [...selectedOptions];
    if (!isEmpty(stockSelected)) {
      const from = getUnixTimeStamp(value[0]);
      const to = getUnixTimeStamp(value[1]);

      const stockData = await fetchStockPrices(
        stockSelected,
        from,
        to,
        selectedResolution.value
      );

      if (!isEmpty(stockData)) {
        stockData.map((stockItem, index) => {
          setStockChartItem(stockItem, stockSelected[index]);
        });
      }
    }
    updateNoStockData();
  };
  /**
   * Handles the change in price type (High, Low, Close,Open price)
   * @param {string} priceType - Object of Price Type Stocks of the company, e.g. {value:'h', Label:'High'}
   * This methods invoked when price type filter is changed
   * The y axis values are replaced from temporary attribute from dataset.
   * @returns null
   */

  const handlePriceChange = (priceType) => {
    setSelectedPriceType(priceType.value);

    const chartOption = { ...chartOptions };
    if (!isEmpty(chartOption?.datasets)) {
      chartOption.datasets.map((item) => {
        item.data = item.stockData[priceType.value];
      });
    }
    setChartOptions(chartOption);
  };

  /**
   * Handles the change in date filter (time range)
   * @param {string} value -time object including start date and end date
   * This methods invoked when date range picker filter is changed
   * @returns null
   */

  const handleDateChange = async (value) => {
    onChange(value);
  };
  /**
   * Handles the change in resolution filter (timeframes)
   * @param {string} resolution -timeframes , e.g. {1, 5, 15, 30, 60, D, W, M}
   * This methods invoked when resolution filter is changed
   * @returns null
   */

  const handleResolutonChange = async (resolution) => {
    setSelectedResolution(resolution);
  };

  /**
   * Format Stock Chart Items to match react chart 2 format
   *
   * Each stock chart items are added to datasets in which data is plotted against y-axis
   * The timestamp of different stock prices are grouped, sorted and formated plotted against x axis.
   *
   * @returns {<Object>} Chart object with labels and datasets
   */

  const formatChartData = () => {
    const chartDatas = [...chartData];
    const selectedStocks = [...selectedOptions];
    // Need to align the chartdata with respect to current seletion of stocks
    let chartOption = {};
    if (!isEmpty(selectedStocks) && !isEmpty(chartDatas)) {
      chartOption = { labels: [], datasets: [] };
      selectedStocks.map((selectedStock) => {
        let dataSetItemFound = chartDatas.find(
          (item) => item.label === selectedStock.label
        );
        if (dataSetItemFound) {
          if (dataSetItemFound?.stockData) {
            // Timestamp need to be grouped without duplicates.
            chartOption.labels = [
              ...new Set([
                ...dataSetItemFound?.stockData?.t,
                ...chartOption.labels,
              ]),
            ];
          }
          chartOption.datasets.push(dataSetItemFound);
        }
      });
      //Need to check the possibilty of apply same behaviour to all array elements without looping.
      const chartLabels = [];
      if (!isEmpty(chartOption?.labels)) {
        const format = getLabelFormat(
          value[0],
          value[1],
          selectedResolution?.value
        );
        chartOption.labels.sort();
        chartOption.labels.map((item) => {
          chartLabels.push(moment.unix(item).format(format));
        });
        chartOption.labels = chartLabels;
      }
    }
    setChartOptions(chartOption);
  };

  /**
   * fetch Stock Prices
   * @param {string} selectedStock - Object of Symbol Stocks of the company, e.g. {value:'AAPL', Label:'APPLE'}
   * @param {string} from - Prices from StartDate provided as unixtimestamp, e.g. 1690925486
   * @param {string} to - Prices till StartDate provided as unixtimestamp, e.g. 1690925486
   * @param {string} resolution - timeframes , e.g. {1, 5, 15, 30, 60, D, W, M}
   *
   * API is consumed in single / multple call based on stockSelection.
   * Single call is used to update multple stock values already plotted in chart.
   * @returns {Promise<Object>} Response object
   */

  const fetchStockPrices = async (stockSelected, from, to, resolution) => {
    const stockData = Array.isArray(stockSelected)
      ? await fetchStockCandles(stockSelected, resolution, from, to)
      : await fetchStockCandle(stockSelected.value, resolution, from, to);
    return stockData;
  };

  /**
   * Stock data are processed to react chart 2 format
   * @param {string} stockData - Object of Stocks Prices including close, high, low and open attributes
   * @param {string} selectedStock - Object of Symbol Stocks of the company, e.g. {value:'AAPL', Label:'APPLE'}
   * The selected stocks attributes with random color and its price is added as a chart item
   * All price type amounts are saved in a temporary attribute to process later based on price type changes.
   *
   * @returns null
   */

  const setStockChartItem = (stockData, selectedStock) => {
    const chartDatas = [...chartData];
    const stockWithNoDatas = [...stockWithNoData];

    if (selectedStock) {
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

      if (stockData?.s === "ok") {
        dataSetItem.stockData = stockData;
        dataSetItem.data = stockData[selectedPriceType];
        chartDatas.push(dataSetItem);
      }
      if (stockData?.s === "no_data") {
        //No need to send to chart as the stock doesnt have price details
        const found = stockWithNoDatas.some(
          (item) => item.value === selectedStock.value
        );
        if (!found) stockWithNoDatas.push(selectedStock);

        dataSetItem.stockData = [];
        dataSetItem.data = [];
      }
      setChartData(chartDatas);
      formatChartData(chartDatas, selectedOptions);
      setStockWithNoData(stockWithNoDatas);
    }
  };

  /**
   * Fetches stock prices based on  stock selections
   * This methods invked whenever selected stocks changes.
   * Based on recent selection its stock price is consumed to set chart items.
   * @returns null
   */

  const fetchSelectedStockPrice = async () => {
    const selectedStocks = [...selectedOptions];
    if (!isEmpty(selectedStocks)) {
      const selectedStock = selectedStocks[selectedStocks.length - 1];

      const from = getUnixTimeStamp(value[0]);
      const to = getUnixTimeStamp(value[1]);
      const resolution = selectedResolution.value;

      const stockData = await fetchStockPrices(
        selectedStock,
        from,
        to,
        resolution
      );
      setStockChartItem(stockData, selectedStock);
    } else {
      setChartOptions({});
    }
  };

  /**
   * Handles the change in select filter
   * @param {string} selectedStocks - Object of Symbol Stocks of the company, e.g. {value:'AAPL', Label:'APPLE'}
   * This methods invked when select filter is changed and stock gets selected on multi select.
   * @returns null
   */

  const handleSelectChange = async (selectedStocks) => {
    setSelectedOptions(selectedStocks);
  };

  /**
   * Fetches stocks  sysmbols
   * This methods invokes on page load and populate the select filter.
   * @returns null
   */
  const getStockSymbols = async () => {
    try {
      setIsLoading(true);
      const stockOptions = [];
      const stocks = await fetchStockSymbols(exchange);
      if (!isEmpty(stocks)) {
        stocks.map((item, index) => {
          if (index < stock_limit) {
            //  Need to refactor this part in-order to load the option asyncronously the options
            //  Now the stocks from api is limited as there api doesnt support batch calls
            stockOptions.push({ value: item.symbol, label: item.description });
          }
        });
        setIsLoading(false);
        setStocks(stockOptions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStockSymbols();
  }, []);

  useEffect(() => {
    fetchSelectedStockPrice();
  }, [selectedOptions]);

  useEffect(() => {
    updateStockData();
  }, [value, selectedResolution]);

  useEffect(() => {
    formatChartData();
  }, [chartData]);

  return (
    <Fragment>
      <SelectStocks
        value={selectedOptions}
        isLoading={isLoading}
        onChange={handleSelectChange}
        options={stocks}
      />
      <DateFilter onChange={handleDateChange} value={value} />
      <Resolutions
        value={selectedResolution}
        onChange={handleResolutonChange}
      />
      <PriceType value={selectedPriceType} onChange={handlePriceChange} />
      <Chart data={chartOptions} noDataItems={stockWithNoData} />
    </Fragment>
  );
}
