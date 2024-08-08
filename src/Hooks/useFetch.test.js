import { renderHook } from "@testing-library/react-hooks";
import useFetch from "./useFetch";

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

describe("useFetch hook", () => {
  it("should return the initial object", async () => {
    const mockData = {
      dataCollected: [],
      subscriptionsTotal: 2304,
      salesTotal: 2235,
    };

    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(mockData),
      };
      return Promise.resolve(fetchResponse);
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch({ endpoint: "/api/sales/" })
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockData);
  });

  it("should return the successMockData", async () => {
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

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch({ endpoint: "/api/sales/" })
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual(successMockData);
  });

  it("should return an error", async () => {
    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      const fetchResponse = {
        ok: false,
        statusText: "500 Server error",
      };
      return Promise.resolve(fetchResponse);
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch({ endpoint: "/api/sales/" })
    );

    await waitForNextUpdate();

    expect(result.current.data.dataCollected).toEqual([]);
    expect(result.current.error.message).toEqual("500 Server error");
  });
});
