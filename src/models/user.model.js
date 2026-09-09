import pool from "../config/db.js"

export const findByEmail = async (email) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
};

export const findById = async (id) => {
    const [rows] = await pool.execute(
      "SELECT id, pseudo, email, role FROM users WHERE id = ?",
      [id],
    );
    return rows[0] || null;
};

export const create = async ({ email, password, pseudo, consentGiven }) => {
    const [result] = await pool.execute(
        "INSERT INTO users (email, password, pseudo, role, consent_given) VALUES (?, ?, ?, 'user', ?)",
        [email, password, pseudo, consentGiven],
    );
    return findById(result.insertId);
};

export const remove = async (id) => {
const [result] = await pool.execute(
"DELETE FROM users WHERE id = ?",
[id]);
return result.affectedRows=== 1;

}

export const update = async (id, pseudo, email) => {
  const [result] = await pool.execute(
    "UPDATE users SET pseudo = ?, email = ? WHERE id = ?",
    [pseudo, email, id],
  );

  return result.affectedRows === 1;
};