import { render, screen } from "@testing-library/react";

import { Stock } from "../..";
import StockProvider from "../../../context/StockProvider";

jest.mock("../../../api", () => {
  const original = jest.requireActual("../../../api");
  const dummyStocks = [
    { value: "1", label: "dummyLabel1" },
    { value: "2", label: "dummyLabel2" },
  ];
  return {
    ...original,
    fetchStockSymbols: jest.fn().mockImplementation(() => Promise.resolve({ data: dummyStocks })),    
 
  };
});
describe("Stock/Index", () => {
  test("The home screen displays the default selection of the filers", async () => {
    const dummyItem = { value: "dummy", label: "dummyLabel" };

    const selectedOptions = dummyItem;
    const setSelectedOptions = jest.fn();
    const selectedPriceType = "o";
    const setSelectedPriceType = jest.fn();
    const setSelectedResolution = jest.fn();
    const selectedResolution = dummyItem;
    render(
      <StockProvider
        value={{
          selectedOptions,
          setSelectedOptions,
          selectedPriceType,
          setSelectedPriceType,
          selectedResolution,
          setSelectedResolution,
        }}
      >
        <Stock />
      </StockProvider>
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });
});
