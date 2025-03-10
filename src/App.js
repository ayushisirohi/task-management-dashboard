import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import AllTasks from "./pages/AllTasks";
import CompletedTasks from "./pages/CompletedTasks";
import { TaskProvider } from "./context/TaskContext";

const App = () => {
  const loadDarkMode = () => {
    return localStorage.getItem("darkMode") === "true";
  };
  const [darkMode, setDarkMode] = useState(loadDarkMode());
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]); 

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <TaskProvider>
      <Router>
        <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
        <div className="pt-14 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<Navigate replace to="/all-tasks" />} />
            <Route path="/all-tasks" element={<AllTasks />} />
            <Route path="/completed" element={<CompletedTasks />} />
          </Routes>
        </div>
      </Router>
    </TaskProvider>
  );
};

export default App;
