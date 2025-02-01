/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UrlState } from "@/context";
import { BarLoader } from "react-spinners";

function RequireAuth({ children }) {
  const navigate = useNavigate();

  const { loading, isAuthenticated } = UrlState();

  useEffect(() => {
    if (!isAuthenticated && !loading) navigate("/auth");

    console.log("Loading:", loading);
    console.log("Authenticated:", isAuthenticated);

  }, [isAuthenticated, loading, navigate]);

  if (loading) return <BarLoader width={"100%"} color="#36d7b7" />;

  return isAuthenticated ? children : null;
}

export default RequireAuth;
