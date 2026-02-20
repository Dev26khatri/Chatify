import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { Link, useLocation } from "react-router";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const { data: getFriendData } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests, // No need to fetch data for sidebar, we just want to invalidate this query on accepting friend request
  });
  const incomingRequestsCount = getFriendData?.incomingReq?.length || null;
  console.log(getFriendData);
  console.log(incomingRequestsCount);

  return (
    <aside className="  h-screen  w-16 md:w-20 lg:w-64 bg-base-200 border-r border-base-200 sm:flex sm:text-lg  lg:flex md:flex  flex-col sticky top-0 transition-all duration-500 ">
      <div className="p-3 lg:p-5 border-b border-base-300  ">
        <Link
          to="/"
          className="flex justify-center lg:justify-start items-center gap-1  "
        >
          <ShipWheelIcon className="text-primary size-10 lg:size-9" />
          <h1 className="hidden lg:block  lg:p-3 text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            Chatify
          </h1>
        </Link>
      </div>
      <nav className="flex-1 p-2 lg:p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost p-2 w-full justify-center lg:justify-start gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active" : ""}`}
        >
          <HomeIcon className="size-5" />
          <span className="hidden lg:inline">Home</span>
        </Link>
        {/* <Link
          to="/friends"
          className={`btn btn-ghost p-2 w-full justify-start gap-3 px-3 normal-case ${currentPath === "/friends" ? "btn-active" : ""}`}
        >
          <UsersIcon className="size-5" />
          <span>Friends</span>
        </Link> */}
        <Link
          to="/notification"
          className={`btn btn-ghost w-full justify-center lg:justify-start gap-3 px-2 lg:px-3  normal-case relative ${currentPath === "/notification" ? "btn-active" : ""}`}
        >
          <BellIcon className="size-5" />
          <div className="hidden lg:inline">
            Notification
            <span className="ml-3 font-bold font-mono text-primary">
              {incomingRequestsCount}
            </span>
          </div>
        </Link>
      </nav>

      {/* User Profiel section */}
      <div className="p-2 lg:p-5 mt-auto  ">
        <div className="flex items-center gap-3 btn btn-ghost justify-center lg:justify-start">
          <div className="avatar">
            <div className="rounded-full bg-base-100 w-10">
              <img src={authUser?.profilePic} alt="Prfile Pic" />
            </div>
          </div>
          <div className=" hidden lg:inline-block capitalize cursor-pointer">
            <p className="text-sm font-semibold">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-success  animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
