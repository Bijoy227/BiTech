/* eslint-disable @next/next/no-img-element */
import React from "react";
import style from "./ProductDetails.module.css";
import Link from "next/link";
import { Store } from "../../utils/Store";
import { useContext } from "react";
import axios from "axios";

/* For Rendering Details Of A Product */
function ProductDetails({ product }) {
    /* Getting Store context */
    const { state, dispatch } = useContext(Store);

    const addToCartHandler = async () => {
        /* Checking If The Product Already Exists In CartItems */
        const existItem = state.cart.cartItems.find(
            (x) => x.slug === product.slug
        );
        const quantity = existItem ? existItem.quantity + 1 : 1;

        /* Fetching All Information About The Product Through API Call From Database */
        const { data } = await axios.get(`/api/products/${product._id}`);

        /* Checking If The Item Is Out Of Stock */
        if (data.countInStock < quantity) {
            alert("Sorry. Product is out of stock!! 😞");
            return;
        }

        /* Dispatcing Action For Adding Item To Cart */
        dispatch({
            type: "CART_ADD_ITEM",
            payload: { ...product, quantity },
        });
    };

    return (
        <section className={style.container}>
            <div className={style.leftColumn}>
                <img src={product.image} alt={product.name} />
            </div>

            <div className={style.rightColumn}>
                <div className={style.productDescription}>
                    <span>Mobile Phone</span>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                </div>

                <div className={style.productConfiguration}>
                    <div className={style.productColor}>
                        <span>Color: {product.color}</span>
                    </div>
                </div>

                <div className={style.productPrice}>
                    <span>Price: ${product.price}</span>
                    <Link href="/cart">
                        <a className={style.cartBtn} onClick={addToCartHandler}>
                            Add to cart
                        </a>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default ProductDetails;
