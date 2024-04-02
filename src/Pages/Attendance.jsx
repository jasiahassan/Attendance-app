import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../BaseUrl/Url";
import SideBar from "../Sections/SideBar";
export default function Attendance() {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .get(`${url}/attendance/getAllAttendance`, {
        headers: {
          Authorization: "Bearer " + token,
          // "Content-Type": "application/json",
          // "User-Agent": navigator.userAgent,
        },
      })
      .then((resp) => {
        console.log(resp.data.data.attendance);
        setEmployeeData(resp.data.data.attendance);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   const formatteddata = {employeeData.map((item) => {
  //     const dateIn = new Date(item.in);
  //     const hoursIn = dateIn.getHours();
  //     const minutesIn = dateIn.getMinutes();
  //     const secondsIn = dateIn.getSeconds();
  //     const inTime = `${hoursIn}:${minutesIn}:${secondsIn}`;
  //     const dateOut = new Date(item.out);
  //     const hoursOut = dateOut.getHours();
  //     const minutesOut = dateOut.getMinutes();
  //     const secondsOut = dateOut.getSeconds();
  //     const outTime = `${hoursOut}:${minutesOut}:${secondsOut}`;
  //     return inTime, outTime;
  //   });
  // }
  // console.log(formatteddata);
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
          <div className="p-8">
            <div className="border rounded-xl h-screen p-8">
              <div className=" border">
                <h1 className="text-2xl font-medium text-purple-500 px-8 py-4">
                  Attendance List
                </h1>
                <div className="w-full  overflow-x-auto rounded-md">
                  <table className=" mb-4 min-w-[40rem] w-full rounded-md">
                    <thead className="border text-left">
                      <tr className="text-neutral-500 text-sm font-semibold">
                        <th className="py-5 pl-10 border-l">S.no</th>
                        <th className="pl-10 border-l">Employee Name</th>
                        <th className="pl-10 border-l">Punch In</th>
                        <th className="pl-10 border-l">Punch Out</th>
                        {/* <th className="pl-10 border-l">Production</th> */}
                        <th className="pl-10 border-l">Approval</th>
                      </tr>
                    </thead>
                    {/* <tbody className="w-full text-neutral-800">
                      {data.map((item) => {
                        return (
                          <tr key={item._id} className="border">
                            <td className="py-5 pl-10">
                              {item.firstName} {item.lastName}
                            </td>
                            <td>{item.email}</td>
                            <td>{item.PhoneNumber}</td>
                            <td>{item.address}</td>
                          </tr>
                        );
                      })}
                    </tbody> */}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
