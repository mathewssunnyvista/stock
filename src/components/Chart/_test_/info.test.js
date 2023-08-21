import { render, screen } from "@testing-library/react";
import { info_text } from "../../../utils/constants";
import Info from "../info";

test("renders info section if the stocks with no data is provided", () => {
  const StockWithNoData = [{ value: "dummy", label: "dummyLabel" }];
  const expectedData = `"${StockWithNoData[0].label}" ${info_text}`;
  render(<Info items={StockWithNoData} />);
  const linkElement = screen.getByText(new RegExp(expectedData, "i"));
  expect(linkElement).toBeInTheDocument();
});
