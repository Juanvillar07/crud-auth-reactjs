import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";
import PythonQuiz from "./quizes/PythonQuiz";

function App() {
  return (
    <>
      <AuthProvider>
        <TaskProvider>
          <BrowserRouter>
            <main className="container mx-auto px-10">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/pythonquiz" element={<PythonQuiz />} />
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/add-task" element={<TaskFormPage />} />
                  <Route path="/tasks/:id" element={<TaskFormPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </TaskProvider>
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;
