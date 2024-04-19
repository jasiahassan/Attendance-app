import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LogOut from "../components/LogOut";
import axios from "axios";
import { url } from "../BaseUrl/Url";
import SideBar from "../components/SideBar";
import { RxCross2 } from "react-icons/rx";
import { MdDone } from "react-icons/md";
import { ShimmerTable } from "react-shimmer-effects";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Attendance() {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
    // setDate(formattedDate);
  };
  const [employeeData, setEmployeeData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [roles, setRoles] = useState([]);
  const [date, setDate] = useState(getCurrentDate());
  const [logout, setLogout] = useState(false);
  const [selectedRole, setSelectedRole] = useState({
    roleId: "",
  });
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
  // const [breakData, setBreakData] = useState(null);

  // useEffect(() => {
  //   getCurrentDate();
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token);
    axios
      .get(
        `${url}/attendance/getAllAttendance/${selectedRole.roleId}?search=${date}`,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((resp) => {
        console.log(resp.data.data.attendance);
        setIsError(false);
        setEmployeeData(resp.data.data.attendance);
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        setIsError(true);
        toast.error(err.response.data.message);
      });
  }, [date, selectedRole]);

  const handleDropDown = () => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${url}/roles/getRoles`,

        {
          headers: {
            Authorization: "Bearer " + token,
            // "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp.data.data.roles);
        setRoles(resp.data.data.roles);
      });
  };

  useEffect(() => {
    handleDropDown();
  }, []);

  const postPresent = (item) => {
    const token = localStorage.getItem("token");
    // item.isApproved = "Approved";
    // console.log(item.isApproved);
    axios
      .patch(
        `${url}/attendance/approve/${item._id}`,
        { isApproved: "Approved" },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postAbsent = (item) => {
    const token = localStorage.getItem("token");
    axios
      .patch(
        `${url}/attendance/approve/${item._id}`,
        { isApproved: "Rejected" },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePresent = (item) => {
    // setIsPresent(true);
    postPresent(item);
    console.log(item._id);
  };

  const handleAbsent = (item) => {
    postAbsent(item);
    // setIsPresent(true);
  };

  const calculateTotalBreakHours = (breaks) => {
    let totalBreakHours = 0;

    if (breaks && breaks.length > 0) {
      breaks.forEach((breakItem) => {
        const startBreak = new Date(breakItem.startBreak);
        const endBreak = breakItem.endBreak
          ? new Date(breakItem.endBreak)
          : new Date();

        // Calculate break duration in milliseconds
        const breakDuration = endBreak - startBreak;

        // Convert break duration from milliseconds to hours
        const breakHours = breakDuration / (1000 * 60 * 60);

        // Add break hours to totalBreakHours
        totalBreakHours += breakHours;
      });
    }

    // Round total break hours to 2 decimal places
    totalBreakHours = Math.round(totalBreakHours * 100) / 100;

    return totalBreakHours;
  };

  const formatteddata = employeeData.map((item) => {
    const totalBreakHours = calculateTotalBreakHours(item.breakId);
    const dateIn = new Date(item.in);
    const inTime = dateIn.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const dateOut = new Date(item.out);
    const outTime = dateOut.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    console.log(inTime, outTime);

    return {
      inTime,
      outTime,
      totalBreakHours,
      userId: item.userId,
      isApproved: item.isApproved,
      _id: item._id,
    };
  });

  const handleChange = (e) => {
    setSelectedRole({ [e.target.name]: e.target.value });
    console.log(selectedRole);
  };

  return (
    <div className="">
      <div className="flex overflow-hidden h-screen">
        <SideBar />
        <div className="w-full overflow-auto">
          <div className="md:h-20 h-16 px-8 flex justify-end items-center  bg-purple-500 border-purple-500">
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
            <div className="flex flex-col md:flex-row justify-between md:items-center sm:py-4 pb-8">
              <h1 className="text-2xl font-medium text-purple-500 mb-4 md:mb-0">
                Attendance List
              </h1>
              <div className="flex flex-col md:flex-row md:items-center">
                <select
                  className="border px-6 py-2.5 focus:outline-purple-500 rounded-md mb-4 md:mb-0 mr-0 md:mr-4"
                  name="roleId"
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Select Role...
                  </option>
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.role}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  name="date"
                  value={date}
                  className="border px-6 py-2 focus:outline-purple-500 rounded-md"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            {isError ? (
              <div className="h-[27rem] text-xl text-red-500 flex items-center justify-center">
                <p>No Attendance found!</p>
              </div>
            ) : (
              <div className="w-full overflow-x-auto rounded-xl border">
                {isloading ? (
                  <ShimmerTable row={4} col={6} />
                ) : (
                  <table className="mb-4 min-w-[50rem] w-full rounded-md">
                    <thead className="border text-left">
                      <tr className="text-neutral-500 text-sm font-semibold">
                        <th className="py-5 pl-10 border-l">S.no</th>
                        <th className="pl-10 border-l">Employee Name</th>
                        <th className="pl-10 border-l">Punch In</th>
                        <th className="pl-10 border-l">Punch Out</th>
                        <th className="pl-10 border-l">Break Taken</th>
                        <th className="pl-10 border-l">Approval</th>
                        <th className="pl-10 border-l">Edit</th>
                      </tr>
                    </thead>
                    <tbody className="w-full text-neutral-800">
                      {formatteddata.map((item, i) => (
                        <tr key={item._id} className="border">
                          <td className="py-5 pl-10">{i + 1}</td>
                          <td className="pl-10 border-l">
                            {item?.userId?.firstName} {item?.userId?.lastName}
                          </td>
                          <td className="pl-10 border-l">{item.inTime}</td>
                          <td className="pl-10 border-l ">
                            {item.outTime === "Invalid Date" ? (
                              <p className="text-yellow-500 font-medium">
                                Pending
                              </p>
                            ) : (
                              item.outTime
                            )}
                          </td>
                          <td className="pl-10 border-l ">
                            {item.totalBreakHours} hrs
                          </td>
                          <td className="pl-10 border-l">
                            {item.isApproved === "Pending" ? (
                              <div>
                                <MdDone
                                  className="inline mr-4 text-3xl text-green-500 cursor-pointer"
                                  onClick={() => handlePresent(item)}
                                />
                                <RxCross2
                                  className="inline text-3xl text-red-500 cursor-pointer"
                                  onClick={() => handleAbsent(item)}
                                />
                              </div>
                            ) : (
                              <p
                                className={
                                  item.isApproved === "Approved"
                                    ? "text-green-500 font-medium"
                                    : "text-red-500 font-medium"
                                }
                              >
                                {item.isApproved}
                              </p>
                            )}
                          </td>
                          <td className="pl-10 border-l">
                            <Link
                              to={`/attendance/updateAttendance/${item._id}`}
                            >
                              <FaRegEdit className="text-xl text-blue-500" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
