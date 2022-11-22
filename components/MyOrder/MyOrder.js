import Link from "next/link";
import React from "react";
import style from "./MyOrder.module.css";

/* Component For Rendering All The Orders */
function MyOrder({ orders }) {
    return (
        <div className={style.wrapper}>
            <table className={style.table}>
                <caption>My Orders</caption>
                <thead>
                    <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Order Time</th>
                        <th scope="col">Order Details</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt}</td>
                            <td>
                                <Link href={`order/${order._id}`} passHref>
                                    <a>Details</a>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MyOrder;
