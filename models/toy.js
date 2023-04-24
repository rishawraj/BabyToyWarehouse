const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToySchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  price: { type: Number, required: true },
  dsecription: { type: String, required: true },
  stock: { type: Number, maxLength: 500 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

ToySchema.virtual("url").get(function () {
  return `/toy/${this._id}`;
});

module.exports = mongoose.model("Toy", ToySchema);
