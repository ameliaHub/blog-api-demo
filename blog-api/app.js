const express = require("express");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./middlewares/passportConfig");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "tu_secreto_super_seguro",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

initializePassport();

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

const indexRoute = require("./routes/index");
app.use("/", indexRoute);
const authRouter = require("./routes/authRoute");
app.use("/auth", authRouter);
const adminRouter = require("./routes/adminRoute");
app.use("/admin", adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
