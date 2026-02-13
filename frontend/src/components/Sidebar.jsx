import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { Link, useLocation } from "react-router";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="h-screen w-64 bg-base-200 border-r-2 border-base-100  lg:flex flex-col sticky top-0 ">
      <div className="p-5 border-base-300 ">
        <Link to="/" className="flex justify-center items-center gap-1  ">
          <ShipWheelIcon className="text-primary size-9" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            Chatify
          </h1>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost p-2 w-full justify-start gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active" : ""}`}
        >
          <HomeIcon className="size-5" />
          <span>Home</span>
        </Link>
        <Link
          to="/friends"
          className={`btn btn-ghost p-2 w-full justify-start gap-3 px-3 normal-case ${currentPath === "/friends" ? "btn-active" : ""}`}
        >
          <UsersIcon className="size-5" />
          <span>Friends</span>
        </Link>
        <Link
          to="/notification"
          className={`btn btn-ghost p-2 w-full justify-start gap-3 px-3 normal-case ${currentPath === "/notification" ? "btn-active" : ""}`}
        >
          <BellIcon className="size-5" />
          <span>Notification</span>
        </Link>
      </nav>

      {/* User Profiel section */}
      <div className="p-5 mt-auto  ">
        <div className="flex items-center gap-3 btn btn-ghost justify-start">
          <div className="avatar">
            <div className="rounded-full bg-base-100 w-10">
              <img src={authUser?.profilePic} alt="Prfile Pic" />
            </div>
          </div>
          <div className=" capitalize cursor-pointer">
            <p className="text-sm font-semibold">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-success inline-block animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
