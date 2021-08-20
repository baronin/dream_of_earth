import Head from "next/head";

import Header from "../../components/Header";
import css from "../../styles/Home.module.css";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
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
      <div className="container">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
