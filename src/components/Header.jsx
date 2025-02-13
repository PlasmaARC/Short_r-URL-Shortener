import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/black_logo.png";
import Dropdown from "./Dropdown";
import { UrlState } from "@/context";
import { BarLoader } from "react-spinners";

const Header = () => {
  //We need to navigate to Auth when clicking on Logi in
  //for that we need Navigation from react-router-dom
  const navigate = useNavigate();
  //we will make a dropdown for user if loggedin
 const {user, loading} =  UrlState()

  return (
    <>
      <nav className=" flex justify-between items-center w-full bg-gray-50 z-50">
        <div className="flex items-center">
        <NavLink to="/">
          <img src={logo} alt="A logo"
         className=" w-40 h-25 object-cover" />
        </NavLink>
        {/* <span className="text-white text-3xl font-bold ">Short_r</span> */}
        </div>
        {!user ? (
          <button
            className="text-white shadow-lg shadow-black bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => navigate("/auth")}
          >
            Login
          </button>
        ) : (
          <Dropdown user={user} />
        )}
      </nav>
      {loading && <BarLoader width={"100%"} color="#fff" />}
    </>
      
  );
};

export default Header;
