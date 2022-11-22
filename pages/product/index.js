import React from "react";
import ProductList from "../../components/Product/ProductList";
import db from "../../utils/db";
import Product from "../../models/Product";

function index({ products }) {
    return <ProductList products={products} />;
}

export default index;

/* Using getStaticProps() for Rendering data ahead User's Request */
export async function getStaticProps() {
    await db.connect();

    /* Get all products from the database */
    const products = await Product.find().lean();
    return {
        props: {
            products: products.map(db.convertDocToObj),
        },
    };
}
