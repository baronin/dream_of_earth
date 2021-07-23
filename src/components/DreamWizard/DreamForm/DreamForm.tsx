import React, { ChangeEvent, FC, useState } from "react";

import { DreamCategory } from "../../../../@types/dreamCategory";
import { DreamData } from "../../../../@types/dreamData";
import countries from "../../../mock/countries";
import css from "./DreamForm.module.css";

type PropsWizard = {
  dreamContent: string;
  videoDream: Blob | null;
  categories: DreamCategory[];
};

// const ACCESS_TOKEN = "45392dc057322eff77f2ea349edb606f"; bloodyave+v1@gmail.com
const ACCESS_TOKEN = "47eb604b883b7693c7a80131f18d4d10"; // yaroslav.baronin@outlook.com

const DreamForm: FC<PropsWizard> = ({ dreamContent, videoDream, categories }) => {
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
    dreamContent, // TODO need link for video dream
    categories: categoriesId,
  };
  // Пример отправки POST запроса:

  async function postData(url = "") {
    // Default options are marked with *
    if (!videoDream) {
      throw new Error("Dont have a video");
    }
    try {
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
      console.log("postData response", response);
      return response.json();
    } catch (error) {
      console.log("Error post data for vimeo", error);
      throw error;
    }
  }

  async function uploadVideo(url = "") {
    try {
      const res = await fetch(url, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Tus-Resumable": "1.0.0",
          "Upload-Offset": "0",
          "Content-Type": "application/offset+octet-stream",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
        body: videoDream,
      });
      console.log("uploadVideo", res);
    } catch (error) {
      console.log("Error post data for vimeo", error);
      throw error;
    }
  }

  async function progress(url = "") {
    try {
      const res = await fetch(url, {
        method: "HEAD",
        headers: {
          "Tus-Resumable": "1.0.0",
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
      });
      console.log("progress", res);
    } catch (error) {
      console.log("Error progress vimeo", error);
      throw error;
    }
  }
  const sendForm = async () => {
    console.log("sendForm");
    const postVideo = await postData("https://api.vimeo.com/me/videos");
    const uploadLink = await postVideo.upload.upload_link;
    console.log("uploadLink", uploadLink);
    if (uploadLink) {
      await uploadVideo(uploadLink);
      await progress(uploadLink);
    }
    // postData("https://api.vimeo.com/me/videos").then((data) => {
    //   // data.upload.upload_link;
    //   console.log(data); // JSON data parsed by `response.json()` call
    // });
    // await create(dataForm);
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
            <option defaultValue={country} value="-1">
              {country}
            </option>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {countries && countries.map((item, i) => <option key={`${item.name} ${i}`}>{item.name}</option>)}
          </select>
        </p>
        <p>
          <label htmlFor="acceptPrivacy">
            <input
              type="checkbox"
              id="acceptPrivacy"
              onChange={() => setAcceptPrivacy(!acceptPrivacy)}
              checked={acceptPrivacy}
            />
            I have read and approve the Terms and Conditions and Privary policy
          </label>
        </p>
        <button className={css.btnSendForm} type="button" onClick={sendForm}>
          Send dream
        </button>
      </form>
    </div>
  );
};

export default DreamForm;
