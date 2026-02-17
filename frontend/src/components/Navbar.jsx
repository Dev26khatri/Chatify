import useAuthUser from "../hooks/useAuthUser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BellIcon, LogOut, Palette, ShipWheelIcon } from "lucide-react";
import useLogoutUser from "../hooks/useLogout";
import ThemeSelector from "./ThemeSelector";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logOutMutaion } = useLogoutUser();

  return (
    <nav className="bg-base-200  border-base-300 sticky h-16 top-0 z-30 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* Logo only In the Chat Page  */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex justify-center items-center gap-1  ">
                <ShipWheelIcon className="text-primary size-9" />
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  Chatify
                </h1>
              </Link>
            </div>
          )}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to={"/notification"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="size-5" />
              </button>
            </Link>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeSelector />
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to={"/notification"}>
              <button className="btn btn-ghost btn-circle size-7 mx-1">
                <img src={authUser?.profilePic} alt="" />
              </button>
            </Link>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link>
              <button
                className="btn btn-ghost btn-circle"
                onClick={logOutMutaion}
              >
                <LogOut className="size-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
