import DataFetching from "./DataFetching";
import React from "react";
import { render, screen, act } from "@testing-library/react";

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});
describe("Data Fetching", () => {
  it("should successfully display data", async () => {
    const successMockData = {
      error: "",
      loading: false,
      dataCollected: [
        { timestamp: "2020-07-04T04:30:41.000Z", amount: 357 },
        { timestamp: "2020-07-04T16:30:41.000Z", amount: 356 },
        { timestamp: "2020-07-05T16:30:41.000Z", amount: 364 },
      ],
      subscriptionsTotal: 2304,
      salesTotal: 2235,
    };

    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(successMockData),
      };
      return Promise.resolve(fetchResponse);
    });

    await act(async () => {
      render(<DataFetching endpoint={"/api/sales"} />);
    });

    expect(
      screen.getByText("2020-07-04T04:30:41.000Z - 357")
    ).toBeInTheDocument();
    expect(
      screen.getByText("2020-07-04T16:30:41.000Z - 356")
    ).toBeInTheDocument();
    expect(
      screen.getByText("2020-07-05T16:30:41.000Z - 364")
    ).toBeInTheDocument();
  });

  it("should display no data", async () => {
    const noMockData = {
      dataCollected: [],
      subscriptionsTotal: 2304,
      salesTotal: 2235,
    };

    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(noMockData),
      };
      return Promise.resolve(fetchResponse);
    });

    await act(async () => {
      render(<DataFetching endpoint={"/api/sales"} />);
    });

    expect(screen.getByText("There is no data")).toBeInTheDocument();
    expect(screen.queryByText("Error: ")).not.toBeInTheDocument();
  });

  it("should successfully display error message", async () => {
    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.reject(new Error("Failed to fetch"));
    });

    await act(async () => {
      render(<DataFetching endpoint={"/api/sales"} />);
    });

    expect(screen.getByText("There is no data")).toBeInTheDocument();
    expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
  });
});
