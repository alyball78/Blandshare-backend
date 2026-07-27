import * as articleModel from "../models/article.model.js";
import AppError from "../errors/AppError.js";
import slugify from "slugify";

export const getAllArticles = async (isAdmin) => {
    const articles = await articleModel.findAll(isAdmin);
return articles;
};

export const getArticleById = async (id) => {
const article = await articleModel.getArticleById(id);
if (!article){
throw new AppError("Article introuvable", 404);
};
return article;
};

export const createArticle = async  (data) => {
    const slug = slugify(data.title, {lower: true, strict: true, locale:"fr"})
const article = await articleModel.create({...data, slug});
return article;
};

export const updateArticle =  async (id, data) => {
const article =  await articleModel.findById(id);
    if (!article) {
        throw new AppError("Article introuvable", 404);
    };

    
    const slug = slugify(data.title, { lower: true, strict: true, locale: "fr" })

const updatedArticle = await articleModel.update(id, {...data, slug});

    return updatedArticle;    
};

export const deleteArticle = async (id) => {
    const article = await articleModel.findById(id);
    if (!article) {
        throw new AppError("Article introuvable", 404);
    };
const isDeleted = await articleModel.remove(id);
if (!isDeleted){
    throw new AppError("impossible de supprimer l'article", 400)
};
return;
};

