const { default: mongoose } = require("mongoose");
const Category = require("../models/category");
const Toy = require("../models/toy");

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
            title: "Category Detail",
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
  res.send("add category get");
};

exports.add_category_post = (req, res) => {
  res.send("add category post");
};

exports.delete_get = (req, res) => {
  res.send("delete get");
};

exports.delete_post = (req, res) => {
  res.send("delete post");
};

exports.update_get = (req, res) => {
  res.send("update get");
};

exports.update_post = (req, res) => {
  res.send("update_post");
};

exports.add_toy_get = (req, res) => {
  res.send("add toy get");
};

exports.add_toy_post = (req, res) => {
  res.send("add toy post");
};
