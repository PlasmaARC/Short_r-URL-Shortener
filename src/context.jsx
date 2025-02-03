/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "./db/apiAuth";
import useFetch from "./hooks/use-fetch";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);
  const [currentUser, setCurrentUser] = useState(null); // ✅ Store user state locally

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setCurrentUser(user); // ✅ Update local user state when `user` changes
  }, [user]);

  const isAuthenticated = currentUser?.role === "authenticated";

  return (
    <UrlContext.Provider
      value={{
        user: currentUser,
        setUser: setCurrentUser,
        fetchUser,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
