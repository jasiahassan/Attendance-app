import { Link, useLocation } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
export default function SideBar() {
  const location = useLocation();
  return (
    // <div className="flex">
    <div className="w-[27%] h-screen shadow-xl p-6 bg-purple-500 text-white">
      <div className="flex items-center mb-8">
        <img
          src="src/assets/logoraybit-new.png"
          alt="Raybit Technologies"
          className="w-48"
        />
      </div>
      <div className="py-4 flex flex-col">
        <Link
          to="/dashboard"
          className={
            location.pathname === "/dashboard"
              ? "px-4 py-3 cursor-pointer bg-purple-800/70 rounded-3xl text-white font-bold mb-3"
              : "px-4 py-3 cursor-pointer hover:bg-gray-500/20 rounded-3xl  mb-3"
          }
        >
          <IoHomeSharp className="inline text-2xl mr-2" />
          Dashboard
        </Link>
        <Link
          to="/attendance"
          className={
            location.pathname === "/attendance"
              ? "px-4 py-3 cursor-pointer bg-purple-800/70 rounded-3xl text-white font-bold mb-3 "
              : "px-4 py-3 cursor-pointer hover:bg-gray-500/20 rounded-3xl  mb-3"
          }
        >
          <CiViewList className="inline text-2xl mr-2" />
          Attendance
        </Link>
        {/* <Link
          to="/employees"
          className={
            location.pathname === "/employees"
              ? "px-3 py-3 cursor-pointer bg-purple-800/70 rounded-3xl text-white font-bold mb-3 "
              : "px-3 py-3 cursor-pointer hover:bg-gray-500/20 rounded-3xl  mb-3"
          }
        >
          Employees
        </Link> */}
        <Link
          to="/users"
          className={
            location.pathname === "/users"
              ? "px-4 py-3 cursor-pointer bg-purple-800/70 rounded-3xl text-white font-bold mb-3 "
              : "px-4 py-3 cursor-pointer hover:bg-gray-500/20 rounded-3xl  mb-3"
          }
        >
          <FaUsers className="inline text-2xl mr-2" />
          Users
        </Link>
      </div>
    </div>
  );
}
