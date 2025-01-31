import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
//SearchParams helps to get the url search string

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("login");
  return (
    <div className="mt-10 flex flex-col items-center gap-10">
      <h1 className="text-white text-3xl font-bold">
        {searchParams.get("createNew")
          ? "You need to Login first...."
          : "LogIn / SignUp"}
      </h1>
      {/* Now Make a login and signup functionality using Supabase */}
      <div className="border-2 border-white p-3">
        <div className="w-[400px] text-white">
          <div className="flex border-b gap-3">
            <button
              className={`px-4 py-2 font-bold rounded-md cursor-pointer bg-blue-700  ${
                activeTab === "login" ? "ring ring-white" : ""
              }`}
              onClick={() => setActiveTab("login")}
            >
              LogIn
            </button>
            <button
              className={`px-4 py-2 font-bold rounded-md cursor-pointer bg-emerald-800 ${
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
    </div>
  );
};

export default Auth;
