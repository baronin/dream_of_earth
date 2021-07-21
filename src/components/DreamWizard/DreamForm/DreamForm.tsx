import React, { ChangeEvent, FC, useState } from "react";

import { DreamCategory } from "../../../../@types/dreamCategory";
import { DreamData } from "../../../../@types/DreamData";
import { create } from "../../../api/dreams";
import countries from "../../../mock/countries";
import css from "./DreamForm.module.css";

type PropsWizard = {
  videoDream: Blob | null;
  textDream: string;
  categories: DreamCategory[];
};

const ACCESS_TOKEN = "45392dc057322eff77f2ea349edb606f";

const DreamForm: FC<PropsWizard> = ({ videoDream, textDream, categories }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Sweden");
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const categoriesId = categories.map((item) => item.id);

  const dataForm: Omit<DreamData, "id"> = {
    fullName,
    email,
    country,
    acceptPrivacy,
    videoDream: "Urls", // TODO need link for video dream
    textDream,
    categories: categoriesId,
  };
  // Пример отправки POST запроса:
  async function postData(url = "") {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        Accept: "application/vnd.vimeo.*+json;version=3.4",
      },
      body: JSON.stringify({
        upload: {
          approach: "tus",
          size: videoDream?.size.toString(),
        },
      }),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const sendForm = async () => {
    // postData("https://api.vimeo.com/me/videos").then((data) => {
    //   // data.upload.upload_link;
    //   console.log(data); // JSON data parsed by `response.json()` call
    // });
    // await create(dataForm);
    console.log(dataForm);
  };

  const handleChangeCounty = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
    console.log("defaultCountry", country);
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
          <select name="country" id="country" value={country} onChange={handleChangeCounty}>
            <option defaultValue={country} value="defaultCountry">
              {country}
            </option>
            {countries && countries.map((item, i) => <option key={`${item.name} ${i}`}>{item.name}</option>)}
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
