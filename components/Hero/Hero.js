/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import style from "./Hero.module.css";

/* Hero Component */
function Hero() {
    return (
        <section className={style.container}>
            <div className={style.slogan}>
                <h1 className={style.pure1}>Get Smarter From Here</h1>
                <p className={style.pure2}>
                    You’ve come to the right place if you’re seeking the best
                    cell phone. Get the best phone at affordable price.
                </p>
                <Link href={"/product"}>
                    <a className={style.btn}>Shop Now</a>
                </Link>
            </div>
        </section>
    );
}

export default Hero;
