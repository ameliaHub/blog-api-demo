const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");

router.get("/register", authController.showRegisterForm);
router.post("/register", authController.registerUser);

router.get("/login", authController.showLoginForm);

router.post("/login", (req, res, next) => {
  console.log("Intentando iniciar sesión con:", req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ message: "Credenciales incorrectas" });

    req.logIn(user, (err) => {
      if (err) {
        console.error("Error en req.logIn:", err);
        return next(err);
      }

      console.log("Inicio de sesión exitoso. Usuario autenticado:", {
        id: user.id,
        username: user.username,
        role: user.role,
      });

      // Verificamos si la cookie de sesión se está enviando
      console.log("Cookies antes de enviar la respuesta:", req.session);
      return res.json({
        message: "Login exitoso",
        user: { id: user.id, username: user.username, role: user.role },
      });
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error al cerrar sesión");
    }
    res.redirect("/");
  });
});

router.get("/current-user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});

module.exports = router;
