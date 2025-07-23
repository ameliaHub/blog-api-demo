const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");

router.get("/register", authController.showRegisterForm);
router.post("/register", authController.registerUser);

router.get("/login", authController.showLoginForm);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ message: "Credenciales incorrectas" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({
        message: "Login exitoso",
        user: { id: user.id, username: user.username },
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

module.exports = router;
