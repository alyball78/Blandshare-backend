import pool from "../config/db.js";

export const exists = async (userId, articleId) => {
    const sql = "SELECT 1 FROM likes WHERE user_id = ? AND article_id = ?";
    const [rows] = await pool.execute(sql, [userId, articleId]);
    return rows.length > 0;
};
export const create = async (userId, articleId) => {
    const sql = "INSERT INTO likes (user_id, article_id) VALUES (?, ?)";
    await pool.execute(sql, [userId, articleId]);
};
export const remove = async (userId, articleId) => {
    const sql = "DELETE $FROM likes WHERE user_id = ? AND article_id = ?";
    await pool.execute(sql, [userId, articleId])
};

export const countByArticle = async (articleId) => {
    const sql = "SELECT COUNT(*) AS total FROM likes WHERE article_id = ?";
    const [result] = await pool.execute(sql, [articleId])
    return result[0].total;
};
