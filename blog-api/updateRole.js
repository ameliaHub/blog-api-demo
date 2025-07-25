// updateRole.js
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // necesario para Render
});

async function updateUserRole(username, newRole) {
  try {
    const result = await pool.query(
      "UPDATE users SET role = $1 WHERE username = $2 RETURNING *",
      [newRole, username]
    );

    if (result.rows.length === 0) {
      console.log("Usuario no encontrado");
    } else {
      console.log("Usuario actualizado:", result.rows[0]);
    }
  } catch (error) {
    console.error("Error actualizando el rol:", error);
  } finally {
    await pool.end();
  }
}

updateUserRole("admin", "admin");
