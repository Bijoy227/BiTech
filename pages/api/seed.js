import data from "../../utils/data";
import db from "../../utils/db";
import Product from "../../models/Product";

const handler = async (req, res) => {
    await db.connect();
    await Product.deleteMany();
    await Product.insertMany(data.products);
    await db.disconnect();
    res.send({ message: "seeded successfully" });
};
export default handler;
