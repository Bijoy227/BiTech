/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import style from "./ConfirmOrder.module.css";
import { useRouter } from "next/router";
import { Store } from "../../utils/Store";
import { useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function ConfirmOrder() {
    /* Defining useRouter() for routing purpose */
    const router = useRouter();

    /* Destructuring Store Context */
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { cartItems, shippingAddress } = cart;

    /* Calculating All Types of Prices */
    const round2Func = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    const itemsPrice = round2Func(
        cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );

    /* Shipping Free For Who Buys $10000 or More Product  */
    const shippingPrice = itemsPrice >= 10000 ? 0 : 15;
    const totalPrice = round2Func(itemsPrice + shippingPrice);

    /* Confirm Button Handler */
    const confirmBtnHandler = async () => {
        /* Saving Data For Individual Order In The Database By API Call */
        const { data } = await axios.post("/api/orders", {
            orderItems: cartItems,
            shippingAddress,
            itemsPrice,
            shippingPrice,
            totalPrice,
        });

        /* Clearing Cookies After Order Cofirmaton */
        dispatch({ type: "CLEAR_CART_ITEMS" });
        Cookies.set("cart", JSON.stringify({ ...cart, cartItems: [] }));
        router.push(`/order/${data._id}`);
    };

    return (
        <div className={style.wrapper}>
            <h1>Order Confirmation</h1>
            {cartItems.length === 0 ? (
                <div className={style.empty}>
                    Cart is Empty.
                    <Link href={"/"}>
                        <a>Click Here For Shopping</a>
                    </Link>
                </div>
            ) : (
                <div className={style.project}>
                    <div className={style.shop}>
                        <h1>Shipping Address</h1>
                        <div className={style.address}>
                            <p>
                                {shippingAddress.fullName},{" "}
                                {shippingAddress.address},{" "}
                                {shippingAddress.postalCode},
                                {shippingAddress.city},
                            </p>
                            <Link href={"/checkout"}>
                                <a>Edit Address</a>
                            </Link>
                        </div>
                        <h1>Order Items</h1>
                        {cartItems.map((item) => (
                            <div key={item.slug} className={style.box}>
                                <Link href={`/product/${item.slug}`}>
                                    <a>
                                        <img src={item.image} alt={item.name} />
                                    </a>
                                </Link>
                                <div className={style.content}>
                                    <Link href={`/product/${item.slug}`}>
                                        <a>
                                            <h3>{item.name}</h3>
                                        </a>
                                    </Link>
                                    <h4>Price: ${item.price}</h4>
                                    <div className={style.unit}>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                    <div className={style.unit}>
                                        <p>
                                            SubTotal:{" "}
                                            {item.quantity * item.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Link href={"/cart"}>
                            <a>Edit Cart</a>
                        </Link>
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

                        <button onClick={confirmBtnHandler}>
                            Confirm Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ConfirmOrder;
