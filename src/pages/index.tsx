import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { QueryClient, useQueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import { DreamData } from "../../@types/dreamData";
import { deleteDream, readDreams } from "../api/dreams";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TopUsers from "../components/TopUsers";
import UserCard from "../components/UserCard";
import UserList from "../components/UserList/UserList";
import { Dream } from "../model/Vimeo";
import css from "../styles/Home.module.css";
import topUserCss from "../components/TopUsers/TopUsers.module.css";

import { apiGetAmbassadorDreams, apiGetDreams } from "../utilities/api/videos";

const Home: React.FC = () => {
  const queryClient = useQueryClient();
  const featuredVideos = queryClient.getQueryData<Dream[]>("ambassadorDreams");
  const videos = queryClient.getQueryData<Dream[]>("dreams");

  const [topPeopleDreams, setTopPeopleDreams] = useState<DreamData[]>([]);
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
      <Header />
      <main>
        <Hero />
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

        {/* <TopUsers />*/}
        {/* <UserList /> */}
        {/* <p>{featuredVideos?.[0].id}</p> */}
        {/* <p>{featuredVideos?.[0].sentBy}</p> */}
        {/* <p>{featuredVideos?.[0].location}</p> */}
        {/* <p>{videos?.[0].id}</p> */}
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
