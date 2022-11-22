/* Static Footer Component */

import React from "react";
import style from "./Footer.module.css";

function Footer() {
    return (
        <div className={style.container}>
            <footer className={style.footer}>
                <div class="footer-content">
                    <h3>Bijoy Technology aka BiTech</h3>
                    <p>
                        You’ve come to the right place if you’re seeking the
                        best cell phone. Get the best phone at affordable price.
                    </p>
                </div>
                <div class="footer-bottom">
                    <p>copyright &copy; Bijoy Chandra Nath</p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
