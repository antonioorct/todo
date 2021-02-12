import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import http from "../services/httpService";
import { sendRegisterInfo } from "../services/authService";

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="username"
          ref={register}
          autoFocus
          autoComplete="off"
        />
        <p className="validationError">{errors.username?.message}</p>

        <input type="email" name="email" ref={register} autoComplete="off" />
        <p className="validationError">{errors.email?.message}</p>

        <input
          type="password"
          name="password"
          ref={register}
          autoComplete="off"
        />
        <p className="validationError">{errors.password?.message}</p>

        <input
          type="password"
          name="repeatPassword"
          ref={register}
          autoComplete="off"
        />
        <p className="validationError">{errors.repeatPassword?.message}</p>

        <p className="validationError" style={{ color: error?.color }}>
          {error?.message}
        </p>
        <button type="submit">Register</button>
      </form>

      <a href="/login">
        <button>Back to login</button>
      </a>
    </div>
  );
}
