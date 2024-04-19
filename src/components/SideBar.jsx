import { Link, useLocation } from "react-router-dom";
import { IoHomeSharp, IoSettings } from "react-icons/io5";
import { FaUsers, FaUserTimes } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { MdManageAccounts } from "react-icons/md";

export default function SideBar() {
  const location = useLocation();
  return (
    // <div className="flex">
    <div className="w-[27%] h-screen p-3 md:p-6 bg-purple-500 text-white">
      <div className="flex md:items-center items-stretch mb-8">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/attendance-app-90eb5.appspot.com/o/logoraybit-new.png_2460.png?alt=media&token=67f2abbc-8416-4cf1-a19c-9944bbf12699"
          alt="Raybit Technologies"
          className="w-48"
        />
      </div>
      <div className="py-4 flex flex-col items-center md:items-stretch">
        <Link
          to="/dashboard"
          className={
            location.pathname === "/dashboard"
              ? "px-4 py-3 cursor-pointer bg-purple-800/70 rounded-3xl text-white font-bold mb-3"
              : "px-4 py-3 cursor-pointer hover:bg-gray-500/20 rounded-3xl  mb-3"
          }
        >
          <IoHomeSharp className="inline text-2xl mr-2" />
          <p className="md:inline hidden">Dashboard</p>
        </Link>
        <Link
          to="/attendance"
          className={
            location.pathname === "/attendance"
              ? "px-4 py-3 cursor-pointer bg-purple-800/70 rounded-3xl text-white font-bold mb-3 inline"
              : "px-4 py-3 cursor-pointer hover:bg-gray-500/20 rounded-3xl  mb-3 inline"
          }
        >
          <CiViewList className="inline text-2xl mr-2" />
          <p className="md:inline hidden">Manage Attendance</p>
        </Link>

        <Link
          to="/users"
          className={
            location.pathname === "/users"
              ? "px-4 py-3 cursor-pointer bg-purple-800/70 rounded-3xl text-white font-bold mb-3 "
              : "px-4 py-3 cursor-pointer hover:bg-gray-500/20 rounded-3xl  mb-3"
          }
        >
          <FaUsers className="inline text-2xl mr-2" />
          <p className="md:inline hidden">Manage Users</p>
        </Link>
        <Link
          to="/leaves"
          className={
            location.pathname === "/leaves"
              ? "px-4 py-3 cursor-pointer bg-purple-800/70 rounded-3xl text-white font-bold mb-3 "
              : "px-4 py-3 cursor-pointer hover:bg-gray-500/20 rounded-3xl  mb-3"
          }
        >
          <FaUserTimes className="inline text-2xl mr-2 " />
          <p className="md:inline hidden">Manage Leaves</p>
        </Link>
        <Link
          to="/roles"
          className={
            location.pathname === "/roles"
              ? "px-4 py-3 cursor-pointer bg-purple-800/70 rounded-3xl text-white font-bold mb-3 "
              : "px-4 py-3 cursor-pointer hover:bg-gray-500/20 rounded-3xl  mb-3"
          }
        >
          <MdManageAccounts className="inline text-2xl mr-2 " />
          <p className="md:inline hidden">Manage Roles</p>
        </Link>
        <Link
          to="/settings"
          className={
            location.pathname === "/settings"
              ? "px-4 py-3 cursor-pointer bg-purple-800/70 rounded-3xl text-white font-bold mb-3 "
              : "px-4 py-3 cursor-pointer hover:bg-gray-500/20 rounded-3xl  mb-3"
          }
        >
          <IoSettings className="inline text-2xl mr-2 " />
          <p className="md:inline hidden">Settings</p>
        </Link>
      </div>
    </div>
  );
}
