const express = require('express');
const Order = require('../models/Order');
const { protect} = require('../middleware/authMiddleware');
const router = express.Router();

// @route  GET /api/orders/myorders
// @desc   Get logged in user's orders
// @access Private

router.get('/myorders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route  GET /api/orders/:id
// @desc   Get order by ID
// @access Private

router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
