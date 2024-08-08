import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SummaryContainer from "./SummaryContainer";

describe("SummaryContainer", () => {
  it("should display tiles and correct text", () => {
    const successMockData = {
      error: "",
      loading: false,
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

    render(<SummaryContainer />);
    expect(screen.getByText("CellFast sales")).toBeInTheDocument();
    expect(screen.getByText("$ 2304")).toBeInTheDocument();

    expect(screen.getByText("CellNow subscriptions")).toBeInTheDocument();

    expect(screen.getByText("$ 2235")).toBeInTheDocument();
  });
});
