import { useRef, useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import LogOut from "../components/LogOut";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { url } from "../BaseUrl/Url";
export default function Dashboard() {
  const [logout, setLogout] = useState(false);
  const btnref = useRef();
  // const token = localStorage.getItem("token");
  // const [data, setData] = useState();
  // useEffect(() => {
  //   // console.log(token);
  //   axios
  //     .post(
  //       `${url}/users/getAllUsers`,
  //       {},

  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //           "Content-Type": "application/json",
  //           "User-Agent": navigator.userAgent,
  //         },
  //       }
  //     )
  //     .then((resp) => {
  //       console.log(resp);
  //       setData(resp.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [token]);
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
        <div className="md:h-20 h-16  px-4 md:px-8 flex justify-end items-center bg-purple-500 ">
          <div className="relative">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/attendance-app-90eb5.appspot.com/o/257981384_3004176593182670_5671056491270256252_n%20(1).jpg_9645.jpg?alt=media&token=ba235831-ea9d-4293-ac45-69658f5135bb"
              alt=""
              className="w-10 md:w-12 cursor-pointer rounded-full"
              onClick={() => setLogout(!logout)}
              ref={btnref}
            />
            {logout && <LogOut />}
          </div>
        </div>
        <div className="p-4 md:p-8 md:px-12 flex-grow">
          <div className="border shadow-xl rounded-xl p-4 md:p-8 md:px-12 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-16 text-center">
              {[
                { count: "30", label: "Employees" },
                { count: "03", label: "Managers" },
                { count: "02", label: "Admins" },
              ].map(({ count, label }) => (
                <div
                  key={label}
                  className="border text-purple-500 shadow-xl rounded-md p-4 md:p-6"
                >
                  <h1 className="text-3xl md:text-4xl mb-2">{count}</h1>
                  <p>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
