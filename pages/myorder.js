import axios from "axios";
import React, { useEffect, useReducer } from "react";
import MyOrder from "../components/MyOrder/MyOrder";

function reducerFunction(state, action) {
    if (action.type === "FETCH_REQUEST") {
        return { ...state };
    }

    if (action.type === "FETCH_SUCCESS") {
        return { ...state, orders: action.payload };
    } else {
        return state;
    }
}

/* For Rendering All Orders from Database Through API Call */
function Myorder() {
    const [{ orders }, dispatch] = useReducer(reducerFunction, {
        orders: [],
    });

    useEffect(() => {
        const fetchOrders = async () => {
            dispatch({ type: "FETCH_REQUEST" });
            const { data } = await axios.get(`/api/orders/history`);
            dispatch({ type: "FETCH_SUCCESS", payload: data });
        };

        fetchOrders();
    }, []);

    return <MyOrder orders={orders} />;
}

export default Myorder;
