import React, { useContext, useEffect, useState } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { fetchStockSymbols } from "../../api";
import { StockSymbolContext } from "../../context";

const animatedComponents = makeAnimated();

export default function Stock() {
  const [stocks, setStocks] = useState([]);
  const { selectedOptions, setSelectedOptions } =
    useContext(StockSymbolContext);

  const getStockSymbols = async () => {
    try {
      const exchange = "US";
      let stockOptions = [];
      const stocks = await fetchStockSymbols(exchange);
      if (stocks) {
        stocks.map((item, index) => {
          if (index < 20) {
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
    <div class="row m-3">
      <div class="col-2">Search Stocks</div>
      <div class="col-10">
        <Select
          closeMenuOnSelect={false}
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
  );
}
