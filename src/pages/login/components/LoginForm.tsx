import { FormEvent, useState } from "react";

import { authComplete } from "../../../api/dreams";
import FormMessage from "../../../components/FormMessage";
import { useAuth } from "../../../contexts/FirebaseAuth/context";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup, currentUser } = useAuth();

  const handleEmail = (e: { target: HTMLInputElement }) => {
    const { target } = e;
    setEmail(target.value);
  };
  const handlePassword = (e: { target: HTMLInputElement }) => {
    const { target } = e;
    setPassword(target.value);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
    } catch (err) {
      setError("Error signup");
      throw Error(`test error ${err}`);
    }
    setLoading(false);
  };
  console.log("submit errors | ", error);

  return (
    <section>
      <h2>Login form</h2>
      <h3>Error ? {error}</h3>
      <h4>Current user {currentUser && JSON.stringify(currentUser)}</h4>
      {loading && <pre>LOADING...</pre>}
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
            <input
              onChange={handleEmail}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </label>

          <div id="emailHelp" className="form-text">
            We&apos;ll never share your email with anyone else.
          </div>
          <FormMessage>test</FormMessage>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
            <input
              onChange={handlePassword}
              type="password"
              className="form-control"
              id="password"
              autoComplete="8888"
            />
          </label>
        </div>
        <div className="mb-3 form-check">
          <label className="form-check-label" htmlFor="exampleCheck1">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isDisabled}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
