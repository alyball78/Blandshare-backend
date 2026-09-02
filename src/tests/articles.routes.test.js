import { jest } from "@jest/globals";
import request from "supertest";

const mockGetAllArticles = jest.fn();

jest.unstable_mockModule("../services/article.service.js", () => ({
  getAllArticles: mockGetAllArticles,
}));

const { default: app } = await import("../app.js");

describe("GET /api/articles", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("doit retourner la liste des articles avec le statut 200", async () => {
    const articles = [
      {
        id: 1,
        title: "Premier article",
        slug: "premier-article",
      },
      {
        id: 2,
        title: "Deuxième article",
        slug: "deuxieme-article",
      },
    ];

    mockGetAllArticles.mockResolvedValue(articles);

    const response = await request(app).get("/api/articles");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(articles);

    expect(mockGetAllArticles).toHaveBeenCalledWith(false, false);
  });
});
