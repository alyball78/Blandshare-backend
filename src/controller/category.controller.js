import * as categoryService from "../services/category.service.js";
export const getAllCategories = async (req, res) => {
const categories = await categoryService.getAllCategories();
return res.json(categories);
}
export const getCategoryById = async (req, res) => {
    const {id} = req.params.id;   
const category =  await categoryService.getCategoryById(id);
return res.json(category);

};
export const createCategory = async (req, res) => {
const {name, slug} = req.body;
const category = await categoryService.createCategory(name, slug);
    return res.status(201).json(category);

};

export const updateCategory = async (req, res) => {
    const { id } = req.params.id;   
const updateCategory = await categoryService.updateCategory(id, data);
return res.json(category);
};
export const deleteCategory = async (req, res) => {
const {id} = req.params.id;
await categoryService.deleteCategory(id);
    return res.status(204).send();

};

