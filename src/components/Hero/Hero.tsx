import Link from "next/link";
import React from "react";

import css from "./Hero.module.css";

const Hero = () => {
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
          <Link href="#">
            <a className={css.shareLink}>Share your dream</a>
          </Link>
        </div>
        <div className={css.heroEarth} />
      </div>
    </section>
  );
};

export default Hero;
