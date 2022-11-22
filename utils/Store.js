import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();

/* Initial State of the cart or we can say useReducer() */
const initialState = {
    cart: Cookies.get("cart")
        ? JSON.parse(Cookies.get("cart"))
        : {
              cartItems: [],
              shippingAddress: {},
          },
};

/* Reducer function */
function reducerFunction(previousState, action) {
    /* Action For Adding Item In The Cart */
    if (action.type === "CART_ADD_ITEM") {
        const newItem = action.payload;
        /* Search in the previousState for the newItem */
        const presentItem = previousState.cart.cartItems.find(
            (item) => item.slug === newItem.slug
        );

        /* If presentItem exists */
        const cartItems = presentItem
            ? previousState.cart.cartItems.map((item) =>
                  item.name === presentItem.name ? newItem : item
              )
            : [...previousState.cart.cartItems, newItem];
        Cookies.set(
            "cart",
            JSON.stringify({ ...previousState.cart, cartItems })
        );
        /* We need to return the cartItems  */
        return { ...previousState, cart: { ...previousState.cart, cartItems } };
    }

    /* Action For Removing Item In The Cart */
    if (action.type === "CART_REMOVE_ITEM") {
        const cartItems = previousState.cart.cartItems.filter(
            (item) => item.slug !== action.payload.slug
        );

        Cookies.set(
            "cart",
            JSON.stringify({ ...previousState.cart, cartItems })
        );
        return { ...previousState, cart: { ...previousState.cart, cartItems } };
    }

    /* Action For Resetting The Cart */
    if (action.type === "CART_RESET") {
        return {
            ...previousState,
            cart: { cartItems: [], shippingAddress: {} },
        };
    }

    /* Action For Clearing The Cart */
    if (action.type === "CLEAR_CART_ITEMS") {
        return {
            ...previousState,
            cart: {
                ...previousState.cart,
                cartItems: [],
            },
        };
    }

    /* Action For Saving Shipping Address */
    if (action.type === "SAVE_SHIPPING_ADDRESS") {
        return {
            ...previousState,
            cart: {
                ...previousState.cart,
                shippingAddress: {
                    ...previousState.cart.shippingAddress,
                    ...action.payload,
                },
            },
        };
    } else {
        return previousState;
    }
}

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducerFunction, initialState);
    const value = { state, dispatch };

    /* Here Provider is a wrapper, for all components in this application */
    return <Store.Provider value={value}>{children}</Store.Provider>;
}
