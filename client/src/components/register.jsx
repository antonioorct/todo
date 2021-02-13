import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendRegisterInfo } from "../services/authService";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  username: yup.string().required().min(4).label("username"),
  email: yup.string().required().email().label("E-mail"),
  password: yup
    .string()
    .min(4)
    .required()
    .matches(/[0-9]+/, {
      message: "The password field must contain at least one number.",
    }),
  repeatPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must be the same")
    .label("Repeat password"),
});

export default function Login() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState({});

  const onSubmit = async ({ username, email, password }) => {
    setError({});

    try {
      await sendRegisterInfo(username, email, password);

      setError({ message: "Registration successful.", color: "darkgreen" });
    } catch (err) {
      if (err.statusCode == 422)
        err.message = `That ${err.message.match(
          /email|username/
        )} is taken. Please choose another one.`;

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
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            type="text"
            id="username"
            name="username"
            ref={register}
            autoFocus
            autoComplete="off"
          />
          <p className="validation-error">{errors.username?.message}</p>

          <label htmlFor="email">E-mail</label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            ref={register}
            autoComplete="off"
          />
          <p className="validation-error">{errors.email?.message}</p>

          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            ref={register}
            autoComplete="off"
          />
          <p className="validation-error">{errors.password?.message}</p>

          <label htmlFor="repeatPassword">Repeat password</label>
          <input
            className="form-control"
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            ref={register}
            autoComplete="off"
          />
          <p className="validation-error">{errors.repeatPassword?.message}</p>

          <p className="validation-error" style={{ color: error?.color }}>
            {error?.message}
          </p>
          <button className="btn btn-success" type="submit">
            Register
          </button>

          <Link to="/login">
            <button className="btn btn-primary float-right" type="submit">
              Back to login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
