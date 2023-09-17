import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const loginDemo = async (e) => {
    let email = "demo@aa.io";
    let password = "password";
    const data = await dispatch(login(email, password));
    closeModal();
  };

  // console.log(errors);

  return (
    <>
      <div className="lf-modal">
        <h1 className="lf-title">Log In</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="lf-field">
            <label>Email</label>
            <input
              className="lf-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="lf-field">
            <label>Password</label>
            <input
              className="lf-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="lf-buttoncontainer">
            <button className="lf-button lf-login" type="submit">
              Log In
            </button>
          </div>
        </form>
        <div className="lf-buttoncontainer">
          <button className="lf-button lf-demo" onClick={loginDemo}>
            {" "}
            Demo User{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginFormModal;
