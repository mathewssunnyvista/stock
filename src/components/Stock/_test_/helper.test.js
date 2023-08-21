import { getChartLabels } from "../helper";

describe("Stock/Helper", () => {
  test("The home screen displays the default selection of the filers", async () => {
    const endDate = new Date("2023-08-21");
    const startDate = new Date("2023-08-14");

    const chartOptions = {
      labels: [1691971200, 1692057600, 1692144000, 1692230400, 1692316800],
    };
    const resolution = { value: "D", label: "Daily" };

    const result = getChartLabels(chartOptions, startDate, endDate, resolution);
    const expectedData = ["14-08", "15-08", "16-08", "17-08", "18-08"];
    expect(result).toStrictEqual(expectedData);
  });
});
