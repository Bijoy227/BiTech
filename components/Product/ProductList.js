import React, { Fragment } from "react";
import ProductItem from "./ProductItem";
import style from "./ProductList.module.css";

/* Rendering All Products From Database */
function ProductList({ products }) {
    return (
        <Fragment>
            <h1 className={style.product}>Products</h1>
            <div className={style.container}>
                {products.map((product) => (
                    <ProductItem
                        product={product}
                        key={product.slug}
                    ></ProductItem>
                ))}
            </div>
        </Fragment>
    );
}

export default ProductList;
