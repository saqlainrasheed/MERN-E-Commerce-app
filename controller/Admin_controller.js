const Product = require("../model/Product");
const User = require("../model/User");

let getAdminUsers = async (req, res) => {
  await User.find().exec((err, users) => {
    if (err) console.log("Find Admin Users Error---------------", err);
    res.status(200).json({ users });
  });
};

let createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  let newProduct = new Product({
    name,
    description,
    price,
  });
  await newProduct.save();
  res.status(200).json({ product: newProduct });
};

let updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  await Product.findByIdAndUpdate(id).exec((err, product) => {
    if (err) console.log("Updated Product-----------------", err);
    product.name = name;
    product.description = description;
    product.price = price;
    //Save the product with updated data.
    product.save();
    //THen send back the data, just for testing purposes.
    res.status(200).json({ product });
  });
};

let deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.deleteMany({ _id: id }).exec((err, product) => {
    if (err) throw err;
    res.status(200).send(product);
  });
};

module.exports = {
  getAdminUsers,
  createProduct,
  updateProduct,
  deleteProduct,
};
