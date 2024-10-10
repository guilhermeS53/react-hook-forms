import React from "react";
import formLogo from "./assets/form-logo.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./App.css";

const schema = yup
  .object({
    name: yup.string().required("O nome é obrigatório"),
    email: yup
      .string()
      .email("O email deve ser válido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("A senha é obrigatória"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "As senhas precisam coincidir")
      .required("Confirmação de senha é obrigatória"),
  })
  .required();

function App() {
  const {
    register, // mapeia qual campo é qual
    handleSubmit,
    watch, // fica monitorando o campo
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(userData) {
    console.log(userData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <img src={formLogo} alt="logomarca" />
      <label>
        Nome
        <input type="text" {...register("name", { required: true })} />
        <span>{errors.name?.message}</span>
      </label>
      <label>
        Email
        <input type="text" {...register("email")} />
        <span>{errors.email?.message}</span>
      </label>
      <label>
        Senha
        <input type="password" {...register("password")} />
        <span>{errors.password?.message}</span>
      </label>
      <label>
        Confirmar Senha
        <input type="password" {...register("confirmPassword")} />
        <span>{errors.confirmPassword?.message}</span>
      </label>

      <button type="submit">Cadastrar-se</button>
    </form>
  );
}

export default App;
