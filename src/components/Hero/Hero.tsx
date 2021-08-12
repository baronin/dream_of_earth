import React, { useEffect, useState } from "react";

import DreamWizard from "../DreamWizard/DreamWizard";
import Modal from "../Modal";
import css from "./Hero.module.css";

const ACCESS_TOKEN = "47eb604b883b7693c7a80131f18d4d10"; // yaroslav.baronin@outlook.com

const Hero = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // hN7Dte3z5OUMyotwVNhh3GxQjw17GTtUFWcn
  // 32b73487c41b60da5a4907849094d416
  // user145921040
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("https://api.vimeo.com/videos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${ACCESS_TOKEN}`,
          Accept: " application/vnd.vimeo.user+json;version=3.0,application/vnd.vimeo.video+json;version=3.4",
        },
      });
      response = await response.json();
      setDataUser(response);
    }

    fetchMyAPI();
  }, []);

  console.log("dataUser", dataUser, dataUser.uri);
  return (
    <section className={css.hero}>
      <div className={`${css.heroContainer} container`}>
        <div className={css.heroPreview}>
          <h1>What does the world dream of?</h1>
          <p>
            Deploy offline this discussion for product launch the right info at the right time to the right people.
            Cloud strategy killing it we need distributors to evangelize the new line to local markets, for exposing
            new.
          </p>
          <button type="button" className={css.shareLink} onClick={() => setIsOpen(!isOpen)}>
            Share your dream
          </button>
        </div>
        <div className={css.heroEarth} />
      </div>
      <Modal active={isOpen} setActive={setIsOpen}>
        <DreamWizard closeModal={() => setIsOpen(false)} />
      </Modal>
    </section>
  );
};

export default Hero;
