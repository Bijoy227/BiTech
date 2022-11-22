/* eslint-disable @next/next/no-img-element */
import React from "react";
import Modal from "../Modal/Modal";
import Image from "next/image";
import style from "./QuickView.module.css";
import Link from "next/link";

/* Quickview Component */
function QuickView({ onClose, tempData }) {
    return (
        <Modal onClose={onClose}>
            <div className={style.box}>
                <Image
                    src={tempData[1]}
                    width={100}
                    height={100}
                    alt={tempData[0]}
                />
                <div className={style.content}>
                    <h3>{tempData[0]}</h3>
                    <h4>Price: ${tempData[2]}</h4>
                    <div className={style.unit}>
                        <p>In Stock: {tempData[4]}</p>
                    </div>
                    <Link href={`/product/${tempData[3]}`}>
                        <a className={style.btnArea}>Show Details</a>
                    </Link>
                </div>
            </div>
        </Modal>
    );
}

export default QuickView;
