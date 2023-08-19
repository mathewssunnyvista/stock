import { fireEvent, render, screen } from "@testing-library/react";

import { Stock } from "../..";
import StockProvider from "../../../context/StockProvider";
// test('loads items eventually', async () => {
//   render(<Stock />)

//   // Click button
//   fireEvent.click(screen.getByText('Load'))

//   // Wait for page to update with query text
//   const items = await screen.findAllByText(/Item #[0-9]: /)
//   expect(items).toHaveLength(10)
// })

describe("Stock/Index", () => {
  test("App displays employee name properly", () => {
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
