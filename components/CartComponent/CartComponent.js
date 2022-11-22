/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import style from "./CartComponent.module.css";
import Link from "next/link";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CartComponent() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);

    /* Get the cartItems from state */
    const {
        cart: { cartItems },
    } = state;

    /* Remove item handler */
    const removeItemHandler = (item) => {
        dispatch({ type: "CART_REMOVE_ITEM", payload: item });
    };

    /* Update Cart Handler */
    const updateCartHandler = async (item, qty) => {
        const quantity = Number(qty);
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            return toast.error("Sorry, Product is out of Stock!");
        }

        /* Dispatch Action On Updating Cart Items */
        dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
        toast.success("Product updated in the cart");
    };

    /* Rendering Every Product In The Cart*/
    return (
        <div className={style.wrapper}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className={style.empty}>
                    Cart is Empty.
                    <Link href={"/product"}>
                        <a>Click Here For Shopping.</a>
                    </Link>
                </div>
            ) : (
                <div className={style.project}>
                    <div className={style.shop}>
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
                                        <p>Quantity:</p>
                                        <select
                                            value={item.quantity}
                                            onChange={(e) =>
                                                updateCartHandler(
                                                    item,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {[
                                                ...Array(
                                                    item.countInStock
                                                ).keys(),
                                            ].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        onClick={() => {
                                            removeItemHandler(item);
                                        }}
                                        className={style.btnArea}
                                    >
                                        <span>X</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={style.rightBar}>
                        <p>
                            <span>
                                Subtotal (
                                {cartItems.reduce((a, c) => a + c.quantity, 0)})
                            </span>
                            <span>
                                $
                                {cartItems.reduce(
                                    (a, c) => a + c.quantity * c.price,
                                    0
                                )}
                            </span>
                        </p>

                        <button onClick={() => router.push("/checkout")}>
                            CheckOut
                        </button>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

/* Using dynamic() For Avoiding Hydration Error */
export default dynamic(() => Promise.resolve(CartComponent), { ssr: false });
