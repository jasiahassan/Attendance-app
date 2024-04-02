import SideBar from "../Sections/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../BaseUrl/Url";
export default function Dashboard() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState();
  useEffect(() => {
    // console.log(token);
    axios
      .post(
        `${url}/users/getAllUsers`,
        {},

        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            "User-Agent": navigator.userAgent,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);
  return (
    <div>
      <div className="flex overflow-hidden h-screen">
        <SideBar />
        <div className="w-full overflow-auto">
          <div className=" h-20 px-8 flex justify-end items-center border shadow-xl bg-purple-500 border-purple-500">
            <img
              src="src/assets/user-icon.png"
              alt=""
              className="w-12 cursor-pointer"
            />
          </div>
          <div className="p-8 px-12">
            <div className="border shadow-lg rounded-xl h-screen p-8 px-12">
              <div className="grid grid-cols-3 gap-16 text-center">
                <div className="border text-purple-500 shadow-xl rounded-md p-6">
                  <h1 className="text-4xl mb-2">30</h1>
                  <p>Employees</p>
                </div>
                <div className="border text-purple-500  shadow-xl rounded-md p-6">
                  <h1 className="text-4xl mb-2">03</h1>
                  <p>Managers</p>
                </div>
                <div className="border text-purple-500  shadow-xl rounded-md p-6">
                  <h1 className="text-4xl mb-2">02</h1>
                  <p>Admins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
