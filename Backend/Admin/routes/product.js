const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Endpoint to add a new product

router.post('/add', async (req, res) => {
  try {
    const { name, category, image_url, new_price, old_price } = req.body;
    if (!name || !category || !image_url || !new_price || !old_price) {
      return res.status(400).json({ errors: "Please provide all required fields" });
    }
    const newProduct = await Product.create({ name, category, image_url, new_price, old_price });

    res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });  

  } 
  catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});


// Endpoint to get all products 
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } 
  catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});

// Endpoint to get a single product by ID 
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ errors: "Product not found" });
    }
    res.status(200).json(product);
  } 
  catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});

// Endpoint to update a product by ID 
router.put('/:id', async (req, res) => {
  try {
    const { name, category, image_url, new_price, old_price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, category, image_url, new_price, old_price }, { new: true, runValidators: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ errors: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
  } 
  catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});

// Endpoint to update a single thing in product by ID (Patch)
router.patch('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ errors: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
  } 
  catch (error) {
    console.error("Error partially updating product:", error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});

// Endpoint to delete a product by ID (Delete)
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    
    if (!deletedProduct) {
      return res.status(404).json({ errors: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } 
  catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});

module.exports = router;
