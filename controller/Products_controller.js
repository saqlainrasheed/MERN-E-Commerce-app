const Product = require("../model/Product");

let readAllProducts = async (req, res) => {
  await Product.find({}).exec((err, products) => {
    if (err) console.log("Error finding products from db.");

    console.log("Products : ", products);
    res.status(200).send(products);
  });
};

let readProduct = async (req, res) => {
  const id = req.params;
  await Product.find({ _id: id }).exec((err, product) => {
    if (err) console.log("Error finding a product...");

    console.log("product", product);
    res.status(200).send(product);
  });
};

module.exports = {
  readAllProducts,
  readProduct,
};
