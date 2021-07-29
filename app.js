const express = require("express");
const path = require("path");
const { connect } = require("./db/connect");
const hbs = require("hbs");
const sessions = require("express-session");
const MongoStore = require("connect-mongo");
const multer = require("multer");
const authRouter = require("./routes/authRouter");
const indexRouter = require("./routes/indexRouter");
// const Reddit = require("reddit");
const router = require("./routes/authRouter");

const PORT = 3000;
const secretKey =
  "24c9a336e8cfa43a7a70da234b12ef1ba43e0550139f79f96c3428103a17efe558f2c1e2c563dde1af2907b65a3e492642892d27d83074ff746018f3f02dc588";

connect();

const app = express();

app.set("cookieName", "userCookie");
app.set("view engine", "hbs");

hbs.registerPartials(path.join(process.env.PWD, "views", "partials"));

app.use(
  sessions({
    name: app.get("cookieName"),
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/fotochki",
    }),
    cookie: { httpOnly: true },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.env.PWD, "public")));

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(multer({ storage: storageConfig }).single("filedata"));

// const reddit = new Reddit({
//   username: 'fotochki',
//   password: 'fotochki',
//   appId: 'CgCcMgBZ-nCIXQ',
//   appSecret: '0KQub7g6CXz_LuiTQEU8TDnVjAoEtA',
//   userAgent: 'MyApp/1.0.0 (http://example.com)'
// })

// app.post('/api/submit', async(req, res) => {
//   const res = await re
// })

// const res = await reddit.post('/api/submit', {
//   sr: 'fotochki',
//   kind: 'link',
//   resubmit: true,
//   title: 'fotochki',
//   url: 'http://example.com'
// })

app.use((req, res, next) => {
  if (req.session?.user?.id) {
    res.locals.userId = req.session.user.id;
    res.locals.userName = req.session.user.name;
  }
  next();
});

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => console.log("SERVER STARTS ON PORT", PORT));
