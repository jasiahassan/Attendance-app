import SideBar from "../components/SideBar";
import LogOut from "../components/LogOut";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { url } from "../BaseUrl/Url";
export default function Settings() {
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
        <div className="md:h-20 h-16 px-8 flex justify-end items-center bg-purple-500 border-purple-500">
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
        <div className="py-8 md:px-12 px-4">
          <div className="h-auto  md:px-12 md:py-8 py-2 md:shadow-xl border rounded-xl flex flex-col gap-y-7 p-6">
            <h1 className="text-3xl text-purple-500 font-medium mb-8">
              Settings
            </h1>
            <div className="w-full lg:grid grid-cols-2 gap-10">
              <div className="  mb-8 lg:mb-0">
                <h1 className="text-2xl mb-4 font-medium">
                  LOCATION CONTROL FORM
                </h1>
                <form action="">
                  <div className="grid grid-cols-1 gap-12 mb-8">
                    <div>
                      <label htmlFor="" className="text-lg block">
                        Latitude
                      </label>
                      <input
                        type="text"
                        className="border-2 w-full xl:w-[20rem]  rounded-md py-2 px-3 focus:outline-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="text-lg block">
                        Longitude
                      </label>
                      <input
                        type="text"
                        className="border-2 w-full xl:w-[20rem]  rounded-md py-2 px-3 focus:outline-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="text-lg block">
                        Distance(m)
                      </label>
                      <input
                        type="text"
                        className="border-2 w-full xl:w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                      />
                    </div>
                  </div>
                  <button className="bg-purple-500 rounded-full px-16 py-2 text-white text-lg font-medium hover:bg-purple-800">
                    Submit
                    {/* {loading ? (
                      <PulseLoader color="white" size={8} />
                    ) : (
                      <p>Submit</p>
                    )} */}
                  </button>
                </form>
              </div>
              <div className="">
                <h1 className="text-2xl mb-4 font-medium">PASSWORD UPDATE</h1>
                <form action="">
                  <div className="grid grid-cols-1 gap-12 mb-8">
                    <div>
                      <label htmlFor="" className="text-lg block">
                        Current Password
                      </label>
                      <input
                        type="text"
                        className="border-2 w-full xl:w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="text-lg block">
                        New Password
                      </label>
                      <input
                        type="text"
                        className="border-2 w-full xl:w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="text-lg block">
                        Confirm New Password
                      </label>
                      <input
                        type="text"
                        className="border-2 w-full xl:w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                      />
                    </div>
                  </div>
                  <button className="bg-purple-500 rounded-full px-16 py-2 text-white text-lg font-medium hover:bg-purple-800">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
