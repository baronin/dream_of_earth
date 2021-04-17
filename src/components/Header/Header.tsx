import Link from "next/link";
import React from "react";

import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <div className={`${css.headerContainer} container`}>
        <Link href="#">
          <a className={css.header__logoLink}>
            <svg width="136" height="59" viewBox="0 0 136 59" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.611723 0.711045H6.90312C8.02599 0.711045 9.04153 0.892686 9.94974 1.25597C10.8745 1.61925 11.6588 2.16418 12.3028 2.89074C12.9633 3.60079 13.467 4.50074 13.8137 5.59059C14.177 6.66393 14.3587 7.9189 14.3587 9.35552C14.3587 10.7921 14.177 12.0554 13.8137 13.1452C13.467 14.2186 12.9633 15.1185 12.3028 15.8451C11.6588 16.5551 10.8745 17.0918 9.94974 17.4551C9.04153 17.8184 8.02599 18 6.90312 18H0.611723V0.711045ZM6.90312 15.102C8.12507 15.102 9.09107 14.747 9.80112 14.0369C10.5277 13.3104 10.891 12.204 10.891 10.7178V7.99321C10.891 6.50706 10.5277 5.40895 9.80112 4.6989C9.09107 3.97233 8.12507 3.60905 6.90312 3.60905H3.88127V15.102H6.90312ZM20.8347 18H17.5651V0.711045H25.3675C26.1601 0.711045 26.8701 0.834892 27.4976 1.08258C28.1251 1.33028 28.6535 1.69356 29.0828 2.17243C29.5287 2.63479 29.8672 3.19623 30.0984 3.85674C30.3461 4.51726 30.4699 5.25208 30.4699 6.06121C30.4699 7.25013 30.1975 8.27393 29.6525 9.1326C29.1241 9.99127 28.3233 10.6022 27.2499 10.9655L30.7919 18H27.1508L23.9308 11.3371H20.8347V18ZM25.0455 8.58767C25.6729 8.58767 26.1683 8.42255 26.5316 8.09229C26.8949 7.74552 27.0765 7.25839 27.0765 6.6309V5.49152C27.0765 4.86403 26.8949 4.38515 26.5316 4.0549C26.1683 3.72464 25.6729 3.55951 25.0455 3.55951H20.8347V8.58767H25.0455ZM33.8896 18V0.711045H45.2835V3.60905H37.1592V7.79506H44.3423V10.6931H37.1592V15.102H45.2835V18H33.8896ZM59.318 18L57.9309 13.5911H51.7881L50.4258 18H47.1067L52.9028 0.711045H56.9649L62.7114 18H59.318ZM54.9091 3.68336H54.7852L52.5808 10.7921H57.1383L54.9091 3.68336ZM78.1891 5.59059H78.09L76.7525 8.33998L73.2105 14.8791L69.6685 8.33998L68.3309 5.59059H68.2318V18H65.1357V0.711045H68.8263L73.26 9.15737H73.3591L77.7432 0.711045H81.2853V18H78.1891V5.59059ZM90.9635 18V0.711045H102.085V3.60905H94.233V7.79506H101.069V10.6931H94.233V18H90.9635ZM111.269 18.2972C110.129 18.2972 109.097 18.1073 108.173 17.7275C107.248 17.3477 106.455 16.778 105.795 16.0185C105.151 15.2589 104.647 14.3259 104.284 13.2195C103.921 12.1132 103.739 10.8252 103.739 9.35552C103.739 7.90239 103.921 6.62265 104.284 5.51628C104.647 4.39341 105.151 3.45218 105.795 2.69259C106.455 1.933 107.248 1.3633 108.173 0.983507C109.097 0.603711 110.129 0.413813 111.269 0.413813C112.408 0.413813 113.44 0.603711 114.365 0.983507C115.29 1.3633 116.082 1.933 116.743 2.69259C117.403 3.45218 117.907 4.39341 118.254 5.51628C118.617 6.62265 118.799 7.90239 118.799 9.35552C118.799 10.8252 118.617 12.1132 118.254 13.2195C117.907 14.3259 117.403 15.2589 116.743 16.0185C116.082 16.778 115.29 17.3477 114.365 17.7275C113.44 18.1073 112.408 18.2972 111.269 18.2972ZM111.269 15.3992C112.507 15.3992 113.49 14.9864 114.216 14.1608C114.959 13.3351 115.331 12.1792 115.331 10.6931V8.01798C115.331 6.53182 114.959 5.37592 114.216 4.55028C113.49 3.72464 112.507 3.31182 111.269 3.31182C110.03 3.31182 109.04 3.72464 108.297 4.55028C107.57 5.37592 107.207 6.53182 107.207 8.01798V10.6931C107.207 12.1792 107.57 13.3351 108.297 14.1608C109.04 14.9864 110.03 15.3992 111.269 15.3992ZM125.261 18H121.992V0.711045H129.794C130.587 0.711045 131.297 0.834892 131.924 1.08258C132.552 1.33028 133.08 1.69356 133.51 2.17243C133.955 2.63479 134.294 3.19623 134.525 3.85674C134.773 4.51726 134.897 5.25208 134.897 6.06121C134.897 7.25013 134.624 8.27393 134.079 9.1326C133.551 9.99127 132.75 10.6022 131.677 10.9655L135.219 18H131.578L128.358 11.3371H125.261V18ZM129.472 8.58767C130.1 8.58767 130.595 8.42255 130.958 8.09229C131.322 7.74552 131.503 7.25839 131.503 6.6309V5.49152C131.503 4.86403 131.322 4.38515 130.958 4.0549C130.595 3.72464 130.1 3.55951 129.472 3.55951H125.261V8.58767H129.472ZM0.654625 59V27.8911H21.1562V33.1056H6.53768V40.6377H19.4626V45.8523H6.53768V53.7855H21.1562V59H0.654625ZM46.4092 59L43.9133 51.0668H32.8603L30.409 59H24.4368L34.8659 27.8911H42.1751L52.5151 59H46.4092ZM38.476 33.2394H38.2531L34.2865 46.0305H42.4871L38.476 33.2394ZM62.7603 59H56.8772V27.8911H70.9163C72.3425 27.8911 73.6201 28.114 74.7492 28.5597C75.8783 29.0053 76.8291 29.659 77.6016 30.5207C78.4038 31.3526 79.0129 32.3628 79.4289 33.5513C79.8746 34.7398 80.0974 36.062 80.0974 37.5179C80.0974 39.6572 79.6072 41.4994 78.6267 43.0444C77.6759 44.5895 76.2348 45.6888 74.3035 46.3425L80.6768 59H74.1253L68.3313 47.011H62.7603V59ZM70.3369 42.0639C71.466 42.0639 72.3574 41.7668 73.011 41.1726C73.6647 40.5486 73.9915 39.6721 73.9915 38.543V36.4929C73.9915 35.3638 73.6647 34.5021 73.011 33.9079C72.3574 33.3136 71.466 33.0165 70.3369 33.0165H62.7603V42.0639H70.3369ZM97.3744 33.1056V59H91.4913V33.1056H82.6668V27.8911H106.199V33.1056H97.3744ZM129.646 45.8523H116.676V59H110.793V27.8911H116.676V40.6377H129.646V27.8911H135.529V59H129.646V45.8523Z"
                fill="white"
              />
            </svg>
          </a>
        </Link>
        <div className="header__right-col">
          <Link href="#">
            <a className={css.headerAbout}>About the initiative</a>
          </Link>
          <Link href="#">
            <a className={css.headerShareLink}>Share your dream</a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
