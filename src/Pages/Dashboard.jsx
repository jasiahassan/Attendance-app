import { useRef, useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import LogOut from "../components/LogOut";
import { ShimmerThumbnail } from "react-shimmer-effects";
import axios from "axios";
import { url } from "../BaseUrl/Url";
export default function Dashboard() {
  const [logout, setLogout] = useState(false);
  const btnref = useRef();
  const token = localStorage.getItem("token");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // console.log(token);
    axios
      .get(
        `${url}/users/getCount`,

        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        setLoading(false);
        console.log(resp.data.data);
        setData(resp.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);
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
        <div className="md:h-20 h-16  px-4 md:px-8 flex items-center bg-purple-500 justify-end">
          <div className="relative">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/attendance-app-90eb5.appspot.com/o/257981384_3004176593182670_5671056491270256252_n%20(1).jpg_9645.jpg?alt=media&token=ba235831-ea9d-4293-ac45-69658f5135bb"
              alt=""
              className="w-12 cursor-pointer rounded-full"
              onClick={() => setLogout(!logout)}
              ref={btnref}
            />
            {logout && <LogOut />}
          </div>
        </div>
        <div className="p-4 md:p-8 md:px-12 flex-grow">
          <div className="border shadow-xl rounded-xl p-4 md:p-8 md:px-12 h-full">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-16 text-center">
                <ShimmerThumbnail height={150} rounded />{" "}
                <ShimmerThumbnail height={150} rounded />{" "}
                <ShimmerThumbnail height={150} rounded />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-16 text-center">
                {[
                  { count: data?.employeeCount, label: "Employees" },
                  { count: data?.managerCount, label: "Managers" },
                  { count: data?.adminCount, label: "Admins" },
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
