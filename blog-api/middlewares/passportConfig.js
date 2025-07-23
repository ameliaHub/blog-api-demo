const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const pool = require("../db/pool");

function initializePassport() {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const result = await pool.query(
          "SELECT * FROM users WHERE username = $1",
          [username]
        );
        if (result.rows.length === 0) {
          return done(null, false, { message: "Usuario no encontrado" });
        }
        const user = result.rows[0];

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
          return done(null, false, { message: "Contraseña incorrecta" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      if (result.rows.length === 0) {
        return done(new Error("Usuario no encontrado"));
      }
      done(null, result.rows[0]);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initializePassport;
