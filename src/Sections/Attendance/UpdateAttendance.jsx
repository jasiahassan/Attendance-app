import SideBar from "../SideBar";
import { url } from "../../BaseUrl/Url";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
export default function UpdateAttendance() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    // firstName: "",
    // lastName: "",
    in: "",
    out: "",
    startBreak: "",
    endBreak: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${url}/attendance/getAllAttendance/?_id=${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        console.log(resp.data.data.attendance[0]);
        const inDate = new Date(resp.data.data.attendance[0].in);
        const year = inDate.getFullYear().toString();
        const month = (inDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
        const day = inDate.getDate().toString().padStart(2, "0");
        const hours = inDate.getUTCHours().toString().padStart(2, "0");
        const minutes = inDate.getUTCMinutes().toString().padStart(2, "0");
        // const seconds = inDate.getUTCSeconds().toString().padStart(2, "0");

        // Create the time string
        const inTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        // console.log(inTime);

        const outDate = new Date(resp.data.data.attendance[0].out);
        const outyear = outDate.getFullYear().toString();
        const outmonth = (outDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
        const outday = outDate.getDate().toString().padStart(2, "0");
        const outhours = outDate.getUTCHours().toString().padStart(2, "0");
        const outminutes = outDate.getUTCMinutes().toString().padStart(2, "0");

        // Create the time string
        const outTime = `${outyear}-${outmonth}-${outday}T${outhours}:${outminutes}`;

        const startBreakDate = new Date(
          resp.data.data.attendance[0].breakId[0].startBreak
        );
        const startyear = startBreakDate.getFullYear().toString();
        const startmonth = (startBreakDate.getMonth() + 1)
          .toString()
          .padStart(2, "0"); // Month is zero-based
        const startday = startBreakDate.getDate().toString().padStart(2, "0");
        const starthours = startBreakDate
          .getUTCHours()
          .toString()
          .padStart(2, "0");
        const startminutes = startBreakDate
          .getUTCMinutes()
          .toString()
          .padStart(2, "0");

        // Create the time string
        const startBreak = `${startyear}-${startmonth}-${startday}T${starthours}:${startminutes}`;

        const endBreakDate = new Date(
          resp.data.data.attendance[0].breakId[0].endBreak
        );
        const endyear = endBreakDate.getFullYear().toString();
        const endmonth = (endBreakDate.getMonth() + 1)
          .toString()
          .padStart(2, "0"); // Month is zero-based
        const endday = endBreakDate.getDate().toString().padStart(2, "0");
        const endhours = endBreakDate.getUTCHours().toString().padStart(2, "0");
        const endminutes = endBreakDate
          .getUTCMinutes()
          .toString()
          .padStart(2, "0");

        // Create the time string
        const endBreak = `${endyear}-${endmonth}-${endday}T${endhours}:${endminutes}`;

        setUserData({
          ...userData,
          firstName: resp.data.data.attendance[0].userId.firstName,
          lastName: resp.data.data.attendance[0].userId.lastName,
          in: inTime,
          out: outTime,
          startBreak: startBreak,
          endBreak: endBreak,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, token]);

  const updateUserAttendance = () => {
    setIsLoading(true);
    console.log(userData);
    axios
      .patch(`${url}/attendance/updateAttendance/${id}`, userData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
          // "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);

        setIsLoading(false);
        navigate("/attendance");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    console.log(userData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsLoading(true);
    updateUserAttendance();
  };
  return (
    <div>
      <div className="flex overflow-hidden h-screen">
        <SideBar />
        <div className="w-full overflow-auto">
          <div className=" h-20 px-8 flex justify-end items-center shadow-xl bg-purple-500 ">
            <div className="relative">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/attendance-app-90eb5.appspot.com/o/user-icon.png_616f.png?alt=media&token=118f35cb-f815-4276-8b11-33b01faa2d5b"
                alt=""
                className="w-12 cursor-pointer"
                //     onClick={() => setLogout(!logout)}
                //     ref={btnref}
              />
              {/* // {logout && <LogOut />} */}
            </div>
          </div>
          <div className="p-8 px-12">
            <div className="border rounded-xl h-full p-5 shadow-xl">
              <div className="px-8">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm py-6 text-gray-500 ">
                    <Link to="/attendance" className="hover:underline">
                      Attendance
                    </Link>
                    <span> &gt; </span>
                    <a href="" className="text-black">
                      Update Attendance
                    </a>
                  </p>
                  <Link to="/attendance">
                    <button
                      className="rounded-md bg-purple-500 text-white py-2 px-3 flex items-center gap-x-2 font-medium"
                      // onClick={() => setAddUser(false)}
                    >
                      <FaArrowLeft className="text-xl" />
                      {/* Go Back */}
                    </button>
                  </Link>
                </div>

                <form action="" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-3 gap-8 gap-y-16 mb-16">
                    {/* <div>
                      <label
                        htmlFor=""
                        className="block mb-1 font-medium text-gray-500"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={userData?.firstName}
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="block mb-1 font-medium text-gray-500"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={userData?.lastName}
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
                      />
                    </div> */}

                    <div>
                      <label
                        htmlFor=""
                        className="block mb-1 font-medium text-gray-500"
                      >
                        Check In Time
                      </label>
                      <input
                        type="datetime-local"
                        name="in"
                        value={userData?.in}
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="out"
                        className="block mb-1 font-medium text-gray-500"
                      >
                        Check Out time
                      </label>
                      <input
                        type="datetime-local"
                        name="out"
                        value={userData?.out}
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="block mb-1 font-medium text-gray-500"
                      >
                        Start Break
                      </label>
                      <input
                        type="datetime-local"
                        name="startBreak"
                        value={userData?.startBreak}
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="block mb-1 font-medium text-gray-500"
                      >
                        EndBreak
                      </label>
                      <input
                        type="datetime-local"
                        name="endBreak"
                        value={userData.endBreak}
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
                      />
                    </div>
                    {/* <div>
                      <label
                        htmlFor=""
                        className="block mb-1 font-medium text-gray-500"
                      >
                        Password
                      </label>
                      <input
                        type="text"
                        name="password"
                        // value={userData.password}
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
                      />
                    </div> */}
                  </div>
                  <button className="bg-purple-500 rounded-full px-20 py-2 text-white text-lg font-medium hover:bg-purple-800">
                    {isLoading ? (
                      <PulseLoader color="white" size={8} />
                    ) : (
                      <p>Update</p>
                    )}
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
