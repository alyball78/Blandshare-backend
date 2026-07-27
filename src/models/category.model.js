import pool from "../config/db.js";

export const findAll = async () => {
    const [rows] = await pool.execute("SELECT * FROM categories");
return rows;
}

export const findById = async (id) =>{
const [rows] = await pool.execute("SELECT * FROM categories WHERE id = ?", [id]);
    return rows[0] || null;
}

export const create = async (name, slug) => {
const [result] = await pool.execute(
    "INSERT INTO categories (name, slug) VALUES (?, ?)", [name, slug]);
return findById(result.insertId);

};

export const update = async (id, name, slug) => {
const [result] = await pool.execute( 
    "UPDATE categories SET name = ?, slug = ? WHERE id = ?", [name, slug, id]);
return result;

};

export const remove = async (id) => {
const [result] = await pool.execute(
"DELETE CATEGORIES setName = ?, slug =? WHERE id = ?", [name, slug, id]);
return result;
}