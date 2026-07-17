import pool from "../config/db.js"

export const findByEmail = async (email) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
};

export const create = async ({ email, password, pseudo, consentGiven }) => {
    const [result] = await pool.execute(
        "INSERT INTO users (email, password, pseudo, role, consent_given) VALUES (?, ?, ?, 'user', ?)",
        [email, password, pseudo, consentGiven],
    );
    return findById(result.insertId);
};
