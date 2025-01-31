import { Outlet } from "react-router-dom";
import Header from "@/components/Header";


const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen">
        <Header/>
        <Outlet/>
      </main>
      <div className="text-center bg-[#ececee] p-10 font-bold ">
        Made with Love 😍 by PlasmaARC
      </div>
    </div>
  );
};

export default AppLayout;
