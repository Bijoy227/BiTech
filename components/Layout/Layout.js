import React, { Fragment } from "react";
import Header from "../Header/Header";
import Head from "next/head";
import Footer from "../Footer/Footer";

/* Combining All Individual Component For Making The Whole Page Layout */
function Layout(props) {
    return (
        <div>
            <Head>
                <title>Bijoy Technology</title>
                <meta
                    name="description"
                    content="Created By Bijoy Chandra Nath"
                />
                <link rel="icon" href="/icon.jpg" />
            </Head>
            <Header />
            <main>{props.children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
