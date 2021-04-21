import React, { KeyboardEvent, MouseEvent, useEffect } from "react";

import css from "./Modal.module.css";

type Props = {
  active: boolean | undefined;
  setActive: (type: boolean) => void;
};

const Modal: React.FC<Props> = ({ active, setActive, children }) => {
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
  });
  const isKeyboardEvent = (event: MouseEvent | KeyboardEvent): event is KeyboardEvent => {
    return event.type === "keydown";
  };
  const onClose = (event: MouseEvent | KeyboardEvent) => {
    if (!(event.target as HTMLDivElement).closest(css.modal)) return;
    if (isKeyboardEvent(event) && event.code !== "Escape") return;
    console.log("close modal");
    setActive(false);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={active ? `${css.overlay} ${css.overlayActive}` : css.overlay}
      onClick={onClose}
      onKeyDown={onClose}
    >
      <div className={css.modal}>
        <button type="button" onClick={() => setActive(false)}>
          Close modal
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
