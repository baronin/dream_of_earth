import React from "react";

import css from "./DreamWizard.module.css";

type Props = {
  onSelect: (type: "Video" | "Text") => void;
};

const DreamSelect = (props: Props) => {
  const { onSelect } = props;
  return (
    <div>
      <h3>Share your dream</h3>
      <p>
        Deploy offline this discussion for product launch the right info at the right time to the right people. Cloud
        strategy killing it we need distributors to evangelize the new line to local markets, for exposing new.
      </p>
      <h4>SELECT DREAM TYPE</h4>
      <div className={css.selectDreamTypeWrap}>
        <button type="button" className={css.btnRecordVideo} onClick={() => onSelect("Video")}>
          <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M64.7187 45.9541L58.083 48.1669V45.3336C58.083 44.2064 57.6352 43.1254 56.8382 42.3284C56.0412 41.5313 54.9602 41.0836 53.833 41.0836H36.833C35.7058 41.0836 34.6248 41.5313 33.8278 42.3284C33.0308 43.1254 32.583 44.2064 32.583 45.3336V62.3336C32.583 63.4607 33.0308 64.5417 33.8278 65.3388C34.6248 66.1358 35.7058 66.5836 36.833 66.5836H53.833C54.9602 66.5836 56.0412 66.1358 56.8382 65.3388C57.6352 64.5417 58.083 63.4607 58.083 62.3336V59.5002L64.7187 61.7131C64.9318 61.784 65.1587 61.8033 65.3807 61.7693C65.6027 61.7354 65.8134 61.6491 65.9955 61.5176C66.1776 61.3862 66.3259 61.2133 66.428 61.0133C66.5302 60.8133 66.5833 60.5918 66.583 60.3672V47.2999C66.5833 47.0753 66.5302 46.8539 66.428 46.6538C66.3259 46.4538 66.1776 46.281 65.9955 46.1495C65.8134 46.018 65.6027 45.9318 65.3807 45.8978C65.1587 45.8638 64.9318 45.8831 64.7187 45.9541V45.9541Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.9165 46.7501H1.4165C2.615 40.2731 2.41667 36.6068 5.97534 35.0825L18.4165 29.7501V24.0835C18.4165 24.0835 15.739 23.0918 15.739 17.0001C12.9595 17.0001 12.9595 11.3335 15.739 11.3335C15.739 10.5175 11.081 4.44847 16.9347 5.6668C18.3258 0.000136614 32.0392 0.000136614 33.4303 5.6668C33.612 6.64672 33.5953 7.65312 33.3812 8.62646C33.1671 9.5998 32.7598 10.5203 32.1837 11.3335C34.8782 11.3335 34.1415 17.0001 32.2035 17.0001C32.2035 23.0918 29.7498 24.0835 29.7498 24.0835V29.7501L42.191 35.0825C42.4007 35.1715 42.6051 35.2728 42.803 35.3856"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Record a video dream
        </button>
        <button type="button" onClick={() => onSelect("Text")}>
          <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M66.5832 48.1668C66.5832 48.9182 66.2847 49.6389 65.7533 50.1703C65.222 50.7016 64.5013 51.0001 63.7498 51.0001H32.5832L21.2498 62.3334V51.0001H4.24984C3.49839 51.0001 2.77772 50.7016 2.24637 50.1703C1.71502 49.6389 1.4165 48.9182 1.4165 48.1668V8.50011C1.4165 7.74866 1.71502 7.02799 2.24637 6.49664C2.77772 5.96529 3.49839 5.66678 4.24984 5.66678H63.7498C64.5013 5.66678 65.222 5.96529 65.7533 6.49664C66.2847 7.02799 66.5832 7.74866 66.5832 8.50011V48.1668Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M15.583 34H52.4163" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M15.583 19.8336H52.4163"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Write a text dream
        </button>
      </div>
    </div>
  );
};

export default DreamSelect;
