const express = require('express');
const Order = require('../models/orderModel');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// @route   GET /api/admin/orders
// @desc    Get all orders(admin only)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email');
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;