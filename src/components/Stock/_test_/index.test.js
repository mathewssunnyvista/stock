import { fireEvent, render, screen } from "@testing-library/react";

import { Stock } from "../..";
import StockProvider from "../../../context/StockProvider";
import selectEvent from "react-select-event";
import userEvent from "@testing-library/user-event";

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
