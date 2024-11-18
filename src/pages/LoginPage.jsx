import {useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

function LoginPage() {

  const {register, handleSubmit, formState: errors} = useForm();

  const {signin, errors: signinErrors, isAuthenticated} = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit ((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center show'>
      <div className='bg-zinc-100 max-w-lg w-full p-10 rounded-md shadow-md'>
      {
        signinErrors.map((error, i) => (
          <div key={i} className="bg-red-500 pd-2">
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit}>

        <h1 className='text-2xl font-bold text-center'>INICIO DE SESIÓN</h1>

        <p className='text-center text-slate-600 mb-4'>Bienvenido de nuevo</p>

        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full border-2 px-4 py-2 rounded-md my-2"
          placeholder="Email"
        />
         {
          errors.email && 
          <p className="text-red-500">Email is required</p>
        }
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full border-2 px-4 py-2 rounded-md my-2"
          placeholder="Password"
        />
         {
          errors.password && 
          <p className="text-red-500">Password is required</p>
        }

        <button className='bg-slate-950 w-full p-2 rounded-md hover:bg-slate-800 transition-colors mt-2 text-white' type="submit">Iniciar sesion</button>
        <button
            className="flex justify-center gap-2 items-center bg-white w-full p-2 rounded-md hover:bg-slate-100 transition-colors mt-2 text-black"
            type="submit"
          >
            Continúa con Google
            <FaGoogle />
          </button>
      </form>
      <p className='flex gap-x-2 justify-between mt-2'>No tienes una cuenta aún? 
        <Link to="/register" className='flex justify-between gap-1 items-center text-sky-500 font-semibold hover:text-sky-600 transition-colors'>Registrarse <FaExternalLinkAlt className='w-3 h-3' /></Link>
       </p>
      </div>
    </div>
  )
}

export default LoginPage