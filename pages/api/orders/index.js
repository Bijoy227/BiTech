import db from "../../../utils/db";
import Order from "../../../models/Order";

const handler = async (req, res) => {
    await db.connect();
    const newOrder = new Order({
        ...req.body,
    });

    const order = await newOrder.save();
    res.send(order);
};

export default handler;
