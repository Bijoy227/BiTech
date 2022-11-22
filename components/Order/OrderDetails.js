/* eslint-disable @next/next/no-img-element */
import React from "react";
import style from "./OrderDetails.module.css";

/* For Rendering Individual Order in Details  */
function OrderDetails({ order }) {
    /* Destructuring order Object Which Is Getting Through props */
    const {
        shippingAddress,
        orderItems,
        itemsPrice,
        shippingPrice,
        totalPrice,
    } = order;

    return (
        <div className={style.wrapper}>
            <h1>Order Details</h1>
            <div className={style.project}>
                <div className={style.shop}>
                    <div className={style.address}>
                        <h2>Order Id: {order?._id}</h2>
                        <h1>Shipping Address</h1>
                        <p>User Name: {shippingAddress?.fullName}</p>
                        <p>
                            User Address : {shippingAddress?.address},{" "}
                            {shippingAddress?.postalCode},{" "}
                            {shippingAddress?.city}
                        </p>
                    </div>
                    <h1>Ordered Items</h1>
                    {orderItems?.map((item) => (
                        <div key={item?._id} className={style.box}>
                            <img src={item?.image} alt={item?.name} />
                            <div className={style.content}>
                                <h3>{item?.name}</h3>
                                <h4>Price: ${item?.price}</h4>
                                <div className={style.unit}>
                                    <p>Quantity: {item?.quantity}</p>
                                </div>
                                <div className={style.unit}>
                                    <p>
                                        SubTotal: {item?.quantity * item?.price}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={style.rightBar}>
                    <h1>Order Summery</h1>
                    <p>
                        <span>Subtotal</span>
                        <span>${itemsPrice}</span>
                    </p>
                    <hr />
                    <p>
                        <span>Shipping</span>
                        <span>${shippingPrice}</span>
                    </p>
                    <hr />
                    <p>
                        <span>Total</span>
                        <span>${totalPrice}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
