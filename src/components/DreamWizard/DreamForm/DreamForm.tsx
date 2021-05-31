import React, { useState } from "react";

import css from "./DreamForm.module.css";

const DreamForm = ({ fromDream }) => {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState({
    name: "Sweden",
  });
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const getDataForm = {
    fullName,
    email,
    country,
    acceptPrivacy,
  };

  const checkForm = () => {
    console.log(getDataForm);
  };

  return (
    <div>
      <form action="">
        <h2>Some info about yourself</h2>
        <p>
          Nisl, nisi, risus ut iaculis. Tristique porttitor dui, et, vitae eget ut tristique. Massa luctus nunc non
          velit nisi.
        </p>
        <p>
          <input
            onChange={(e) => setFullname(e.target.value)}
            className={css.input}
            type="text"
            id="fullname"
            placeholder="Your full name"
          />
        </p>
        <p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className={css.input}
            type="mail"
            id="email"
            placeholder="Email"
          />
        </p>
        <p>
          <select name="country" id="country">
            <option value="sweden">Sweden</option>
          </select>
        </p>
        <label htmlFor="acceptPrivacy">
          <input
            type="checkbox"
            id="acceptPrivacy"
            onChange={() => setAcceptPrivacy(!acceptPrivacy)}
            checked={acceptPrivacy}
          />
          I have read and approve the Terms and Conditions and Privary policy
        </label>
        <button type="button" onClick={checkForm}>
          Send dream
        </button>
      </form>
    </div>
  );
};

export default DreamForm;
