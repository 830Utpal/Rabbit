const express = require('express');
const Checkout = require('../models/Checkout');
const Cart= require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');
const Order = require('../models/Order');

const router = express.Router();

// @route POST /api/checkout
// @desc Create a new checkout
// @access Private

router.post('/', protect, async (req, res) => {
    const {checkoutItems, shippingAddress, paymentMethod, totalPrice} = req.body;

    if(!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({message: "No items in checkout"});
    }

    try {
        // Create a new checkout
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems: checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: 'Pending',
            isPaid: false,
        });
        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Error creating checkout:", error);
        res.status(500).json({message: "Server error"});
    }
});

// @route GET /api/checkout/:id/pay
// @desc Update checkout payment status
// @access Private

router.put('/:id/pay', protect, async (req, res) => {
    const {paymentStatus,paymentDetails} = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({message: "Checkout not found"});
        }

        if(paymentStatus=== 'Paid') {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();
            res.status(200).json(checkout);
        } else {
            res.status(400).json({message: "Invalid payment status"});
        }
    } catch (error) {
        console.error("Error updating checkout payment status:", error);
        res.status(500).json({message: "Server error"});
    }
});

// @route POST /api/checkout/:id/finalise
// @desc Finalise checkout and create order
// @access Private

router.post('/:id/finalise', protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({message: "Checkout not found"});
        }

        if(checkout.isPaid && !checkout.isFinalised) {

        // Create a new order
        const finalOrder = await Order.create({
            user: req.user._id,
            orderItems: checkout.checkoutItems,
            shippingAddress: checkout.shippingAddress,
            paymentMethod: checkout.paymentMethod,
            totalPrice: checkout.totalPrice,
            isPaid: checkout.isPaid,
            paidAt: checkout.paidAt,
            isDelivered: false,
            paymentStatus: "Paid",
            paymentDetails: checkout.paymentDetails,
        });

        // Mark checkout as finalised
        checkout.isFinalised = true;
        checkout.finalisedAt = Date.now();
        await checkout.save();

        //delete the user's cart
        await Cart.findOneAndDelete({ user: checkout.user });
        res.status(201).json(finalOrder);
    } else if(checkout.isFinalised) {
            return res.status(400).json({message: "Checkout already finalised"});
        }else {
            return res.status(400).json({message: "Checkout not paid"});
        }
    } catch (error) {
        console.error("Error finalising checkout:", error);
        res.status(500).json({message: "Server error"});
    }
});

module.exports = router;
