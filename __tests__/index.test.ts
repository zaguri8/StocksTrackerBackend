import request from "supertest";
import app from "../app";

describe("Test", () => {
  it("should return correct price action length", async () => {
    const testRequest = await request(app)
      .get("/stock_info/IBM?start_date=2024-01-22&end_date=2024-01-25")
      .send();
    expect(testRequest.body.stockData.results.length).toEqual(4);
  });
});
