const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

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
            user: req.user._id
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        console.log(error);
    }
});

//@route PUT /api/products/:id
//@desc Update an existing product by its id
//@access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
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

        const product = await Product.findById(req.params.id);

        if (product) {
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

            await product.save();
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        console.log(error);
    }
});

//@route DELETE /api/products/:id
//@desc Delete a product by its id
//@access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
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

//@route GET /api/products
//@desc Get all products
//@access Public
router.get("/", async (req, res) => {
    try {
        const { collections, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit } = req.query;

        let query = {};

        if (collections && collections.toLowerCase() !== 'all') {
            query.collections = collections;
        }
        if (category && category.toLowerCase() !== 'all') {
            query.category = category;
        }
        if (material) {
            query.material = { $in: material.split(',') };
        }
        if (brand) {
            query.brand = { $in: brand.split(',') };
        }
        if (size) {
            query.sizes = { $in: [size] };
        }
        if (color) {
            query.colors = { $in: [color] };
        }
        if (gender) {
            query.gender = gender;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) {
                query.price.$gte = Number(minPrice);
            }
            if (maxPrice) {
                query.price.$lte = Number(maxPrice);
            }
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ];
        }

        let sort = {};
        if (sortBy) {
            switch (sortBy) {
                case 'priceAsc':
                    sort = { price: 1 };
                    break;
                case 'priceDesc':
                    sort = { price: -1 };
                    break;
                case 'popularity':
                    sort = { rating: -1 };
                    break;
                default:
                    break;
            }
        }

        const products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
        res.json(products);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        console.log(error);
    }
});

// @route GET /api/products/best-seller
// @desc retrieve the product with the highest rating
// @access Public

router.get("/best-seller", async (req, res) => {
    try {
        const bestSeller = await Product.findOne().sort({ rating: -1 });
        if (bestSeller) {
            res.json(bestSeller);
        } else {
            res.status(404).json({ message: "No products found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        console.log(error);
    }
});  

// @route GET /api/products/new-arrivals
// @desc retrieve the 8 most recently added products
// @access Public
router.get("/new-arrivals", async (req, res) => {
    try {
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
        res.json(newArrivals);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        console.log(error);
    }
});

// @route GET /api/products/:id
// @desc Get a product by its id
// @access Public
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        console.log(error);
    }
});



// @route GET /api/products/similar/:id
// @desc Get similar products based on category and gender
// @access Public
router.get("/similar/:id", async (req, res) => {

       const { id } = req.params;
    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const similarProducts = await Product.find({
            _id: { $ne: product._id },// Exclude the current product
            category: product.category,
            gender: product.gender
        }).limit(4); // Limit to 4 similar products

        res.json(similarProducts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        console.log(error);
    }
});


        
module.exports = router;
