import * as articleServices from "../services/article.service.js";
export const getAllArticles = async (req, res) => {
    const articles = await articleServices.getAllArticles(req.user?.role === 'admin');
return res.json(articles);
};
export const getArticleById = async (req, res) => {
const {id} = req.params;
    const article = await articleServices.getArticleById(id);
    return res.json(article);
};

export const createArticle = async (req, res) => {
const data =  req.body;
const article = await articleServices.createArticle(data);
return res.json(article);
};

export const updateArticle = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updateArticle = await articleServices.updateArticle(id, data);
    return res.json(updateArticle);
};

export const deleteArticle = async (req, res) => {
    const { id } = req.params;
await articleServices.remove(id);
return res.status(204).send();
};

