import Image from "next/image";
import { FC } from "react";

import css from "../Hero/Hero.module.css";

// import Check from "../../assets/images/icons/check.svg";

type Props = {
  resetForm: () => void;
};

const DreamApproval: FC<Props> = ({ resetForm }) => {
  return (
    <div>
      <div className="dreamApprovalWrap">
        <Image src="/check.svg" alt="kj" width="64" height="64" />
        <h3>Your dream has been sent for approval!</h3>
        <p>
          You will recieve an email when your dream is published with a link to it. If you wish to remove your dream,
          there will be a removal link in the email, so please save it.
        </p>
        <button type="button" className={css.shareLink} onClick={resetForm}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DreamApproval;
