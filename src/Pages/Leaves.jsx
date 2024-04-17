import SideBar from "../Sections/SideBar";
import LogOut from "../Sections/LogOut";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { url } from "../BaseUrl/Url";
import { RxCross2, RxDotsHorizontal } from "react-icons/rx";
import { ShimmerTable } from "react-shimmer-effects";
import { MdDone } from "react-icons/md";
// import LeaveList from "../components/LeaveList";
export default function Leaves() {
  const [leaveData, setLeaveData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fulllDescription, setFulllDescription] = useState(false);
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
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${url}/leaves/getAllLeaves`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data.data.leaves);
        setLeaveData(res.data.data.leaves);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const postApprove = (item) => {
    const token = localStorage.getItem("token");
    axios
      .patch(
        `${url}/leaves/approveLeave/${item._id}`,
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

  const postDeny = (item) => {
    const token = localStorage.getItem("token");
    axios
      .patch(
        `${url}/leaves/approveLeave/${item._id}`,
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

  const handleApprove = (item) => {
    postApprove(item);
    // setIsApproveClick(true);
  };
  const handleDeny = (item) => {
    postDeny(item);
    // setIsApproveClick(true);
  };

  return (
    <div>
      <div className="flex overflow-hidden h-screen">
        <SideBar />
        <div className="w-full overflow-auto">
          <div className=" h-20 px-8 flex justify-end items-center border shadow-xl bg-purple-500 border-purple-500">
            <div className="relative">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/attendance-app-90eb5.appspot.com/o/user-icon.png_616f.png?alt=media&token=118f35cb-f815-4276-8b11-33b01faa2d5b"
                alt=""
                className="w-12 cursor-pointer"
                onClick={() => setLogout(!logout)}
                ref={btnref}
              />
              {logout && <LogOut />}
            </div>
          </div>
          <div className="py-8 px-12">
            <div className="border rounded-xl h-screen px-12 py-8 shadow-xl">
              <h1 className="text-3xl text-purple-500 font-medium mb-6">
                Leave Details
              </h1>
              <div className="w-full  overflow-x-auto rounded-md">
                {isLoading ? (
                  <div>
                    <ShimmerTable row={4} col={4} />;
                  </div>
                ) : (
                  <table className=" mb-4 min-w-[40rem] w-full rounded-md">
                    <thead className="border text-left">
                      <tr className="text-neutral-500 text-sm font-semibold">
                        <th className="py-5 pl-10">NAME</th>
                        <th>LEAVE TYPE</th>
                        <th>DESCRIPTION</th>

                        <th>APPROVAL</th>
                      </tr>
                    </thead>
                    <tbody className="w-full text-neutral-800">
                      {leaveData.map((item) => {
                        return (
                          <tr
                            key={item._id}
                            className="border cursor-pointer hover:bg-gray-300/30"
                            // onClick={() => handleShowProfile(item._id)}
                          >
                            <td className="py-5 pl-10">
                              {item.userId.firstName} {item.userId.lastName}
                            </td>
                            <td>
                              <button className="px-6 py-1.5  bg-green-500/20 rounded-full font-medium">
                                {item.leaveType}
                              </button>
                            </td>
                            <td className="w-[20rem]">
                              {fulllDescription
                                ? item.description
                                : `${item.description.substring(0, 20)}`}
                              {fulllDescription || (
                                <RxDotsHorizontal
                                  className="inline"
                                  onClick={() => setFulllDescription(true)}
                                />
                              )}
                            </td>
                            <td>
                              {item.isApproved === "Pending" ? (
                                <div>
                                  <MdDone
                                    className="inline mr-4 text-3xl text-green-500 cursor-pointer"
                                    onClick={() => handleApprove(item)}
                                  />

                                  <RxCross2
                                    className="inline text-3xl text-red-500 cursor-pointer"
                                    onClick={() => handleDeny(item)}
                                  />
                                </div>
                              ) : (
                                <p
                                  className={
                                    item.isApproved === "Approved"
                                      ? "text-green-500 font-medium "
                                      : "text-red-500 font-medium "
                                  }
                                >
                                  {item.isApproved}
                                </p>
                              )}

                              {/* {isApproveClick &&
                              (item.isApproved ? (
                                <p>Approved</p>
                              ) : (
                                <p>Denied</p>
                              ))} */}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
