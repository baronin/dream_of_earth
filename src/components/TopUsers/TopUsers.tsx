import React, { useEffect, useState } from "react";

import { DreamData } from "../../../@types/dreamData";
import { deleteDream, readDreams } from "../../api/dreams";
import UserCard from "../UserCard";
import css from "./TopUsers.module.css";

const TopUsers = () => {
  const [dreams, setDreams] = useState<DreamData[]>([]);
  useEffect(() => {
    const getDreams = async () => {
      const loadedDreams = await readDreams();
      setDreams(loadedDreams);
    };
    getDreams();
  }, []);

  const removeDream = async (id: string) => {
    await deleteDream(id);
    const dreamFiltered = dreams.filter((item) => item.id !== id);
    setDreams(dreamFiltered);
    console.log("remove dream", id);
  };

  // console.log("dreams", dreams);
  return (
    <section className="TopPeople">
      <div className="container">
        <h2 style={{ textAlign: "center", fontWeight: 400 }}>Dream ambassadors</h2>
        <div className={css.topPeopleInner}>
          {dreams.length > 0 && dreams.map((dream) => <UserCard dream={dream} onRemove={removeDream} key={dream.id} />)}
        </div>
      </div>
    </section>
  );
};

export default TopUsers;
