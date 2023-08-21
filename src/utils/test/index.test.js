
import { getLabelFormat } from "..";
import { date_format, date_format_day, date_format_month } from "../constants";

describe("Utils", () => {
  describe("getLabelFormat", () => {
    const endDate = new Date("2023-08-21");
    const startDateWithinWeek = new Date("2023-08-15");
    const startDateAfterWeek = new Date("2023-08-10");

    test("The return the day format if the date difference is less than a week and resolution is less than 5", async () => {
      const resolution = { value: "1", label: "Last 1 Day" };
      const expectedData = date_format_day;
      const result = getLabelFormat(startDateWithinWeek, endDate, resolution.value);
      expect(result).toBe(expectedData);
    });

    test("The return the day format if the date difference is less than a week and resolution is greater than 5", async () => {
      const resolution = { value: "60", label: "Last 60 Day" };
      const expectedData = date_format;
      const result = getLabelFormat(startDateWithinWeek, endDate, resolution.value);
      expect(result).toBe(expectedData);
    });
    test("The return the moonth format resolution is selected as monthly", async () => {
      const resolution = { value: "M", label: "Monthly" };
      const expectedData = date_format_month;
      const result = getLabelFormat(startDateAfterWeek, endDate, resolution.value);
      expect(result).toBe(expectedData);
    });
  });

});
