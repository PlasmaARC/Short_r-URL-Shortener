import PropTypes from "prop-types";
import { useState } from "react";

const Dropdown = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-40 rounded-md bg-none">
      <div className="w-40 relative inline-block text-center rounded-md bg-none">
        <div
          className="w-40 flex items-center cursor-pointer gap-1 p-1 rounded-md bg-slate-50 bg-opacity-20 backdrop-blur-md shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border border-red-900 dark:border-white">
            <img
              src="https://images.unsplash.com/photo-1610397095767-84a5b4736cbd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
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
            fill="currentColor"
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
          <div className="absolute px-5 py-3 bg-white text-black rounded-lg shadow border dark:border-transparent mt-5 transition transform opacity-100 scale-100">
            <ul className="space-y-3">
              <li className="font-medium">
                <a
                  href="#"
                  className="flex items-center transition-colors duration-200 hover:text-red-700"
                >
                  <div className="mr-3">
                    <svg
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  Account
                </a>
              </li>
              <li className="font-medium">
                <a
                  href="#"
                  className="flex items-center transition-colors duration-200 hover:text-red-700"
                >
                  <div className="mr-3">
                    <svg
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
                    </svg>
                  </div>
                  Setting
                </a>
              </li>
              <hr className="border-black" />
              <li className="font-medium">
                <a
                  href="#"
                  className="flex items-center transition-colors duration-200 hover:text-red-700"
                >
                  <div className="mr-3 text-black">
                    <svg
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
                    </svg>
                  </div>
                  Logout
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
