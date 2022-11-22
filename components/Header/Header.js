import Link from "next/link";
import React, { useEffect, useState } from "react";
import style from "./Header.module.css";
import CartIcon from "../Icons/CartIcon";
import SeachIcon from "../Icons/SeachIcon";
import { useContext } from "react";
import { Store } from "../../utils/Store";
import Image from "next/image";

function Header() {
    /* Getting Store Context */
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    /* Updating Cart Items Count Using useState() and useEffect() */
    const [cartItemsCount, setCartItemsCount] = useState(0);
    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);

    /* Returing Header Component */
    return (
        <header className={style.header}>
            <Link href={"/"}>
                <a className={style.logo}>
                    <Image
                        alt="logo"
                        src={"/images/logo2.png"}
                        width={150}
                        height={50}
                    />
                </a>
            </Link>

            <nav className={style.navbar}>
                <Link href={"/"}>
                    <a>Home</a>
                </Link>
                <Link href={"/product"}>
                    <a>Products</a>
                </Link>
                <Link href={"/myorder"}>
                    <a>My Order</a>
                </Link>
            </nav>

            <div className={style.icons}>
                <div>
                    <SeachIcon />
                </div>
                <div>
                    <Link href={"/cart"}>
                        <a>
                            <CartIcon />
                            {cartItemsCount > 0 && (
                                <span className={style.cartItem}>
                                    {cartItemsCount}
                                </span>
                            )}
                        </a>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
