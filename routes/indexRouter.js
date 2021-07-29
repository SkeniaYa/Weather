const { Router } = require("express");
const router = Router();
const Item = require("../models/itemModel");

router.route("/").get((req, res) => {
  res.render("index");
});

router.route("/allitems").get(async (req, res) => {
  if (req.session?.user?.id) {
    const allItems = await Item.find();
    return res.render("allitems", { allItems });
  } else {
    return res.redirect("/auth/signup");
  }
});

router.route("/upload").post(async (req, res) => {
  const filePath = `/${req.file.path.slice(7)}`;
  const newItem = await Item.create({
    image: filePath,
    description: req.body.description,
    place: req.body.place,
    user: req.session?.user?.id,
  });
  return res.redirect("/allitems");
});

router.route('/allitems/:id').get (async (req, res)=>{
  
})

module.exports = router;
