const category = require("../models/category");
const Toy = require("../models/toy");
const { check, body, validationResult } = require("express-validator");
const multer = require("multer");

const time = Date.now();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, time + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.toy_details = (req, res) => {
  // res.send(req.body);

  Toy.findById(req.params.id)
    .then((data) =>
      res.render("toy_detail", {
        title: "Toy Detail",
        toy_detail: data,
      })
    )
    .catch((err) => console.log(err));
};

exports.add_toy_get = (req, res) => {
  res.render("toy_form", {
    title: "Add Toy",
    category_id: req.params.id,
  });
};

exports.add_toy_post = [
  upload.single("toy-image"),

  check("toy_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Toy Name is required"),
  check("toy_price")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Toy Price is required"),
  check("toy_description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Toy Description is required"),
  check("toy_stock").isInt().withMessage("Toy Stock must be a valid integer"),

  (req, res) => {
    // res.send(req.file);
    console.log(req.file.originalname);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const toy = new Toy({
      name: req.body.toy_name,
      price: req.body.toy_price,
      dsecription: req.body.toy_description,
      stock: req.body.toy_stock,
      category: req.body.toy_category,
      // get the file information from the multer middleware
      image: time + "-" + req.file.originalname,

      // image: {
      //   data: fs.readFileSync(
      //     path.join(__dirname, "../public/images/" + req.file.filename)
      //   ),
      //   contentType: req.file.mimetype,
      // },
    });

    toy
      .save()
      .then(res.redirect(toy.url))
      .catch((err) => console.log(err));
  },
];

// todo delete
exports.delete_get = (req, res) => {
  res.render("toy_delete", {
    title: "Delete Toy",
    toy_id: req.params.id,
  });
};

exports.delete_post = (req, res) => {
  Toy.findByIdAndRemove(req.body.name)
    .then((toy_data) => category.findById(toy_data.category))
    .then((data) => res.redirect(data.url))
    .catch((err) => console.log(err));
};

// todo update

exports.update_get = (req, res) => {
  Toy.findById(req.params.id)
    .then((data) => {
      res.render("toy_update", {
        title: "Update toy",
        toy_id: req.params.id,
        data,
      });
    })
    .catch((err) => console.log(err));
};

exports.update_post = [
  upload.single("toy_image"), // no error

  body("name").trim().optional().isLength({ min: 1 }).escape(),
  body("price").trim().optional().escape(),
  body("dsecription").trim().optional().escape(),
  body("stock").trim().optional().escape(),
  body("toy_image").trim().optional(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const toy = {
      name: req.body.name,
      price: req.body.price,
      dsecription: req.body.dsecription,
      stock: req.body.stock,
    };

    if (req.file) {
      toy.image = time + "-" + req.file.originalname;
    }

    Toy.findByIdAndUpdate(req.body.toy_id, toy, {})
      .then(res.redirect("/toy/" + req.body.toy_id))
      .catch((err) => console.log(err));
  },
];
