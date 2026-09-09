const request = require("supertest");
const app = require("./server");

describe("Doctor Service API", () => {

  test("GET / should return service status", async () => {
    const response = await request(app)
      .get("/");

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Doctor Service Running - CI/CD v2");
  });

  test("GET /api/doctors should return doctors", async () => {
    const response = await request(app)
      .get("/api/doctors");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);

    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("specialization");
  });

});