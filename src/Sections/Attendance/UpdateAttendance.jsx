import SideBar from "../../components/SideBar";
import LogOut from "../../components/LogOut";
import { url } from "../../BaseUrl/Url";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
export default function UpdateAttendance() {
  const [isLoading, setIsLoading] = useState(false);
  const [timeData, setTimeData] = useState({
    // firstName: "",
    // lastName: "",
    in: "",
    out: "",
    startBreak: "",
    endBreak: "",
  });
  const [logout, setLogout] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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
        const inDate = new Date(resp.data.data.attendance[0]?.in);
        const year = inDate.getFullYear().toString();
        const month = (inDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
        const day = inDate.getDate().toString().padStart(2, "0");
        const hours = inDate.getUTCHours().toString().padStart(2, "0");
        const minutes = inDate.getUTCMinutes().toString().padStart(2, "0");
        // const seconds = inDate.getUTCSeconds().toString().padStart(2, "0");

        // Create the time string
        const inTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        // console.log(inTime);

        const outDate = new Date(resp.data.data.attendance[0]?.out);
        const outyear = outDate.getFullYear().toString();
        const outmonth = (outDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
        const outday = outDate.getDate().toString().padStart(2, "0");
        const outhours = outDate.getUTCHours().toString().padStart(2, "0");
        const outminutes = outDate.getUTCMinutes().toString().padStart(2, "0");

        // Create the time string
        const outTime = `${outyear}-${outmonth}-${outday}T${outhours}:${outminutes}`;

        const startBreakDate = new Date(
          resp.data.data.attendance[0].breakId[0]?.startBreak
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
          resp.data.data.attendance[0].breakId[0]?.endBreak
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

        setTimeData({
          ...timeData,
          // firstName: resp.data.data.attendance[0].userId.firstName,
          // lastName: resp.data.data.attendance[0].userId.lastName,
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
    console.log(timeData);
    axios
      .patch(`${url}/attendance/updateAttendance/${id}`, timeData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
        setIsLoading(false);
        toast.success("Successfully updated");
        navigate("/attendance");
      })
      .catch((err) => {
        console.log(err);

        setIsLoading(false);
        toast.error("Error updating");
      });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTimeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsLoading(true);
    updateUserAttendance();
  };
  return (
    <div className="flex overflow-hidden h-screen">
      <SideBar />
      <div className="w-full overflow-auto">
        <div className="md:h-20 h-16 px-4 md:px-8 flex justify-end items-center  bg-purple-500">
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
        <div className="p-4 md:p-8">
          <div className="border rounded-xl h-full p-4 md:p-5 shadow-xl">
            <div className="px-4 md:px-8">
              <div className="flex flex-col-reverse md:flex-row md:items-center justify-between mb-4 md:mb-6">
                <p className="text-sm py-4 md:py-6 text-gray-500 ">
                  <Link to="/attendance" className="hover:underline">
                    Attendance
                  </Link>
                  <span> &gt; </span>
                  <a href="" className="text-black">
                    Update Attendance
                  </a>
                </p>
                <Link to="/attendance">
                  <button className="rounded-md bg-purple-500 text-white py-2 px-3 flex items-center gap-x-2 font-medium">
                    <FaArrowLeft className="text-xl" />
                  </button>
                </Link>
              </div>

              <form action="" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-y-8 mb-8 md:mb-16">
                  {[
                    {
                      label: "Check In Time",
                      name: "in",
                      type: "datetime-local",
                      value: timeData.in,
                    },
                    {
                      label: "Check Out time",
                      name: "out",
                      type: "datetime-local",
                      value: timeData.out,
                    },
                    {
                      label: "Start Break",
                      name: "startBreak",
                      type: "datetime-local",
                      value: timeData.startBreak,
                    },
                    {
                      label: "EndBreak",
                      name: "endBreak",
                      type: "datetime-local",
                      value: timeData.endBreak,
                    },
                  ].map(({ label, name, type, value }) => (
                    <div key={name}>
                      <label
                        htmlFor={name}
                        className="block mb-1 font-medium text-gray-500"
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={value}
                        className="border-2 w-full 2xl:w-[20rem] md:w-[13rem] xl:w-[16rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
                <button className="bg-purple-500 rounded-full px-16 py-2 text-white text-lg font-medium hover:bg-purple-800">
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
  );
}
