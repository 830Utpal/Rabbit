const express = require('express');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/authMiddleware');
const Product = require('../models/Product');

const router = express.Router();

// Helper function to get cart by userId or guestId
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
};

// @route GET /api/cart
// @desc add a product to the cart for a guest or logged-in user 
// @access Public
router.post('/', async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await getCart(userId, guestId);

       
        if (cart) {
           const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId && p.size === size && p.color === color);
            if (productIndex > -1) {
                // Product already exists in the cart, update quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // Product does not exist in the cart, add new item
                cart.products.push({ productId, name: product.name, image: product.images[0].url, price: product.price, size, color, quantity });
            }
            // Calculate total price
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            res.status(200).json(cart);
        } else {
            // Create a new cart if it doesn't exist
            const newCart = new Cart({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + Date.now(),
                products: [{
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                }],
                totalPrice: product.price * quantity,
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
