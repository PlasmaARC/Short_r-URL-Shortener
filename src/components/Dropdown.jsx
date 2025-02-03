import PropTypes from "prop-types";
import { useState } from "react";
import useFetch from "@/hooks/use-fetch";
import { logout } from "@/db/apiAuth";
import { Link, useNavigate } from "react-router-dom";
import { UrlState } from "@/context";
import { BeatLoader } from "react-spinners";
import home from "../assets/home.svg";

const Dropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { fn: fnLogout, loading } = useFetch(logout);
  const { setUser } = UrlState();

  return (
    <div className="m-5 w-auto rounded-lg bg-slate-50  ">
      <div className="w-auto relative inline-block text-center rounded-md bg-none">
        <div
          className="w-auto flex items-center cursor-pointer gap-2 p-1 rounded-md bg-slate-50 bg-opacity-20 backdrop-blur-md shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border border-red-900 dark:border-white">
            <img
              // eslint-disable-next-line react/prop-types
              src={user?.user_metadata?.profile_pic}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-semibold text-sm text-black">
            {user?.user_metadata?.name || "Guest"}
          </span>
          <svg
            className="w-5 h-5 text-gray-900 dark:text-white"
            viewBox="0 0 20 20"
            fill="#000"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute px-4 py-3 bg-slate-50 text-black rounded-lg shadow-lg  mt-2 transition transform opacity-100 scale-100">
            <ul className="space-y-3 text-sm">
              <li className="font-medium ">
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/dashboard"
                  className="flex items-center transition-colors duration-200 hover:text-red-700"
                >
                  <div className="mr-3">
                    <svg
                      className="w-6 h-6 text-black"
                      fill="#000"
                      stroke="black"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  Dashboard
                </Link>
              </li>
              <li className="font-medium">
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/"
                  className="flex items-center transition-colors duration-200 hover:text-red-700"
                >
                  <div className="mr-3">
                    {/* <svg
                      className="w-6 h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg> */}

                    <img src={home} alt="A home" />
                  </div>
                  Home
                </Link>
              </li>
              <hr className="border-black" />
              <li className="font-medium">
                <a
                  href="#"
                  className="flex items-center transition-colors duration-200 hover:text-red-700"
                >
                  <div className="mr-3 text-black">
                    {/* <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg> */}
                  </div>
                  <button
                    onClick={async () => {
                      console.log("Logout button clicked");
                      try {
                        await fnLogout();
                        setUser(null); // ✅ Immediately clear user data
                        navigate("/");
                      } catch (error) {
                        console.error("Logout failed:", error);
                      }
                    }}
                    className="w-full px-3 py-2 text-sm bg-red-700 cursor-pointer focus:opacity-50 text-white rounded-md"
                  >
                    {loading ? (
                      <BeatLoader width={"25%"} color="#000" />
                    ) : (
                      "Log Out"
                    )}
                  </button>
                  {/* Logout functionality */}
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  user: PropTypes.shape({
    user_metadata: PropTypes.shape({
      name: PropTypes.string, // Ensuring name is a string
    }),
  }),
};

export default Dropdown;
