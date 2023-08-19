import { render, screen } from "@testing-library/react";
import Chart from "../index";
import { placeholder_text } from "../../../utils/constants";
test("renders placeholder section if the chart option is empty", () => {
  const chartOptions = {};
  const stockWithNoData = {};
  render(<Chart data={chartOptions} noDataItems={stockWithNoData} />);
  const linkElement = screen.getByText(new RegExp(placeholder_text, "i"));
  expect(linkElement).toBeInTheDocument();
});

