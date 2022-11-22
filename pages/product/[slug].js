import React from "react";
import ProductDetails from "../../components/Product/ProductDetails";
import Product from "../../models/Product";
import db from "../../utils/db";

function ProductScreen(props) {
    const { product } = props;

    if (!product) {
        return <div>Product Not Found</div>;
    }
    return <ProductDetails product={product} />;
}

export default ProductScreen;

/* using getServerSideProps() for Rendering data ahead User's Request  */
export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;

    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    return {
        props: {
            product: product ? db.convertDocToObj(product) : null,
        },
    };
}
