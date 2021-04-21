import React, { useEffect } from "react";

import css from "./Modal.module.css";

type Props = {
  active: boolean | undefined;
  setActive: () => void;
  children: string | JSX.Element | Array<string | JSX.Element>;
};

const Modal = (props: Props) => {
  const { active, setActive, children } = props;
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
  });
  return (
    <div className={active ? `${css.overlay} ${css.overlayActive}` : css.overlay} onClick={() => setActive(false)}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
