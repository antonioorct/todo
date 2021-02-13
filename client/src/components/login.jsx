import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { sendLoginInfo } from "../services/authService";
import { saveJwtToLocal } from "../services/storageService";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { UserContext } from "../services/userContext";
import { getUserFromJwt } from "../services/userService";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default function Login() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState({});
  const setUser = useContext(UserContext)[1];

  const onSubmit = async ({ username, password }) => {
    setError({});

    try {
      const jwt = await sendLoginInfo(username, password);

      setError({ message: "Login successful.", color: "darkgreen" });

      saveJwtToLocal(jwt);
      setUser(getUserFromJwt(jwt));
    } catch (err) {
      setError({ ...err, color: "red" });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <form
          className="offset-3 col-6 form-group"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-center">Login</h2>
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            type="text"
            id="username"
            name="username"
            ref={register}
            autoFocus
          />
          <br />
          <span className="validation-error">{errors.username?.message}</span>
          <br />

          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            ref={register}
            autoComplete="on"
          />
          <br />
          <span className="validation-error">{errors.password?.message}</span>

          <p className="validation-error" style={{ color: error?.color }}>
            {error?.message}
          </p>

          <button className="btn btn-success" type="submit">
            Login
          </button>
          <Link to="/register">
            <button type="button" className="btn btn-primary float-right">
              Register
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
