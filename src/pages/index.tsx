import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { QueryClient, useQueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import { getUserId } from "../api/uploadVideo";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TopUsers from "../components/TopUsers";
import UserList from "../components/UserList/UserList";
import { Dream } from "../model/Vimeo";
import css from "../styles/Home.module.css";
import { apiGetAmbassadorDreams, apiGetDreams } from "../utilities/api/videos";

const Home: React.FC = () => {
  const queryClient = useQueryClient();
  const featuredVideos = queryClient.getQueryData<Dream[]>("ambassadorDreams");
  const videos = queryClient.getQueryData<Dream[]>("dreams");
  useEffect(() => {
    const getUserVideoId = async () => {
      const getId = await getUserId();
      console.log(getId);
    };
    getUserVideoId();
  }, []);
  return (
    <div className={css.app}>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main>
        <Hero />
        <TopUsers />
        <UserList />
        <p>{featuredVideos?.[0].id}</p>
        <p>{featuredVideos?.[0].sentBy}</p>
        <p>{featuredVideos?.[0].location}</p>
        <p>{videos?.[0].id}</p>
      </main>
      <footer>
        <p>© 2021 Dream for Earth </p>
      </footer>
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
