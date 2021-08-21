import Link from "next/link";
import React, { FC } from "react";

import { DreamData } from "../../../@types/dreamData";
import css from "./UserCard.module.css";

type DreamType = {
  dream: DreamData;
  onRemove: (id: string) => void;
};

const UserCard: FC<DreamType> = ({ dream, onRemove }) => {
  return (
    <div className={css.userCart}>
      <Link href="#">
        <a className={css.userCartInner}>
          <button type="button" onClick={() => onRemove(dream.id)}>
            Remove dream
          </button>
          <div>{dream?.fullName}</div>
          <div>{dream?.country}</div>
        </a>
      </Link>
    </div>
  );
};

export default UserCard;
