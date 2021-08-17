import { FC, useEffect, useState } from "react";

import { videosUserHasUploaded } from "../../api/uploadVideo";
import css from "./Hero.module.css";

const ACCESS_TOKEN = "47eb604b883b7693c7a80131f18d4d10"; // yaroslav.baronin@outlook.com

type Props = {
  isToggleModal: () => void;
};

const Hero: FC<Props> = ({ isToggleModal }) => {
  // hN7Dte3z5OUMyotwVNhh3GxQjw17GTtUFWcn
  // 32b73487c41b60da5a4907849094d416
  // user145921040
  // const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      const data = await videosUserHasUploaded();
      console.log("data", data.data);
    }

    fetchMyAPI();
  }, []);

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
          <button type="button" className={css.shareLink} onClick={isToggleModal}>
            Share your dream
          </button>
        </div>
        <div className={css.heroEarth} />
      </div>
    </section>
  );
};

export default Hero;
