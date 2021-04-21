import { GetServerSideProps } from "next";
import { QueryClient, useQueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import Header from "../components/Header";
import Hero from "../components/Hero";
import TopUsers from "../components/TopUsers";
import UserList from "../components/UserList/UserList";
import { Dream } from "../model/Vimeo";
import styles from "../styles/Home.module.css";
import { apiGetAmbassadorDreams, apiGetDreams } from "../utilities/api/videos";

const Home: React.FC = () => {
  const queryClient = useQueryClient();
  const featuredVideos = queryClient.getQueryData<Dream[]>("ambassadorDreams");
  const videos = queryClient.getQueryData<Dream[]>("dreams");

  return (
    <div className={styles.app}>
      <Header />
      <Hero />
      <TopUsers />
      <UserList />
      <p>{featuredVideos?.[0].id}</p>
      <p>{featuredVideos?.[0].sentBy}</p>
      <p>{featuredVideos?.[0].location}</p>
      <p>{videos?.[0].id}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("ambassadorDreams", apiGetAmbassadorDreams);
  await queryClient.prefetchQuery("dreams", apiGetDreams);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
