import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useReducer } from "react";
import axios from "axios";
import OrderDetails from "../../components/Order/OrderDetails";

/* Reducer Function */
function reducerFunction(state, action) {
    if (action.type === "FETCH_REQUEST") {
        return { ...state };
    } else if (action.type === "FETCH_SUCCESS") {
        return { ...state, order: action.payload };
    } else if (action.type === "FETCH_FAIL") {
        return { ...state, error: action.payload };
    } else {
        state;
    }
}

function OrderScreen() {
    /* Using useRouter() for getting the id from the URL */
    const { query } = useRouter();
    const orderId = query.id;

    /* Defining useReducer() and useEffect() for Showing The Order Details Correctly */
    const [{ order }, dispatch] = useReducer(reducerFunction, {
        order: {},
    });

    useEffect(() => {
        const fetchOrder = async () => {
            dispatch({ type: "FETCH_REQUEST" });

            /* Fetching Data From Database through API Call */
            const { data } = await axios.get(`/api/orders/${orderId}`);
            dispatch({ type: "FETCH_SUCCESS", payload: data });
        };
        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder();
        }
    }, [order, orderId]);
    return <OrderDetails order={order} />;
}

export default OrderScreen;
