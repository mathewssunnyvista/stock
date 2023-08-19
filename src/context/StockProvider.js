import React, { useState } from "react";
import StockSymbolContext from "./stockSymbol";

const StockProvider = ({ children }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedPriceType, setSelectedPriceType] = useState("o");
  const [selectedResolution, setSelectedResolution] = useState({
    value: "D",
    label: "Daily",
  });

  return (
    <StockSymbolContext.Provider
      value={{
        selectedOptions,
        setSelectedOptions,
        selectedPriceType,
        setSelectedPriceType,
        selectedResolution,
        setSelectedResolution,
      }}
    >
      {children}
    </StockSymbolContext.Provider>
  );
};

export default StockProvider;
