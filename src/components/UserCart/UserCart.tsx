import Link from "next/link";
import React from "react";

import css from "./UserCart.module.css";

const UserCart = () => {
  return (
    <div className={css.userCart}>
      <Link href="#">
        <a className={css.userCartInner}>
          <div>name</div>
          <div>categories</div>
        </a>
      </Link>
    </div>
  );
};

export default UserCart;
