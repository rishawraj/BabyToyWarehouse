const { default: mongoose } = require("mongoose");
const Category = require("../models/category");
const Toy = require("../models/toy");
const { body, validationResult } = require("express-validator");

exports.category_list = (req, res) => {
  Category.find({}, "name")
    .then((data) => {
      res.render("category_list", {
        title: "List category",
        items: data,
      });
    })
    .catch((err) => console.log(err));
};

exports.category_details = (req, res) => {
  Toy.find({ category: req.params.id })
    .then((data) =>
      Category.findById(req.params.id)
        .then((category) => {
          res.render("category_detail", {
            title: category.name,
            toys: data,
            category_detail: category,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Internal Server Error!");
        })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error!");
    });
};

exports.add_category_get = (req, res) => {
  res.render("category_form", {
    title: "Create New Categroy",
  });
};

exports.add_category_post = [
  body("name", "name is required").trim().isLength({ min: 1 }).escape(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const category = new Category({
      name: req.body.name,
    });

    category
      .save()
      .then(res.redirect(category.url))
      .catch((err) => console.log(err));
  },
];

exports.delete_get = (req, res) => {
  res.render("category_delete", {
    title: "Delete Category",
    category_id: req.params.id,
  });
};

exports.delete_post = (req, res) => {
  Category.findByIdAndRemove(req.body.name)
    .then(
      Toy.find({ category: req.body.name }).deleteMany({
        category: req.body.name,
      })
    )
    .then(res.redirect("/categories"))
    .catch((err) => console.log(err));
};

exports.update_get = (req, res) => {
  res.send("update get");
};

exports.update_post = (req, res) => {
  res.send("update_post");
};
