import { FC } from "react";
import { Outlet } from "react-router-dom";
// import { Header } from "../components";

const Layout: FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 pb-20 font-roboto text-white">
      {/* <Header /> */}
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
