import React, { Fragment, useContext, useEffect, useState } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { fetchStockSymbols } from "../../api";
import { StockSymbolContext } from "../../context";

import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";

import "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import { SelectButton } from "primereact/selectbutton";

const animatedComponents = makeAnimated();

const priceTypeOptions = [
  { value: "c", label: "Close" },
  { value: "h", label: "High" },
  { value: "l", label: "Low" },
  { value: "o", label: "Open" },
];

export default function Stock() {
  const [stocks, setStocks] = useState([]);
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
          if (index < 50) {
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
            onChange={(o) => setSelectedOptions(o)}
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
    </Fragment>
  );
}
