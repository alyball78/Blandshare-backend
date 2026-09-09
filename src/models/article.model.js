import pool from "../config/db.js";

export const findAll = async (includeDrafts, limit) => {
  let sql = includeDrafts
    ? "SELECT articles.*, categories.name AS category_name FROM articles JOIN categories ON articles.category_id = categories.id"
    : "SELECT articles.*, categories.name AS category_name FROM articles JOIN categories ON articles.category_id = categories.id WHERE status = 'published'";
  sql += " ORDER BY created_at DESC";
  if (limit) {
    sql += " LIMIT 4";
  }
  const [rows] = await pool.execute(sql);
  return rows;
};

export const findById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT articles.*, categories.name AS category_name FROM articles JOIN categories ON articles.category_id = categories.id WHERE articles.id = ?",
    [id],
  );
  return rows[0] ?? null;
};

export const create = async (data) => {
  const sql =
    "INSERT INTO articles (title, content, excerpt, cover_image_url, category_id, status, slug) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const [result] = await pool.execute(sql, [
    data.title,
    data.content,
    data.excerpt,
    data.cover_image_url,
    data.category_id,
    data.status,
    data.slug,
  ]);
  return findById(result.insertId);
};

export const update = async (id, data) => {
  const sql =
    "UPDATE articles SET title = ?, content = ?, excerpt = ?, cover_image_url = ?, category_id = ?, status = ?, slug = ? WHERE id = ?";
  const [result] = await pool.execute(sql, [
    data.title,
    data.content,
    data.excerpt,
    data.cover_image_url,
    data.category_id,
    data.status,
    data.slug,
    id,
  ]);
  return findById(id);
};

export const remove = async (id) => {
  const sql = "DELETE FROM articles WHERE id = ?";
  const [result] = await pool.execute(sql, [id]);
  return result.affectedRows === 1;
};
