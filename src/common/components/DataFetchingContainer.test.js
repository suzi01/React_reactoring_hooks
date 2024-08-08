import React from "react";
import DataFetchingContainer from "./DataFetchingContainer";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

process.env.REACT_APP_BASE_URL = "/test";

describe("DataFetchingContainer", () => {
  it("should have a combobox and Select component on page", () => {
    render(<DataFetchingContainer />);

    const selectLabel = screen.getByLabelText("Please, select a chart");
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(selectLabel).toBeInTheDocument();
  });

  it("should have display sales data", async () => {
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

    render(<DataFetchingContainer />);
    const selectBox = screen.getByRole("combobox", {
      name: /please, select a chart/i,
    });
    await userEvent.selectOptions(selectBox, "/test/sales/");

    await act(async () => {
      await userEvent.selectOptions(selectBox, "/test/sales/");
    });

    expect(screen.queryByText("There is no data")).not.toBeInTheDocument();
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

  it("shouldn't display sales data", async () => {
    const successMockData = {
      error: "",
      loading: false,
      dataCollected: [],
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

    render(<DataFetchingContainer />);
    const selectBox = screen.getByRole("combobox", {
      name: /please, select a chart/i,
    });
    userEvent.selectOptions(selectBox, "/test/sales/");

    await act(async () => {
      userEvent.selectOptions(selectBox, "/test/sales/");
    });

    expect(screen.queryByText("There is no data")).toBeInTheDocument();
  });
});
