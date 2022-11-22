import React from "react";
import style from "./CheckOut.module.css";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";
import Link from "next/link";

function CheckOut() {
    /* Using useForm() For Overall Form Handling and  validation*/
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm();

    /* Store Context */
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress } = cart;
    const { cartItems } = cart;

    /* Defining useRouter() for routing purpose */
    const router = useRouter();

    /* Using useEffect() for Storing The Shipping Address and Personal Info */
    useEffect(() => {
        setValue("fullName", shippingAddress.fullName);
        setValue("email", shippingAddress.email);
        setValue("phone", shippingAddress.phone);
        setValue("address", shippingAddress.address);
        setValue("city", shippingAddress.city);
        setValue("postalCode", shippingAddress.postalCode);
    }, [setValue, shippingAddress]);

    /* Form Submit Handler */
    const formSubmitHandler = ({
        fullName,
        email,
        phone,
        address,
        city,
        postalCode,
    }) => {
        dispatch({
            type: "SAVE_SHIPPING_ADDRESS",
            payload: { fullName, email, phone, address, city, postalCode },
        });

        /* Saving The Personal Information & Shipping Address in Cookies */
        Cookies.set(
            "cart",
            JSON.stringify({
                ...cart,
                shippingAddress: {
                    fullName,
                    email,
                    phone,
                    address,
                    city,
                    postalCode,
                },
            })
        );
        router.push("/confirmOrder");
    };

    /* Returing Form With Proper Validation */
    return (
        <div className={style.container}>
            {cartItems.length === 0 ? (
                <div className={style.empty}>
                    No Item in the cart.
                    <Link href={"/product"}>
                        <a>Go Shopping</a>
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit(formSubmitHandler)}>
                    <div className={style.col}>
                        <h3 className={style.title}>
                            Client Information and Billing Address
                        </h3>
                        <div className={style.inputBox}>
                            <label htmlFor="fullName">Full Name: </label>
                            <input
                                type="text"
                                id="fullName"
                                autoFocus
                                {...register("fullName", {
                                    required: "Please Enter full name",
                                })}
                            />
                            {errors.fullName && (
                                <div className={style.errorMsg}>
                                    {errors.fullName.message}
                                </div>
                            )}
                        </div>
                        <div className={style.inputBox}>
                            <label htmlFor="email">Email: </label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", {
                                    required:
                                        "Please Enter a Mail and Check if it's Valid!",
                                    pattern:
                                        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                })}
                            />
                            {errors.email && (
                                <div className={style.errorMsg}>
                                    {errors.email.message}
                                </div>
                            )}
                        </div>
                        <div className={style.inputBox}>
                            <label htmlFor="phone">Phone No: </label>
                            <input
                                type="text"
                                id="phone"
                                {...register("phone", {
                                    required:
                                        "Please Enter Your Phone Number and Make sure it starts with +880",
                                    pattern:
                                        /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
                                })}
                            />
                            {errors.phone && (
                                <div className={style.errorMsg}>
                                    {errors.phone.message}
                                </div>
                            )}
                        </div>
                        <div className={style.inputBox}>
                            <label htmlFor="address">Address: </label>
                            <input
                                type="text"
                                id="address"
                                {...register("address", {
                                    required:
                                        "Please Enter Your Address Properly",
                                    minLength: {
                                        value: 3,
                                        message:
                                            "Address should be more than 2 chars",
                                    },
                                })}
                            />
                            {errors.address && (
                                <div className={style.errorMsg}>
                                    {errors.address.message}
                                </div>
                            )}
                        </div>
                        <div className={style.inputBox}>
                            <label htmlFor="city">City: </label>
                            <input
                                type="text"
                                id="city"
                                {...register("city", {
                                    required: "Please Enter City",
                                })}
                            />
                            {errors.city && (
                                <div className={style.errorMsg}>
                                    {errors.city.message}
                                </div>
                            )}
                        </div>
                        <div className={style.inputBox}>
                            <label htmlFor="postalCode">Postal Code: </label>
                            <input
                                type="text"
                                id="postalCode"
                                {...register("postalCode", {
                                    required: "Please Enter Postal Code",
                                    minLength: {
                                        value: 5,
                                        message:
                                            "Postal code must Be 5 charachters long!",
                                    },
                                })}
                            />
                            {errors.postalCode && (
                                <div className={style.errorMsg}>
                                    {errors.postalCode.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={style.submitBtn}>
                        <button>Procced To Place Order</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default CheckOut;
