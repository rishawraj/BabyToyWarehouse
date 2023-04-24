const Toy = require("../models/toy");

// exports.toy_list = (req, res) => {};

exports.toy_details = (req, res) => {
  Toy.findById(req.params.id)
    .then((data) =>
      res.render("toy_detail", {
        title: "Toy Detail",
        toy_detail: data,
      })
    )
    .catch((err) => console.log(err));

  // res.send(`Not Implemented: toy_details id: ${req.params.id}`);
};

exports.update_get = (req, res) => {
  res.send("update get toy");
};

exports.update_post = (req, res) => {
  res.send("update post toy");
};

exports.delete_get = (req, res) => {
  res.send("delete get toy");
};

exports.delete_post = (req, res) => {
  res.send("delete post toy");
};
