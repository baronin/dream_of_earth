import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { QueryClient, useQueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import { DreamData } from "../../@types/dreamData";
import { deleteDream, readDreams } from "../api/dreams";
import DreamWizard from "../components/DreamWizard/DreamWizard";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Modal from "../components/Modal";
import topUserCss from "../components/TopUsers/TopUsers.module.css";
import UserCard from "../components/UserCard";
import { Dream } from "../model/Vimeo";
import css from "../styles/Home.module.css";
import { apiGetAmbassadorDreams, apiGetDreams } from "../utilities/api/videos";

const Home: React.FC = () => {
  const queryClient = useQueryClient();
  const featuredVideos = queryClient.getQueryData<Dream[]>("ambassadorDreams");
  const videos = queryClient.getQueryData<Dream[]>("dreams");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [topPeopleDreams, setTopPeopleDreams] = useState<DreamData[]>([]);

  const handleToggleModal = () => setIsOpen(!isOpen);
  useEffect(() => {
    const getDreams = async () => {
      const loadedDreams = await readDreams();
      setTopPeopleDreams(loadedDreams);
    };
    getDreams();
  }, []);
  const removeDream = async (id: string) => {
    await deleteDream(id);
    const dreamFiltered = topPeopleDreams.filter((item) => item.id !== id);
    setTopPeopleDreams(dreamFiltered);
  };
  return (
    <div className={css.app}>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
      </Head>
      <Header />
      <main>
        <Hero isToggleModal={handleToggleModal} />
        {topPeopleDreams.length > 0 && (
          <section className="TopPeople">
            <div className="container">
              <h2 style={{ textAlign: "center", fontWeight: 400 }}>Dream ambassadors</h2>
              <div className={topUserCss.topPeopleInner}>
                {topPeopleDreams.map((user) => (
                  <UserCard key={user.id} dream={user} onRemove={removeDream} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* <TopUsers /> */}
        {/* <UserList /> */}
        {/* <p>{featuredVideos?.[0].id}</p> */}
        {/* <p>{featuredVideos?.[0].sentBy}</p> */}
        {/* <p>{featuredVideos?.[0].location}</p> */}
        {/* <p>{videos?.[0].id}</p> */}
      </main>
      <footer>
        <p>© 2021 Dream for Earth </p>
      </footer>
      <Modal active={isOpen} setActive={setIsOpen}>
        <DreamWizard closeModal={() => setIsOpen(false)} />
      </Modal>
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
