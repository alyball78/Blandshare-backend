import { jest } from "@jest/globals";

const mockFindById = jest.fn();

jest.unstable_mockModule("../models/article.model.js", () => ({
  findById: mockFindById,
}));

const { getArticleById } = await import("../services/article.service.js");

describe("Article Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("doit retourner un article lorsqu’il existe", async () => {
    const article = {
      id: 1,
      title: "Mon premier article",
      slug: "mon-premier-article",
    };

    mockFindById.mockResolvedValue(article);

    const result = await getArticleById(1);

    expect(result).toEqual(article);
    expect(mockFindById).toHaveBeenCalledWith(1);
  });
});
test("doit retourner une erreur 404 si l’article n’existe pas", async () => {
  mockFindById.mockResolvedValue(null);

  await expect(getArticleById(999)).rejects.toMatchObject({
    message: "Article introuvable",
    status: 404,
  });

  expect(mockFindById).toHaveBeenCalledWith(999);
});