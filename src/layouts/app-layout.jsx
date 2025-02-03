import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen">
        <Header/>
        <Outlet/>
      </main>
      {/* <div className="text-center bg-[#ececee] p-10 font-bold ">
        Made with Love 😍 by PlasmaARC
      </div> */}
      <Footer/>
    </div>
  );
};

export default AppLayout;
