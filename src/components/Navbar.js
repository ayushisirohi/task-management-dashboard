import { NavLink } from "react-router-dom";
import { SunIcon, MoonIcon, SparklesIcon } from "@heroicons/react/solid";

const Navbar = ({ toggleTheme, darkMode }) => {
  return (
    <nav className="flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 z-50 text-sm">
      <div className="flex items-center gap-4">
        <NavLink to="/" className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold text-md hover:scale-110 transition">
          <SparklesIcon className="w-4 h-4 text-yellow-400" />
          Tasks
        </NavLink>
        <NavLink
          to="/completed"
          className={({ isActive }) =>
            `text-gray-600 dark:text-gray-300 transition hover:text-blue-500 ${
              isActive ? "text-blue-600 dark:text-blue-400 font-semibold underline" : ""
            }`
          }
        >
          Completed
        </NavLink>
      </div>
      <button
        onClick={toggleTheme}
        className="p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition transform hover:rotate-12"
      >
        {darkMode ? <SunIcon className="w-5 h-5 text-yellow-500" /> : <MoonIcon className="w-5 h-5 text-gray-700" />}
      </button>
    </nav>
  );
};

export default Navbar;
