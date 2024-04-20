import { useState, useRef, useEffect } from "react";
import SideBar from "../components/SideBar";
import UsersSection from "../Sections/Users/UsersSection";
import LogOut from "../components/LogOut";

export default function Users() {
  const [logout, setLogout] = useState(false);
  const btnref = useRef();

  useEffect(() => {
    const closeDropDown = (e) => {
      // console.log(btnref.current);
      if (btnref.current && !btnref.current.contains(e.target)) {
        setLogout(false);
      }
    };
    document.body.addEventListener("click", closeDropDown);
    return () => document.body.removeEventListener("click", closeDropDown);
  }, []);

  return (
    <div className="flex overflow-hidden h-screen">
      <SideBar />
      <div className="w-full overflow-auto">
        <div className=" md:h-20 h-16 px-8 flex justify-end items-center  bg-purple-500 ">
          <div className="relative">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/attendance-app-90eb5.appspot.com/o/257981384_3004176593182670_5671056491270256252_n%20(1).jpg_9645.jpg?alt=media&token=ba235831-ea9d-4293-ac45-69658f5135bb"
              alt=""
              className="md:w-12 w-10 cursor-pointer rounded-full"
              onClick={() => setLogout(!logout)}
              ref={btnref}
            />
            {logout && <LogOut />}
          </div>
        </div>
        <div className="p-4 md:p-8 md:px-12 flex-grow">
          <div className="border rounded-xl h-full p-4 md:p-5 shadow-xl">
            <UsersSection />
          </div>
        </div>
      </div>
    </div>
  );
}
