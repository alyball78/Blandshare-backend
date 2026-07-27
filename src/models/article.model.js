import pool from "../config/db.js";

export const findAll = async (includeDrafts) => {
    const sql = includeDrafts ? "SELECT * FROM articles" : "SELECT * FROM articles WHERE status = 'published'";
const [rows] = await pool.execute(sql);
return rows;
};

export const findById = async (id) => {
const [rows] = await pool.execute(
"SELECT * FROM articles where id = ?", [id]
);
return rows[0] ?? null;

};

export const create = async (data) => {
    const sql = "INSERT INTO articles (title, content, excerpt, cover_image_url, category_id, status, slug) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await pool.execute(sql, [data.title, data.content, data.excerpt, data.cover_image_url, data.category_id, data.status, data.slug]);
    return findById(result.insertId);
};

export const update = async (id, data) => {    
    const sql = "UPDATE articles SET title = ?, content = ?, excerpt = ?, cover_image_url = ?, category_id = ?, status = ?, slug = ? WHERE id = ?";
    const [result] = await pool.execute(sql, [data.title, data.content, data.excerpt, data.cover_image_url, data.category_id, data.status, data.slug, id]);
    return findById(id);
};

export const remove = async (id) => {
const sql = "DELETE FROM articles WHERE id = ?";
const [result] = await pool.execute(sql, [id]);
return result.affectedRows === 1;
};