import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      if (values.logo && values.logo[0]) {
        formData.append("logo", values.logo[0]);
      }

      await signup(formData);
    } catch (error) {
      console.log(error);
    }
  });

  function navigateUrl(url) {
    window.location.href = url;
  }

  async function auth() {
    const response = await fetch("http://localhost:3000/api/request", {
      method: "POST",
    });
    const data = await response.json();
    navigateUrl(data.url);
  }

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center show">
      <div className="bg-zinc-100 max-w-xl w-full p-10 rounded-md shadow-md">
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold text-center mb-2 text-black">
            REGISTRO
          </h1>
          <p className="text-center text-slate-500 mb-4">
            Ingresa tu información para registrarte
          </p>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              {...register("nombre")}
              className="w-full border-2 px-4 py-2 rounded-md my-2"
              placeholder="Nombres *"
            />
            <input
              type="text"
              {...register("apellido")}
              className="w-full border-2 px-4 py-2 rounded-md my-2"
              placeholder="Apellidos *"
            />
            <input
              type="text"
              {...register("telefono")}
              className="w-full border-2 px-4 py-2 rounded-md my-2"
              placeholder="Telefono"
            />
            <input
              type="file"
              {...register("logo")}
              className="w-full border-2 px-4 py-2 rounded-md my-2"
              placeholder="Seleccionar imagen"
            />

            <input
              type="text"
              {...register("username")}
              className="w-full border-2 px-4 py-2 rounded-md my-2"
              placeholder="Username *"
            />
            <input
              type="email"
              {...register("email")}
              className="w-full border-2 px-4 py-2 rounded-md my-2"
              placeholder="Email *"
            />
            <input
              type="password"
              {...register("password")}
              className="w-full border-2 px-4 py-2 rounded-md my-2 grid-cols-2"
              placeholder="Password *"
            />
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full border-2 px-4 py-2 rounded-md my-2 grid-cols-2"
              placeholder="Confirmar password *"
            />
          </div>

          <button
            className="bg-slate-950 w-full p-2 rounded-md hover:bg-slate-800 transition-colors mt-2 text-white"
            type="submit"
          >
            Registrarse
          </button>
        </form>
        <button
          className="flex justify-center gap-2 items-center bg-white w-full p-2 rounded-md hover:bg-slate-100 transition-colors mt-2 text-black"
          onClick={() => auth()}
        >
          Registrate con Google
          <FaGoogle />
        </button>
        <p className="flex gap-x-2 mt-2">
          Ya tienes una cuenta?
          <Link
            to="/login"
            className="flex justify-between gap-1 items-center text-sky-500 font-semibold hover:text-sky-600 transition-colors"
          >
            Iniciar sesión
            <FaExternalLinkAlt className="w-3 h-3" />
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
