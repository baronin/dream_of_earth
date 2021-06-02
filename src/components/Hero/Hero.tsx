import React, { useState } from "react";

import DreamWizard from "../DreamWizard/DreamWizard";
import Modal from "../Modal";
import css from "./Hero.module.css";

const Hero = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      {/* <Modal active={isOpen} setActive={setIsOpen}>
        <form action="">
          <input className={css.inputNameDream} type="text" placeholder="text" />
        </form>
        <h3>Something about Dream for Earth</h3>
        <p>Deploy offline this discussion for product launch the right info at the right time to the right people.
          Cloud strategy killing it we need distributors to evangelize the new line to local markets, for exposing new.</p>
      </Modal> */}
      <Modal active={isOpen} setActive={setIsOpen}>
        <DreamWizard />
      </Modal>
    </section>
  );
};

export default Hero;
