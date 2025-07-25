const express = require("express");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./middlewares/passportConfig");
require("dotenv").config();

const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173", // origen del frontend de Vite
    credentials: true,
  })
);

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "tu_secreto",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: "lax",
    },
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
app.use("/preview", indexRoute);
const postRouter = require("./routes/postsRoute");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/commentRoute");
app.use(commentsRouter);
const authRouter = require("./routes/authRoute");
app.use("/auth", authRouter);
const adminRouter = require("./routes/adminRoute");
app.use("/admin", adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
