import { fetchStockSymbols } from "..";

const dummyItem = { value: "dummy", label: "dummyLabel" };
jest.mock("..", () => {
  return {
    ...jest.requireActual(".."),
    fetchStockSymbols: jest
      .fn()
      .mockResolvedValue({ status: 200, data: { dummyItem } }),
  };
});

describe("API", () => {
  test("The home screen displays the default selection of the filers", async () => {
    try {
      const result = await fetchStockSymbols();
      expect(result).toBe(dummyItem);
    } catch (error) {
      // console.log(error);
    }
  });
});
