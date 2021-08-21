import React, { ChangeEvent, FC, useState } from "react";

import { DreamCategory } from "../../../../@types/dreamCategory";
import { DreamData } from "../../../../@types/dreamData";
import uploadedVideo from "../../../api/uploadVideo";
import countries from "../../../mock/countries";
import css from "./DreamForm.module.css";

type PropsWizard = {
  dreamContent: Blob | null | string;
  videoDream: Blob | null;
  categories: DreamCategory[];
  onApproval: () => void;
};

const DreamForm: FC<PropsWizard> = ({ dreamContent, videoDream, categories, onApproval }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Sweden");
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const categoriesId = categories.map((item) => item.id);
  const [errorMessage, setErrorMessage] = useState("");

  const dataForm: Omit<DreamData, "id"> = {
    fullName,
    email,
    country,
    acceptPrivacy,
    dreamContent, // TODO need link for video dream
    categories: categoriesId,
  };

  const sendForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("errorMessage", errorMessage);
    console.log("dataForm", dataForm);
    if (typeof dreamContent === "object") {
      const uplVideoLink = await uploadedVideo(videoDream);
      console.log("uplVideoLink", uplVideoLink);
    }

    onApproval();
    // await create(dataForm); TODO create in firebase
  };

  const handleChangeCounty = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  return (
    <div className={css.bg}>
      <form onSubmit={sendForm}>
        <fieldset>
          <legend>Some info about yourself</legend>
          {errorMessage && <dialog open>{errorMessage}</dialog>}

          <h4>
            Nisl, nisi, risus ut iaculis. Tristique porttitor dui, et, vitae eget ut tristique. Massa luctus nunc non
            velit nisi.
          </h4>
          <input
            onChange={(e) => setFullName(e.target.value)}
            className={css.input}
            type="text"
            id="fullname"
            placeholder="Your full name"
          />
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className={css.input}
            type="mail"
            id="email"
            placeholder="Email"
          />
          <select name="country" id="country" value={country} onChange={handleChangeCounty}>
            <option defaultValue={country} value="-1">
              {country}
            </option>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {countries && countries.map((item, i) => <option key={`${item.name} ${i}`}>{item.name}</option>)}
          </select>
          <label htmlFor="acceptPrivacy">
            <input
              type="checkbox"
              id="acceptPrivacy"
              onChange={() => setAcceptPrivacy(!acceptPrivacy)}
              checked={acceptPrivacy}
            />
            I have read and approve the Terms and Conditions and Privary policy
          </label>
        </fieldset>
        <button className={css.btnSendForm} type="submit">
          Send dream
        </button>
      </form>
    </div>
  );
};

export default DreamForm;
