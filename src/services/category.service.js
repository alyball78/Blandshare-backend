import * as CategoryModel from "../models/category.model.js";
import AppError from "../errors/AppError.js";
import slugify from "slugify";

export const getAllCategories = async () => {
  const categories = await CategoryModel.findAll();
  return categories;
};

export const createCategory = async (name) => {
  const slug = slugify(name, {
    lower: true,
    strict: true,
    locale: "fr",
  });

  const category = await CategoryModel.create(name, slug);
  return category;
};

export const updateCategory = async (id, name, slug) => {
  const category = await CategoryModel.findById(id);
  if (!category) {
    throw new AppError("catégorie inexistante", 404);
  }
  const updateCategory = await CategoryModel.update(name, slug, id);
  return category;
};

export const deleteCategory = async (id) => {
  const category = await CategoryModel.findById(id);
  if (!category) {
    throw new AppError("catégorie inexistante", 404);
  }
  const result = await CategoryModel.remove(id);
  return result.affectedRows === 1;
};
