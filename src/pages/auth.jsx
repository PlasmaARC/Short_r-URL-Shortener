import { useNavigate, useSearchParams } from "react-router-dom";
import { useState,useEffect } from "react";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { UrlState } from "@/context";
//SearchParams helps to get the url search string

const Auth = () => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {isAuthenticated, loading} = UrlState()
  const longLink = searchParams.get("createNew")
  
  // console.log("Loading:", loading, "Authenticated:", isAuthenticated);
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    if(isAuthenticated &&!loading){
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
    }
  }, [isAuthenticated, loading, longLink, navigate])
  

  return (
    <div className="mt-10  flex flex-col items-center gap-10">
      <h1 className="text-white text-3xl font-bold">
        {searchParams.get("createNew")
          ? "You need to Login first...."
          : "LogIn / SignUp"}
      </h1>
      {/* Now Make a login and signup functionality using Supabase */}
      {/* <div className="bg-green-600 p-2"> */}
        <div className=" w-[375px] text-white bg-slate-100 rounded-2xl p-2">
          <div className="flex gap-2 bg-none p-1 items-center justify-evenly">
            <button
              className={`w-[50%] font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer bg-black  ${
                activeTab === "login" ? "ring ring-white" : ""
              }`}
              onClick={() => setActiveTab("login")}
            >
              LogIn
            </button>
            <button
              className={`w-[50%] font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer bg-black ${
                activeTab === "signup" ? "ring ring-white" : ""
              }`}
              onClick={() => setActiveTab("signup")}
            >
              SignUp
            </button>
          </div>
          <div className="pt-4">
            {activeTab === "login" && (
              <div>
                <Login/>
              </div>
            )}
            {activeTab === "signup" && (
              <div>
                <Signup/>
              </div>
            )}
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Auth;
