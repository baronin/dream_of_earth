import React from "react";

import css from "./UserList.module.css";
import UserCart from "../UserCart";

const UserList = () => {
  return (
    <div className="container">
      <h2 style={{ textAlign: "center", fontWeight: 400 }}>Dreams from the Citizens of Earth</h2>
      <div className={css.selectWrap}>
        <div className="selectItem">
          Dreams about
          <select className={css.select} name="category" id="category">
            <option value="Everything">Everything</option>
          </select>
        </div>
        <div className="selectItem">
          from
          <select className={css.select} name="from" id="from">
            <option value="world">The world</option>
          </select>
        </div>
      </div>
      <div>
        <UserCart />
      </div>
    </div>
  );
};

export default UserList;
