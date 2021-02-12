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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="username" ref={register} autoFocus />
        <br />
        <span className="validationError">{errors.username?.message}</span>
        <br />

        <input
          type="password"
          name="password"
          ref={register}
          autoComplete="on"
        />
        <br />
        <span className="validationError">{errors.password?.message}</span>

        <p className="validationError" style={{ color: error?.color }}>
          {error?.message}
        </p>

        <button type="submit">Login</button>
      </form>

      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}
