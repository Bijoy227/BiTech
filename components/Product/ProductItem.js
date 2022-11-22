/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useState } from "react";
import Link from "next/link";
import style from "./ProductItem.module.css";
import { Store } from "../../utils/Store";
import { useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuickView from "../QuickView/QuickView";

function ProductItem({ product }) {
    /* Getting Store context */
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    /* Defining useState() for Showing and Closing Quickview Modal */
    const [showQuickView, setShowQuickView] = useState(false);
    const [tempData, setTempData] = useState([]);

    /* Show QuickView Handler */
    const quickViewHandler = (
        name,
        image,
        price,
        description,
        countInStock
    ) => {
        let tempData = [name, image, price, description, countInStock];
        setTempData((data) => [...tempData]);
        return setShowQuickView(true);
    };

    /* Close Quickview Handler */
    const closeQuickViewHandler = () => {
        setShowQuickView(false);
    };

    /* Add To Cart Handler */
    const addToCartHandler = async () => {
        /* Checking If The Item Exists In CartItems */
        const existItem = cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        /* Fetching Product Informatin From Database By API Call */
        const { data } = await axios.get(`/api/products/${product._id}`);

        /* Checking If Product Is Out Of Stock */
        if (data.countInStock < quantity) {
            toast.error("Out of Stock!!");
            return;
        }

        /* Dispatching Action For Adding Product to Cart */
        dispatch({
            type: "CART_ADD_ITEM",
            payload: { ...product, quantity },
        });

        toast("Product added to the cart");
    };

    return (
        <Fragment>
            <div className={style.card}>
                <Link href={`/product/${product.slug}`}>
                    <a>
                        <div className={style.imgContainer}>
                            <img src={product.image} alt={product.name} />
                            <img src={product.image} alt={product.name} />
                        </div>
                    </a>
                </Link>
                <div className={style.infoBox}>
                    <Link href={`/product/${product.slug}`}>
                        <a>
                            <div className={style.title}>{product.name}</div>
                        </a>
                    </Link>
                    <div className={style.price}>${product.price}</div>
                    <div className={style.buttonGroup}>
                        <button
                            className={style.buy}
                            onClick={() =>
                                quickViewHandler(
                                    product.name,
                                    product.image,
                                    product.price,
                                    product.slug,
                                    product.countInStock
                                )
                            }
                        >
                            Quick View
                        </button>
                        <button
                            className={style.addToCart}
                            onClick={addToCartHandler}
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
            {showQuickView && (
                <QuickView
                    tempData={tempData}
                    onClose={closeQuickViewHandler}
                />
            )}
        </Fragment>
    );
}

export default ProductItem;
