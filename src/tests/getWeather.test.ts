import { getWeather } from "../api/getWeather";

describe("getWeather", () => {
    it("fetches weather data for a given city", async () => {
        const city = "Boston";

        // Mock the fetch function
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () =>
                Promise.resolve({
                    cod: "200",
                }),
        });

        const weatherData = await getWeather(city);

        // Verify that the fetch function was called with the correct URL
        expect(fetch).toHaveBeenCalledWith(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
        );

        expect(weatherData.cod).toBe("200");
    });

    it("throws an error when the API response is not successful", async () => {
        const city = "Incorrect city";

        (global.fetch as jest.Mock) = jest.fn(() =>
            Promise.resolve({
                ok: false,
            })
        );

        // expect it to throw an error
        await expect(getWeather(city)).rejects.toThrow("Failed to fetch weather data");
    });
});
