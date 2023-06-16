import { getCityImage } from "../api/getCityImage";

describe("getCityImage", () => {

    it("fetches city image for a given city", async () => {
        const city = "New York";

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ results: [{ urls: '', user: '' }] })
        })

        // Call the getCityImage function
        const cityImage = await getCityImage(city);

        expect(fetch).toHaveBeenCalledWith(
            `https://api.unsplash.com/search/photos?query=${city}&client_id=${process.env.REACT_APP_IMAGES_API_KEY}`
        );

        // Verify that the returned city image is not null or undefined
        expect(cityImage).toBeDefined();
    });

    it("throws an error when the API response is not successfull", async () => {
        const city = "Incorrect city";

        (global.fetch as jest.Mock) = jest.fn(() =>
            Promise.resolve({
                ok: false,
            })
        );

        // expect it to throw an error
        await expect(getCityImage(city)).rejects.toThrow("Failed to fetch city image");
    })

});
