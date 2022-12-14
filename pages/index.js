import Hero from "../components/Hero/Hero";
import ProductList from "../components/Product/ProductList";
import db from "../utils/db";
import Product from "../models/Product";

export default function Home({ products }) {
    return (
        <div>
            <Hero />
            <ProductList products={products} />
        </div>
    );
}

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
