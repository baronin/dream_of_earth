import { FormEvent, useState } from "react";

import FormMessage from "../../../components/FormMessage";
import validate from "../../../utilities/validate";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmail = (e: { target: HTMLInputElement }) => {
    const { target } = e;
    setEmail(target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      validate(email, "Error email");
    }
    if (!password) {
      validate(email, "Error password");
    }
  };
  console.log("submit errors | ", error);

  return (
    <section>
      <h2>Login form</h2>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address {error}
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
            <input type="password" className="form-control" id="password" autoComplete={"8888"} />
          </label>
        </div>
        <div className="mb-3 form-check">
          <label className="form-check-label" htmlFor="exampleCheck1">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
