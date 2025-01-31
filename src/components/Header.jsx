import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";
import Dropdown from "./Dropdown";

const Header = () => {
  //We need to navigate to Auth when clicking on Logi in
  //for that we need Navigation from react-router-dom
  const navigate = useNavigate();
  //we will make a dropdown for user if loggedin
  const user = false;
  return (
      <nav className=" flex justify-between items-center w-full">
        <div className="flex items-center">
        <NavLink to="/">
          <img src={logo} alt="A logo"
          width={75} />
        </NavLink>
        <span className="text-white text-3xl font-bold ">URL KING</span>
        </div>
        {!user ? (
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => navigate("/auth")}
          >
            Login
          </button>
        ) : (
          <Dropdown />
        )}
      </nav>
  );
};

export default Header;
