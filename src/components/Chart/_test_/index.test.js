import { render, screen } from "@testing-library/react";
import Chart from "../index";
import { info_text, placeholder_text } from "../../../utils/constants";
test("renders placeholder section if the chart option is empty", () => {
  const chartOptions = {};
  const stockWithNoData = {};
  render(<Chart data={chartOptions} noDataItems={stockWithNoData} />);
  const linkElement = screen.getByText(new RegExp(placeholder_text, "i"));
  expect(linkElement).toBeInTheDocument();
});

test("renders info section if the stockWithNoData is not empty", async () => {
  const chartOptions = {};
  const dummyValue = "test";
  const dummyLabel = "test";
  const stockWithNoData = { value: dummyValue, label: dummyLabel };
  render(<Chart data={chartOptions} noDataItems={stockWithNoData} />);
  await screen.findByRole("p");
  expect(screen.getByRole("p")).toHaveTextContent(info_text);
});
