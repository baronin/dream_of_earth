import React from "react";

import UserCart from "../UserCart";

import css from "./TopUsers.module.css"

const TopUsers = () => {
  return (
    <section className="TopPeople">
      <div className="container">
        <h2 style={{ textAlign: "center", fontWeight: 400 }}>Dream ambassadors</h2>
        <div className={css.topPeopleInner}>
          <UserCart />
          <UserCart />
          <UserCart />
          <UserCart />
          <UserCart />
          <UserCart />
          <UserCart />
        </div>
      </div>
    </section>
  );
};

export default TopUsers;
