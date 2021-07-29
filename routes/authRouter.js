const { Router } = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const router = Router();

router
  .route("/signup")
  .get(async (req, res) => {
    res.render("signup");
  })
  .post(async (req, res) => {
    try {
      const { name, email, password: tmpPassword } = req.body;
      const password = await bcrypt.hash(tmpPassword, saltRounds);
      if (name && email && password) {
        const newUser = await User.create({ name, email, password });
        if (newUser) {
          req.session.user = { id: newUser._id, name: newUser.name };
          return res.redirect("/");
        }
        return res.status(401).redirect("/auth/signup");
      }
    } catch (e) {
      const message = "user already exists";
      return res.status(418).render("signup", { message });
    }
  });

router
  .route("/signin")
  .get((req, res) => {
    res.render("signin");
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const currentUser = await User.findOne({ email });
      if (
        currentUser &&
        (await bcrypt.compare(password, currentUser.password))
      ) {
        req.session.user = { id: currentUser._id, name: currentUser.name };
        return res.redirect("/allitems");
      }
      return res.status(401).redirect("/auth/signin");
    }
    return res.status(401).redirect("/auth/signin");
  });

router.route("/signout").get((req, res) => {
  req.session.destroy();
  res.clearCookie(req.app.get("cookieName"));
  res.redirect("/");
});

module.exports = router;
