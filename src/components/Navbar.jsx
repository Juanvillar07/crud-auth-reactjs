import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(user)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav className="bg-zinc-100 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <h1 className="text-2xl font-bold"></h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            {/* <li>Welcome {user.username}</li> */}
            <li>
              <Link to="/add-task" className="bg-indigo-500 px-4 py-1 rounded-md hover:bg-indigo-600 transition-colors">
                Add task
              </Link>
            </li>
            <li>
              <Link to="/pythonquiz" className="bg-green-600 px-4 py-1 rounded-md hover:bg-green-700 transition-colors">
                Python quiz
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
                className="bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </Link>
            </li>
            <li>
              <img
                src={user.logo}
                alt="User Logo"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={toggleModal} // Abre el modal al hacer clic en la imagen
              />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="bg-indigo-500 px-4 py-1 rounded-md hover:bg-indigo-600 transition-colors"
              >
                Iniciar sesion
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-500 px-4 py-1 rounded-md hover:bg-indigo-600 transition-colors"
              >
                Registrarse
              </Link>
            </li>
          </>
        )}
      </ul>

       {/* Modal para mostrar la imagen ampliada */}
       {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative">
            <img
              src={user.logo}
              alt="User Logo Large"
              className="w-96 h-96 max-w-full max-h-full rounded"
            />
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-black text-2xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
