import React, { FC, useState } from "react";

import { DreamCategory } from "../../../../@types/dreamCategory";
import { DreamDataForm } from "../../../../@types/dreamDataForm";
import css from "./DreamForm.module.css";

type PropsWizard = {
  videoDream: Blob | null;
  textDream: string;
  categories: DreamCategory[] | string[];
};

const DreamForm: FC<PropsWizard> = ({ videoDream, textDream, categories }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState({
    name: "Sweden",
  });
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const dataForm: DreamDataForm = {
    fullName,
    email,
    country,
    acceptPrivacy,
    videoDream,
    textDream,
    categories,
  };

  const sendForm = () => {
    console.log(dataForm);
  };

  return (
    <div className={css.bg}>
      <form action="">
        <h2>Some info about yourself</h2>
        <p>
          Nisl, nisi, risus ut iaculis. Tristique porttitor dui, et, vitae eget ut tristique. Massa luctus nunc non
          velit nisi.
        </p>
        <p>
          <input
            onChange={(e) => setFullName(e.target.value)}
            className={css.input}
            type="text"
            id="fullname"
            placeholder="Your full name"
          />
        </p>
        <p>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
        <button className={css.btnSendForm} type="button" onClick={sendForm}>
          Send dream
        </button>
      </form>
    </div>
  );
};

export default DreamForm;
