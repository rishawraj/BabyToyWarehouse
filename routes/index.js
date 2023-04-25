var express = require("express");
var router = express.Router();

const category_controlller = require("../controllers/categoryController");
const toy_controller = require("../controllers/toyController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "List your categories here",
  });
});

router.get("/categories", category_controlller.category_list);

// list all toys here
router.get("/categories/:id", category_controlller.category_details);

// toy details here
router.get("/toy/:id", toy_controller.toy_details);

// todo create categories
router.get("/add_category", category_controlller.add_category_get);
router.post("/add_category", category_controlller.add_category_post);

// todo delete categories
router.get("/categories/:id/delete", category_controlller.delete_get);
router.post("/categories/:id/delete", category_controlller.delete_post);

// todo update categories
router.get("/categories/:id/update", category_controlller.update_get);
router.post("/categories/:id/update", category_controlller.update_post);
// todo delete categories

// todo create toy inside a category.
router.get("/categories/:id/add", toy_controller.add_toy_get);
router.post("/categories/:id/add", toy_controller.add_toy_post);

// todo update toy
router.get("/toy/:id/update", toy_controller.update_get);
router.post("/toy/:id/update", toy_controller.update_post);

// todo delete toy
router.get("/toy/:id/delete", toy_controller.delete_get);
router.post("/toy/:id/delete", toy_controller.delete_post);

module.exports = router;
