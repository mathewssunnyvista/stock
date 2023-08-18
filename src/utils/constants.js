//Defines the various price options available in stock candle api
export const priceTypeOptions = [
  { value: "c", label: "Close" },
  { value: "h", label: "High" },
  { value: "l", label: "Low" },
  { value: "o", label: "Open" },
];

//Defines the various resolutions options available in stock candle api
export const resolutionOptions = [
  { value: 1, label: "Last 1 Days" },
  { value: 5, label: "Last 5 Days" },
  { value: 15, label: "Last 15 Days" },
  { value: 30, label: "Last 30 Days" },
  { value: 60, label: "Last 60 Days" },
  { value: "W", label: "Weekly" },
  { value: "M", label: "Monthly" },
  { value: "D", label: "Daily" },
];

export const date_format_day = "DD-MM";
export const date_format_month = "MM";
export const date_format_year = "YYYY";

export const exchange = "US";

export const stock_limit = 1000;
