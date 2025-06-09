const express = require("express");
const Product = require("../models/Product");
const {  protect,admin } = require("../middleware/authMiddleware");

const router = express.Router();

//@route POST /api/products
//@desc Create a new product 
//@access Private/Admin
router.post("/", protect, admin, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatures,
            isPublished,
            tags,
            dimensions,
            weight,
            sku
        } = req.body;

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatures,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user: req.user._id // Reference to the admin user who created it
        });

        const createdProduct=await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        console.log(error);
    }
});

//@route PUT/api/products/:id
//@desc Update an existing producct by its id
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {  
    try{
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatures,
            isPublished,
            tags,
            dimensions,
            weight,
            sku
        } = req.body;
        //find product by ID
        const product = await Product.findById(req.params.id);

        if(product){
            //update product feilds
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;
              //save the updated product
            await product.save();
            res.status(200).json(product);
        }else{
            res.status(404).json({message:"Product not found"});
        }

}catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
      console.log(error);    
}
})

//@route DELETE /api/products/:id
//@desc Delete a product by its id
//@access Private/Admin

router.delete("/:id", protect, admin, async (req, res) => {
    try {
        //find product by ID
        const product = await Product.findById(req.params.id);

        if (product) {

            //remove the product
            await product.deleteOne();
            res.status(200).json({ message: "Product removed" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        console.log(error);
    }
});

module.exports = router;
