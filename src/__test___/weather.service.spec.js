import { describe, test, expect, vi, assert } from "vitest";
import { createCoordinatesURL, fetchGridData } from "@/weather.service";

global.fetch = vi.fn();

function createMockResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe("Coordinates API", () => {
  test("Coordinates should default to Atlanta", () => {
    expect(createCoordinatesURL()).toBeDefined();
    assert.isString(createCoordinatesURL(), "return is a string");
    assert.strictEqual(
      createCoordinatesURL({}),
      "https://api.weather.gov/points/33.7508,-84.389854"
    );
    assert.strictEqual(
      createCoordinatesURL({ longitude: undefined, latitude: undefined }),
      "https://api.weather.gov/points/33.7508,-84.389854"
    );
    assert.strictEqual(
      createCoordinatesURL({ longitude: 0, latitude: undefined }),
      "https://api.weather.gov/points/33.7508,-84.389854"
    );

    assert.strictEqual(
      createCoordinatesURL({ longitude: 0, latitude: 0 }),
      "https://api.weather.gov/points/33.7508,-84.389854"
    );
  });

  test("Coordinates should be formatted into URL (Intended behavior)", () => {
    assert.strictEqual(
      createCoordinatesURL({ longitude: -97.0892, latitude: 39.7456 }),
      "https://api.weather.gov/points/39.7456,-97.0892"
    );
  });
});

// Tutorial: https://runthatline.com/how-to-mock-fetch-api-with-vitest/

describe("Weather Service", () => {
  test("makes a GET request to fetch forecast data URLs by grid points", async () => {
    const weatherAPIResponse = {
      properties: {
        "@id": "https://api.weather.gov/points/39.7456,-97.0892",
        "@type": "wx:Point",
        cwa: "FFC",
        forecastOffice: "https://api.weather.gov/offices/ABC",
        gridId: "FFC",
        gridX: 51,
        gridY: 87,
        forecast: "https://api.weather.gov/gridpoints/FFC/51,87/forecast",
        forecastHourly:
          "https://api.weather.gov/gridpoints/FFC/51,87/forecast/hourly",
        forecastGridData: "https://api.weather.gov/gridpoints/FFC/51,87",
      },
    };

    console.log(weatherAPIResponse.properties.forecast);

    fetch.mockResolvedValue(createMockResponse(weatherAPIResponse));

    const weatherData = await fetchGridData({
      longitude: -97.0892,
      latitude: 39.7456,
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.weather.gov/points/39.7456,-97.0892",
      {
        headers: {
          accept: "application/geo+json",
          "user-agent": "chic-swan-8ad817.netlify.app",
        },
      }
    );

    expect(weatherData).toStrictEqual([weatherAPIResponse.properties.forecast, weatherAPIResponse.properties.forecastHourly]);
  });
});
