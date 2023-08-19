import React from "react";
import { Logo, Dashboard } from "./components";
import { StockSymbolContext } from "./context";

function App() {
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [selectedPriceType, setSelectedPriceType] = React.useState("o");
  const [selectedResolution, setSelectedResolution] = React.useState({
    value: "D",
    label: "Daily",
  });

  return (
    <div className="container">
      <nav className="navbar navbar-light bg-light shadow-sm">
        <Logo />
      </nav>

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
        <Dashboard />
      </StockSymbolContext.Provider>
    </div>
  );
}

export default App;
