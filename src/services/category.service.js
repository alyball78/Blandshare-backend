import * as CategoryModel  from "../models/category.model.js"; 
import AppError from "../errors/AppError.js";

export const getAllCategories = async () => {
    const categories = await CategoryModel.findAll();
return categories;
};

export const createCategory = async (name, slug) => {
    const category = await CategoryModel.create(name, slug);
return category;

};

export const updateCategory = async (id, name, slug) => {
const category = await     CategoryModel.findById(id);
if (!category) {
    throw new AppError("catégorie inexistante", 404);
}
const updateCategory = await categoryModel.update(name, slug, id);
return category;

};

export const deleteCategory = async (id) => {
    const category = await CategoryModel.findById(id);
    if (!category) {
        throw new AppError("catégorie inexistante", 404);
    }
    const deleteCategory = await categoryModel.remove(id);
    return result.affectedRows === 1;

};

