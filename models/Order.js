/*
 ***** Database Schema For Order Information ********
 */

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
            },
        ],
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
        },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
