import React from "react";

import css from "./UserCart.module.css";

const UserCart = () => {
  return (
    <div className={css.userCart}>
      <div className={css.userCartInner}>
        <div>name</div>
        <div>categories</div>
      </div>
    </div>
  );
};

export default UserCart;
