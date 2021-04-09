import { GetServerSideProps } from "next";

import videosList from "../mock/videos-list.json";
import { VimeoVideo } from "../model/Vimeo";
import styles from "../styles/Home.module.css";

const Home: React.FC<{
  featuredVideo: VimeoVideo[];
  videos: VimeoVideo[];
}> = (props) => {
  console.log(props);

  return <div className={styles.container} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      featuredVideo: videosList,
      videos: videosList,
    },
  };
};

export default Home;
