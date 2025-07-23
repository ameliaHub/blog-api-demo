const bcrypt = require("bcrypt");
const pool = require("../db/pool");

exports.showRegisterForm = (req, res) => {
  res.render("register");
};

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Faltan campos obligatorios");
  }

  try {
    // 1. Comprobar si el usuario ya existe
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (userCheck.rows.length > 0) {
      return res.status(400).send("El usuario ya existe");
    }

    // 2. Hashear la contraseña
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // 3. Insertar nuevo usuario con role 'user' por defecto
    await pool.query(
      "INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)",
      [username, password_hash, "user"]
    );

    // Respuesta JSON para frontend React
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error registrando usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

exports.showLoginForm = (req, res) => {
  res.render("login");
};
