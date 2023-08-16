import { basePath, token } from "../config";

import axios from "axios";

/**
 * Fetches the supported stocks
 * @param {string} exchange - Exchange codes, e.g. 'US'
 * @returns {Promise<Object>} Response object
 */
export const fetchStockSymbols = async (exchange) => {
  const url = `${basePath}/stock/symbol?exchange=${exchange}&token=${token}`;
  const data = await axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // Need to set error boundary
      console.log(error);
    });

  return data;
};

/**
 * Fetches the stocks prices including Open, High, Low, Close Prices
 * @param {string} stockSymbol - Symbol of the company, e.g. 'AAPL'
 * @param {string} from - The stock prices from provided timestamp , e.g. '1679476980'
 * @param {string} to - The stock prices till provided timestamp , e.g. '1679476980'
 * @returns {Promise<Object>} Response object
 */
 export const fetchStockCandles = async (stockSymbol, from, to) => {
  const url = `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=M&from=${from}&to=${to}&token=${token}`;
  const data = await axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // Need to set error boundary
      console.log(error);
    });

  return data;
};